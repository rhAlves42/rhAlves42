import getConnection, { queryDatabase } from "./connection";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { MdBlock } from "notion-to-md/build/types";
import {
  DATABASES,
  GetPageContentParams,
  GetPageContentResponse,
  QueryByHighlightParams,
  QueryBySlugParams
} from "./types";
import { logger } from "@sentry/nextjs";

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
 * @param database The database to fetch content from.
 * @returns A map where each key is a page ID and the value is its content.
 */
export const getAllDatabaseContent = async (
  database: DATABASES
): Promise<Map<string, MdBlock[]>> => {
  const databaseEntries = await queryDatabase(database);
  const contentMap = new Map<string, MdBlock[]>();

  for (const entry of databaseEntries) {
    const content = await getPageContent({ pageId: entry.id });
    contentMap.set(entry.id, content.mdBlocks);
  }

  return contentMap;
};

export const queryCasesBySlug = async ({ slug, pageSize }: QueryBySlugParams) => {
  return queryDatabase(DATABASES.CASES, {
    filter: {
      property: "slug",
      rich_text: {
        equals: slug
      }
    },
    page_size: pageSize
  });
};

export const queryCasesByHighlight = async ({
  pageSize
}: QueryByHighlightParams): Promise<PageObjectResponse[]> =>
  queryDatabase(DATABASES.CASES, {
    filter: {
      property: "highlight",
      checkbox: {
        equals: true
      }
    },
    page_size: pageSize
  });
