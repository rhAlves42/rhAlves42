import { Client as NotionClient } from "@notionhq/client";

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
