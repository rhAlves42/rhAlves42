import { TStackItem } from "@/app/(cases)/components/stack-container/types";
import { Stack } from "@/types/stack";
import { PageObjectResponse } from "@notionhq/client";
import getConnection from "lib/notion/connection";
import {
  FormatedFile,
  GetPageContentResponse,
  GetStackContentResponse,
  NotionFiles
} from "lib/notion/types";
import { NotionToMarkdown } from "notion-to-md";

enum PropertyKeys {
  number = "number",
  url = "url",
  select = "select",
  multi_select = "multi_select",
  status = "status",
  date = "date",
  email = "email",
  phone_number = "phone_number",
  checkbox = "checkbox",
  files = "files",
  created_by = "created_by",
  created_time = "created_time",
  last_edited_by = "last_edited_by",
  last_edited_time = "last_edited_time",
  formula = "formula",
  button = "button",
  unique_id = "unique_id",
  verification = "verification",
  title = "title",
  rich_text = "rich_text",
  people = "people",
  relation = "relation",
  rollup = "rollup"
}

const setupn2m = () => {
  const notion = getConnection();
  const n2m = new NotionToMarkdown({ notionClient: notion });
  return n2m;
};

export function formatBatchStacks(stacks: GetStackContentResponse[]): Stack[] {
  return stacks.map((stack) => {
    const formatted = formatProperties<FormatedFile>(stack.properties);
    return {
      icon: formatted.file,
      name: formatted.name,
      id: String(formatted.id)
    };
  });
}

function formatProperties<T>(properties: PageObjectResponse["properties"]): T {
  const formatterByType: Record<string, (key: string, value: any) => void> = {
    [PropertyKeys.unique_id]: (key: string, value: any) => {
      const { number } = (value as any)[value.type];
      return { [key]: number };
    },
    [PropertyKeys.rich_text]: (key: string, value: any) => {
      const n2m = setupn2m();
      const { annotations, plain_text } = (value as any)[value.type][0];
      return { [key]: n2m.annotatePlainText(plain_text, annotations) };
    },
    [PropertyKeys.relation]: (key: string, value: any) => {
      const relation = (value as any)[value.type];
      return { [key]: relation };
    },
    [PropertyKeys.title]: (key: string, value: any) => {
      const { plain_text } = (value as any)[value.type][0];
      return { [key]: plain_text };
    },
    [PropertyKeys.files]: (_key: string, value: NotionFiles) => {
      const { file } = (value as any)[value.type][0];
      return { file: file.url };
    }
  };

  const newValue = Object.entries(properties)
    .map(([key, value]) => {
      const formatter = formatterByType[PropertyKeys[value.type]];
      if (formatter) {
        return formatter(key, value);
      }
      return { [key]: value };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return <T>newValue;
}

function formatBlocks(mdBlocks: GetPageContentResponse["mdBlocks"]): { markdown: string } {
  const notion = getConnection();
  const n2m = new NotionToMarkdown({ notionClient: notion });

  return <{ markdown: string }>n2m.toMarkdownString(mdBlocks, "markdown", 0);
}

export function formatPageContent<T>(content: GetPageContentResponse) {
  const { mdBlocks, properties } = content;

  const formattedProperties = formatProperties(properties);

  const { markdown } = formatBlocks(mdBlocks) as unknown as { markdown: string };
  return {
    markdown,
    properties: formattedProperties as T
  };
}
