import { formatPageContent } from "lib/content-formatter/contentFormatter";
import {
  getDatabaseIdOrError,
  getPageContent as notionGetPageContent,
  queryDatabase
} from "lib/notion/get-pages";
import { notFound } from "next/navigation";

type PageProperties = {
  title: string;
  slug: string;
  content: string;
  description: string;
};

const getPageContent = async (slug: string) => {
  const databaseId = getDatabaseIdOrError();
  const queryResponse = await queryDatabase(databaseId, {
    filter: {
      property: "slug",
      rich_text: {
        equals: slug
      }
    },
    page_size: 1
  });
  const pageId = queryResponse[0]?.id;

  if (!pageId) {
    return notFound();
  }
  const pageContent = await notionGetPageContent({ pageId });
  const formatted = formatPageContent<PageProperties>(pageContent);

  return formatted;
};

export default getPageContent;
