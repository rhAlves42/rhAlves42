import {
  DatabaseObjectResponse,
  Client as NotionClient,
  PageObjectResponse
} from "@notionhq/client";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { AppLogger } from "@/lib/logger/logger";
import { DATABASES } from "./types";

const NOTION_TOKEN = process.env.NOTION_API_KEY;

export default function getConnection() {
  try {
    const notion = new NotionClient({
      auth: NOTION_TOKEN
    });
    return notion;
  } catch (error) {
    console.error("Error establishing Notion connection:", error);
    throw error;
  }
}

/**
 * Retrieves the Notion database ID for the specified database type.
 * Throws an error if the database type is not defined or if the corresponding
 * environment variable for the database ID is missing.
 *
 * @param database - The type of database to retrieve the ID for (e.g., 'cases' or 'stack').
 * @returns The Notion database ID as a string.
 * @throws Will throw an error if the database type is not provided or if the database ID is not defined in environment variables.
 */

export function getDatabaseIdOrError(database: DATABASES): string {
  if (!database) {
    AppLogger.fatal("Error fetching database", { error: "Database type is not defined" });
    throw new Error("Database type is not defined");
  }

  const databasesByName = {
    cases: process.env.NOTION_CASES_DATABASE_ID,
    stack: process.env.NOTION_STACK_DATABASE_ID
  };
  const NOTION_DATABASE_ID = databasesByName[database] || null;

  if (!NOTION_DATABASE_ID) {
    AppLogger.fatal("Error fetching database", { error: "NOTION_DATABASE_ID is not defined" });
    throw new Error("NOTION_DATABASE_ID is not defined");
  }
  return NOTION_DATABASE_ID;
}

/**
 * Retrieves the properties of a Notion database.
 * @param database The database to query.
 * @returns The database object response.
 */
export const getDatabase = async (database: DATABASES): Promise<DatabaseObjectResponse> => {
  try {
    const databaseId = getDatabaseIdOrError(database);
    AppLogger.trace("Getting database", { databaseId, database });
    const notion = getConnection();
    const retrievedDB = await notion.databases.retrieve({ database_id: databaseId });
    return retrievedDB as DatabaseObjectResponse;
  } catch (error) {
    AppLogger.fatal("Error fetching database", { error, data: { database } });
    throw error;
  }
};

/**
 * Queries all entries (pages) from a Notion database, handling pagination.
 * @param database The database to query.
 * @param queryOptions Optional query parameters like filters and sorts.
 * @returns An array of page objects representing the database entries.
 */
export const queryDatabase = async (
  database: DATABASES,
  queryOptions?: Partial<QueryDatabaseParameters>
): Promise<PageObjectResponse[]> => {
  try {
    AppLogger.trace("Starting database connection", { database });
    const notion = getConnection();
    const databaseId = getDatabaseIdOrError(database);
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
    console.error(error);
    AppLogger.fatal("Error querying database with ID", { database, error });
    throw error;
  }
};
