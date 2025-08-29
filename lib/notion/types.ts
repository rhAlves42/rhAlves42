import { PageObjectResponse } from "@notionhq/client";
import { MdBlock } from "notion-to-md/build/types";

export type GetPageContentParams = {
  pageId: string;
};
export type GetPageContentResponse = {
  mdBlocks: MdBlock[];
  properties: PageObjectResponse["properties"];
};
