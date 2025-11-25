import { PageObjectResponse } from "@notionhq/client";
import { MdBlock } from "notion-to-md/build/types";

export type GetPageContentParams = {
  pageId: string;
};

export type GetStackContentParams = {
  stackId: string;
};

export type GetPageContentResponse = {
  mdBlocks: MdBlock[];
  properties: PageObjectResponse["properties"];
};

export type GetStackContentResponse = {
  properties: PageObjectResponse["properties"];
};


export enum DATABASES {
  CASES = "cases",
  STACK = "stack"
}

export type NotionFiles = PageObjectResponse["properties"]["files"];

export type FormatedFile = {
  file: string;
  id: string | number;
  name: string;
};

export type PageSize = { pageSize: number };
export type QueryBySlugParams = PageSize & { slug: string };
export type QueryByHighlightParams = PageSize & {};
