import { logger } from "@sentry/nextjs";
import getConnection, { queryDatabase } from "./connection";
import {
  DATABASES,
  GetPageContentResponse,
  GetStackContentParams,
  GetStackContentResponse
} from "./types";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client";

export const queryStackById = async ({ id, pageSize }: { id: string; pageSize: number }) => {
  return queryDatabase(DATABASES.STACK, {
    filter: {
      property: "id",
      rich_text: {
        equals: id
      }
    },
    page_size: pageSize
  });
};

export const getStackContent = async ({
  stackId
}: GetStackContentParams): Promise<GetStackContentResponse> => {
  try {
    logger.trace("Getting stack content", { stackId });
    const notion = getConnection();
    const pageData = await notion.pages.retrieve({ page_id: stackId });

    const { properties } = <PageObjectResponse>pageData;

    return {
      properties
    };
  } catch (error) {
    logger.fatal("Error fetching content for page ID", { stackId, error });
    throw error;
  }
};

export const getStackBatchContent = async (
  batch: GetStackContentParams[]
): Promise<GetStackContentResponse[]> => {
  try {
    const pageProperties: GetStackContentResponse[] = [];
    const BATCH_SIZE = 5; // To avoid hitting rate limits

    for (let i = 0; i < batch.length; i += BATCH_SIZE) {
      const partial = batch.slice(i, i + BATCH_SIZE);
      const promises = partial.map(({ stackId }) => getStackContent({ stackId }));
      const results = await Promise.allSettled(promises);

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          pageProperties.push(result.value);
        } else {
          console.error(`Failed to retrieve page: ${result.reason}`);
        }
      });

      // Add a delay to respect API rate limits
      if (i + BATCH_SIZE < batch.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return pageProperties;
  } catch (error) {
    throw error;
  }
};
