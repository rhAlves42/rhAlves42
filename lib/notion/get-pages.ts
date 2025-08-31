import { DatabaseObjectResponse } from "@notionhq/client";
import getConnection from "./connection";
import {
  PageObjectResponse,
  QueryDatabaseParameters
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { MdBlock } from "notion-to-md/build/types";
import { GetPageContentParams, GetPageContentResponse } from "./types";
import { logger } from "@sentry/nextjs";

export function getDatabaseIdOrError() {
  const NOTION_DATABASE_ID = process.env.NOTION_CASES_DATABASE_ID;
  if (!NOTION_DATABASE_ID) {
    logger.fatal("Error fetching database", { error: "NOTION_DATABASE_ID is not defined" });
    throw new Error("NOTION_DATABASE_ID is not defined");
  }
  return NOTION_DATABASE_ID;
}

/**
 * Retrieves the properties of a Notion database.
 * @returns The database object response.
 */
export const getDatabase = async (): Promise<DatabaseObjectResponse> => {
  try {
    const databaseId = getDatabaseIdOrError();
    logger.trace("Getting database", { databaseId });
    const notion = getConnection();
    const database = await notion.databases.retrieve({ database_id: databaseId });
    return database as DatabaseObjectResponse;
  } catch (error) {
    logger.fatal("Error fetching database", { error });
    throw error;
  }
};

/**
 * Queries all entries (pages) from a Notion database, handling pagination.
 * @param databaseId The ID of the database to query.
 * @param queryOptions Optional query parameters like filters and sorts.
 * @returns An array of page objects representing the database entries.
 */
export const queryDatabase = async (
  databaseId: string,
  queryOptions?: Partial<QueryDatabaseParameters>
): Promise<PageObjectResponse[]> => {
  try {
    logger.trace("Starting database connection", { databaseId });
    const notion = getConnection();
    let allEntries: PageObjectResponse[] = [];
    let cursor: string | null = null;

    do {
      const response = await notion.databases.query({
        database_id: databaseId,
        page_size: 100,
        start_cursor: cursor || undefined,
        ...queryOptions
      });

      const pages = response.results as PageObjectResponse[];
      allEntries = allEntries.concat(pages);
      cursor = response.next_cursor;
    } while (cursor);

    return allEntries;
  } catch (error) {
    logger.fatal("Error querying database with ID", { databaseId, error });
    throw error;
  }
};

/**
 * Retrieves all blocks (content) from a Notion page, including children.
 * @param pageId The ID of the block (or page) to retrieve children for.
 * @returns An array of block objects.
 */

export const getPageContent = async ({
  pageId
}: GetPageContentParams): Promise<GetPageContentResponse> => {
  try {
    logger.trace("Getting page content", { pageId });
    const notion = getConnection();
    const pageData = await notion.pages.retrieve({ page_id: pageId });

    const n2m = new NotionToMarkdown({ notionClient: notion });

    const mdBlocks = await n2m.pageToMarkdown(pageId);

    const pageDataResponse = <PageObjectResponse>pageData;

    return {
      mdBlocks,
      properties: pageDataResponse.properties
    };
  } catch (error) {
    logger.fatal("Error fetching content for page ID", { pageId, error });
    throw error;
  }
};

/**
 * Fetches the content for every item in a database.
 * This can be slow for large databases.
 * @param databaseId The ID of the database.
 * @returns A map where each key is a page ID and the value is its content.
 */
export const getAllDatabaseContent = async (
  databaseId: string
): Promise<Map<string, MdBlock[]>> => {
  const databaseEntries = await queryDatabase(databaseId);
  const contentMap = new Map<string, MdBlock[]>();

  for (const entry of databaseEntries) {
    const content = await getPageContent({ pageId: entry.id });
    contentMap.set(entry.id, content.mdBlocks);
  }

  return contentMap;
};
