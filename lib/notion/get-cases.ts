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
}: QueryByHighlightParams): Promise<PageObjectResponse[]> => {
  return queryDatabase(DATABASES.CASES, {
    filter: {
      property: "highlight",
      checkbox: {
        equals: true
      }
    },
    page_size: pageSize
  });
  // return [
  //   {
  //     object: "page",
  //     id: "26872b39-2f75-80c4-9d11-d2e5b8294997",
  //     created_time: "2025-09-08T22:18:00.000Z",
  //     last_edited_time: "2025-09-08T23:01:00.000Z",
  //     created_by: { object: "user", id: "5d6c34b2-e516-45c3-9cfc-259ca39bdee6" },
  //     last_edited_by: { object: "user", id: "5d6c34b2-e516-45c3-9cfc-259ca39bdee6" },
  //     cover: null,
  //     icon: null,
  //     parent: { type: "database_id", database_id: "25e72b39-2f75-8074-9b9e-e4540f422e8e" },
  //     archived: false,
  //     in_trash: false,
  //     properties: {
  //       card_image: {
  //         id: "%40wsP",
  //         type: "files",
  //         files: [
  //           {
  //             name: "idea_zarvos.webp",
  //             type: "file",
  //             file: {
  //               url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/198f7efe-07d5-488f-bc0c-5bb4fd2798b5/c9cf9df0-1a0d-45d7-9ec4-f693b139baaf/idea_zarvos.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466672MFHNA%2F20250908%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250908T230837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIA4c%2FndspCbQym%2Bm%2BDkscBWXaFZDq%2BS%2BqXzs0cayoePhAiEAp4WrZOCK81h%2FIuaZJ5v3hSXstjDkD%2FZSRTC41PpXfZgqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHGcqevoa5X6QfojBSrcA4WEg6aYTieO129JXXRwfkRTZr%2FT4SECxZiwlCweN3DamqdGLUfm8uOTYajNIZavvSP7YboplXsPFZ4lzcCOal62kG1%2FK8QR7w5BG734xQyp5cSfDDVIrULFzucpdXlSfJTzmMeBfWMB6qUDDi6ClLSiUOwCZyyov9vEyCUjM9LA%2FouJAqal7hfg7F5Mz5i4boUo05ZhkLZbcOxTLjecEv2Nxc00z3a09dQUZPgmBC42Dh5%2BaOaS9nzOgZtOxaUV0agbtQq6jx%2BiSVjLbAjXQHu5lv6YZiUw3u6p2dwwAy70zLcPMxNiTh9VG7IghYtR2OOalZjo2wMDFv1qqT47WeFy3F9%2BXetVHIK4nWLPCEii%2FzUaMEhr9dVCNt4Gp0HnoLBUblaxXTUEEaHTioWqsimx895iP6cyNFWb0rVCXEq6coLZ%2BTJIKYktO9XBBDx%2FMzEZxuVaZQ3iaSpgdrEUIM1KWayn1qpG0nSuTywcFu94xcxMJwdpwNR2nyq6uANIO9kMeoJxBlReAK7ihwRnuryNPdDjPLWKlMa7VKTta%2Fj608%2FM%2B%2B6mlY%2Fq54u8SVI6pa0Jtl3fTGle%2B6ettfbBuD2eszIXhbRo1IbF6TzzzIKDTffJK4hEugLvVxpqMI7B%2FcUGOqUBLhdCWvEITtK6w%2FMFBMskOls8K7L94f84NQw4rLXOz0QVaNw%2FGzv7ELBlHMx0fJEUI5EbtgmXJVLniVx4McSNfWPkJzlO0o1veXlgO5%2FDzZn%2FNLohA8Qs8fC%2FODZAIoCwXwlJTbejJhLoA2f%2BDvF3Plj0LGNaP6Jp49GPl2%2Bsx4f7GU2j1kH%2Bfwioh5B3D3zqzPOMq1xHiiaABiE6bTrZeHGTEk0M&X-Amz-Signature=496780445b6955b3f8a56aaeec0221a965b9b7d6f7340eb7858656cbacb918ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
  //               expiry_time: "2025-09-09T00:08:37.003Z"
  //             }
  //           }
  //         ]
  //       },
  //       stack: {
  //         id: "JRB%5E",
  //         type: "relation",
  //         relation: [
  //           { id: "25e72b39-2f75-8011-9b7b-e6571324d141" },
  //           { id: "25e72b39-2f75-80e3-88e9-cd50f2e8246c" },
  //           { id: "25e72b39-2f75-80d2-80ca-c93285656f23" }
  //         ]
  //       },
  //       description: {
  //         id: "%5BYCH",
  //         type: "rich_text",
  //         rich_text: [
  //           {
  //             type: "text",
  //             text: {
  //               content:
  //                 "I migrated a React Native app from version 0.55 to 0.64 using step by step approach. I worked with Java and Objective-C code changes. This migration improved app security and solved common usability problems.",
  //               link: null
  //             },
  //             annotations: {
  //               bold: false,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text:
  //               "I migrated a React Native app from version 0.55 to 0.64 using step by step approach. I worked with Java and Objective-C code changes. This migration improved app security and solved common usability problems.",
  //             href: null
  //           }
  //         ]
  //       },
  //       slug: {
  //         id: "ah%7B%7B",
  //         type: "rich_text",
  //         rich_text: [
  //           {
  //             type: "text",
  //             text: { content: "react-native-app-migration", link: null },
  //             annotations: {
  //               bold: false,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text: "react-native-app-migration",
  //             href: null
  //           }
  //         ]
  //       },
  //       highlight: { id: "avIF", type: "checkbox", checkbox: true },
  //       title: {
  //         id: "title",
  //         type: "title",
  //         title: [
  //           {
  //             type: "text",
  //             text: { content: "React Native App Migration", link: null },
  //             annotations: {
  //               bold: true,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text: "React Native App Migration",
  //             href: null
  //           }
  //         ]
  //       }
  //     },
  //     url: "https://www.notion.so/React-Native-App-Migration-26872b392f7580c49d11d2e5b8294997",
  //     public_url: null
  //   },
  //   {
  //     object: "page",
  //     id: "26872b39-2f75-80f1-b8cf-c22931da49af",
  //     created_time: "2025-09-08T21:56:00.000Z",
  //     last_edited_time: "2025-09-08T23:01:00.000Z",
  //     created_by: { object: "user", id: "5d6c34b2-e516-45c3-9cfc-259ca39bdee6" },
  //     last_edited_by: { object: "user", id: "5d6c34b2-e516-45c3-9cfc-259ca39bdee6" },
  //     cover: null,
  //     icon: null,
  //     parent: { type: "database_id", database_id: "25e72b39-2f75-8074-9b9e-e4540f422e8e" },
  //     archived: false,
  //     in_trash: false,
  //     properties: {
  //       card_image: {
  //         id: "%40wsP",
  //         type: "files",
  //         files: [
  //           {
  //             name: "idea_zarvos.webp",
  //             type: "file",
  //             file: {
  //               url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/198f7efe-07d5-488f-bc0c-5bb4fd2798b5/c9cf9df0-1a0d-45d7-9ec4-f693b139baaf/idea_zarvos.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466672MFHNA%2F20250908%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250908T230837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIA4c%2FndspCbQym%2Bm%2BDkscBWXaFZDq%2BS%2BqXzs0cayoePhAiEAp4WrZOCK81h%2FIuaZJ5v3hSXstjDkD%2FZSRTC41PpXfZgqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHGcqevoa5X6QfojBSrcA4WEg6aYTieO129JXXRwfkRTZr%2FT4SECxZiwlCweN3DamqdGLUfm8uOTYajNIZavvSP7YboplXsPFZ4lzcCOal62kG1%2FK8QR7w5BG734xQyp5cSfDDVIrULFzucpdXlSfJTzmMeBfWMB6qUDDi6ClLSiUOwCZyyov9vEyCUjM9LA%2FouJAqal7hfg7F5Mz5i4boUo05ZhkLZbcOxTLjecEv2Nxc00z3a09dQUZPgmBC42Dh5%2BaOaS9nzOgZtOxaUV0agbtQq6jx%2BiSVjLbAjXQHu5lv6YZiUw3u6p2dwwAy70zLcPMxNiTh9VG7IghYtR2OOalZjo2wMDFv1qqT47WeFy3F9%2BXetVHIK4nWLPCEii%2FzUaMEhr9dVCNt4Gp0HnoLBUblaxXTUEEaHTioWqsimx895iP6cyNFWb0rVCXEq6coLZ%2BTJIKYktO9XBBDx%2FMzEZxuVaZQ3iaSpgdrEUIM1KWayn1qpG0nSuTywcFu94xcxMJwdpwNR2nyq6uANIO9kMeoJxBlReAK7ihwRnuryNPdDjPLWKlMa7VKTta%2Fj608%2FM%2B%2B6mlY%2Fq54u8SVI6pa0Jtl3fTGle%2B6ettfbBuD2eszIXhbRo1IbF6TzzzIKDTffJK4hEugLvVxpqMI7B%2FcUGOqUBLhdCWvEITtK6w%2FMFBMskOls8K7L94f84NQw4rLXOz0QVaNw%2FGzv7ELBlHMx0fJEUI5EbtgmXJVLniVx4McSNfWPkJzlO0o1veXlgO5%2FDzZn%2FNLohA8Qs8fC%2FODZAIoCwXwlJTbejJhLoA2f%2BDvF3Plj0LGNaP6Jp49GPl2%2Bsx4f7GU2j1kH%2Bfwioh5B3D3zqzPOMq1xHiiaABiE6bTrZeHGTEk0M&X-Amz-Signature=496780445b6955b3f8a56aaeec0221a965b9b7d6f7340eb7858656cbacb918ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
  //               expiry_time: "2025-09-09T00:08:37.003Z"
  //             }
  //           }
  //         ]
  //       },
  //       stack: {
  //         id: "JRB%5E",
  //         type: "relation",
  //         relation: [
  //           { id: "25e72b39-2f75-809e-9ad0-f7868ef71f94" },
  //           { id: "25e72b39-2f75-8048-935c-e2335fa9788c" },
  //           { id: "25e72b39-2f75-80e3-88e9-cd50f2e8246c" },
  //           { id: "25e72b39-2f75-80d2-80ca-c93285656f23" },
  //           { id: "26872b39-2f75-80ee-93a3-ed018b7295b2" },
  //           { id: "26872b39-2f75-808a-94a5-fbbaac0d777d" },
  //           { id: "25e72b39-2f75-80f9-8841-c3d43e44ba6d" },
  //           { id: "26872b39-2f75-803a-a9cc-e99788859656" },
  //           { id: "26872b39-2f75-80f2-bf24-ec4aace84fe2" },
  //           { id: "26872b39-2f75-8070-9278-f7ca5e1a1192" },
  //           { id: "26872b39-2f75-80f8-a481-edfceb7a2008" }
  //         ]
  //       },
  //       description: {
  //         id: "%5BYCH",
  //         type: "rich_text",
  //         rich_text: [
  //           {
  //             type: "text",
  //             text: {
  //               content:
  //                 "I developed features for a app focused in older users with low contact with technology. I improved onboarding flow reducing friction and worked with NextJS, React, TypeScript and FastAPI. This made the app more simple and usable.",
  //               link: null
  //             },
  //             annotations: {
  //               bold: false,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text:
  //               "I developed features for a app focused in older users with low contact with technology. I improved onboarding flow reducing friction and worked with NextJS, React, TypeScript and FastAPI. This made the app more simple and usable.",
  //             href: null
  //           }
  //         ]
  //       },
  //       slug: {
  //         id: "ah%7B%7B",
  //         type: "rich_text",
  //         rich_text: [
  //           {
  //             type: "text",
  //             text: { content: "frontend_app_for_older_users", link: null },
  //             annotations: {
  //               bold: false,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text: "frontend-app-for-older-users",
  //             href: null
  //           }
  //         ]
  //       },
  //       highlight: { id: "avIF", type: "checkbox", checkbox: true },
  //       title: {
  //         id: "title",
  //         type: "title",
  //         title: [
  //           {
  //             type: "text",
  //             text: { content: "Frontend App for Older Users", link: null },
  //             annotations: {
  //               bold: false,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text: "Frontend App for Older Users",
  //             href: null
  //           }
  //         ]
  //       }
  //     },
  //     url: "https://www.notion.so/Frontend-App-for-Older-Users-26872b392f7580f1b8cfc22931da49af",
  //     public_url: null
  //   },
  //   {
  //     object: "page",
  //     id: "25e72b39-2f75-80cf-8c59-f75d90116507",
  //     created_time: "2025-08-29T16:09:00.000Z",
  //     last_edited_time: "2025-09-08T22:55:00.000Z",
  //     created_by: { object: "user", id: "5d6c34b2-e516-45c3-9cfc-259ca39bdee6" },
  //     last_edited_by: { object: "user", id: "5d6c34b2-e516-45c3-9cfc-259ca39bdee6" },
  //     cover: null,
  //     icon: null,
  //     parent: { type: "database_id", database_id: "25e72b39-2f75-8074-9b9e-e4540f422e8e" },
  //     archived: false,
  //     in_trash: false,
  //     properties: {
  //       card_image: {
  //         id: "%40wsP",
  //         type: "files",
  //         files: [
  //           {
  //             name: "idea_zarvos.webp",
  //             type: "file",
  //             file: {
  //               url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/198f7efe-07d5-488f-bc0c-5bb4fd2798b5/c9cf9df0-1a0d-45d7-9ec4-f693b139baaf/idea_zarvos.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466672MFHNA%2F20250908%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250908T230837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIA4c%2FndspCbQym%2Bm%2BDkscBWXaFZDq%2BS%2BqXzs0cayoePhAiEAp4WrZOCK81h%2FIuaZJ5v3hSXstjDkD%2FZSRTC41PpXfZgqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHGcqevoa5X6QfojBSrcA4WEg6aYTieO129JXXRwfkRTZr%2FT4SECxZiwlCweN3DamqdGLUfm8uOTYajNIZavvSP7YboplXsPFZ4lzcCOal62kG1%2FK8QR7w5BG734xQyp5cSfDDVIrULFzucpdXlSfJTzmMeBfWMB6qUDDi6ClLSiUOwCZyyov9vEyCUjM9LA%2FouJAqal7hfg7F5Mz5i4boUo05ZhkLZbcOxTLjecEv2Nxc00z3a09dQUZPgmBC42Dh5%2BaOaS9nzOgZtOxaUV0agbtQq6jx%2BiSVjLbAjXQHu5lv6YZiUw3u6p2dwwAy70zLcPMxNiTh9VG7IghYtR2OOalZjo2wMDFv1qqT47WeFy3F9%2BXetVHIK4nWLPCEii%2FzUaMEhr9dVCNt4Gp0HnoLBUblaxXTUEEaHTioWqsimx895iP6cyNFWb0rVCXEq6coLZ%2BTJIKYktO9XBBDx%2FMzEZxuVaZQ3iaSpgdrEUIM1KWayn1qpG0nSuTywcFu94xcxMJwdpwNR2nyq6uANIO9kMeoJxBlReAK7ihwRnuryNPdDjPLWKlMa7VKTta%2Fj608%2FM%2B%2B6mlY%2Fq54u8SVI6pa0Jtl3fTGle%2B6ettfbBuD2eszIXhbRo1IbF6TzzzIKDTffJK4hEugLvVxpqMI7B%2FcUGOqUBLhdCWvEITtK6w%2FMFBMskOls8K7L94f84NQw4rLXOz0QVaNw%2FGzv7ELBlHMx0fJEUI5EbtgmXJVLniVx4McSNfWPkJzlO0o1veXlgO5%2FDzZn%2FNLohA8Qs8fC%2FODZAIoCwXwlJTbejJhLoA2f%2BDvF3Plj0LGNaP6Jp49GPl2%2Bsx4f7GU2j1kH%2Bfwioh5B3D3zqzPOMq1xHiiaABiE6bTrZeHGTEk0M&X-Amz-Signature=496780445b6955b3f8a56aaeec0221a965b9b7d6f7340eb7858656cbacb918ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
  //               expiry_time: "2025-09-09T00:08:37.003Z"
  //             }
  //           }
  //         ]
  //       },
  //       stack: {
  //         id: "JRB%5E",
  //         type: "relation",
  //         relation: [
  //           { id: "25e72b39-2f75-80e3-88e9-cd50f2e8246c" },
  //           { id: "25e72b39-2f75-80d2-80ca-c93285656f23" },
  //           { id: "25e72b39-2f75-80f9-8841-c3d43e44ba6d" },
  //           { id: "25e72b39-2f75-8048-935c-e2335fa9788c" },
  //           { id: "25e72b39-2f75-809e-9ad0-f7868ef71f94" },
  //           { id: "26872b39-2f75-803a-a9cc-e99788859656" },
  //           { id: "26872b39-2f75-80f2-bf24-ec4aace84fe2" },
  //           { id: "26872b39-2f75-8070-9278-f7ca5e1a1192" },
  //           { id: "26872b39-2f75-80f8-a481-edfceb7a2008" }
  //         ]
  //       },
  //       description: {
  //         id: "%5BYCH",
  //         type: "rich_text",
  //         rich_text: [
  //           {
  //             type: "text",
  //             text: {
  //               content:
  //                 " I worked in a portfolio website project for a construction company. I also acted temporary as team lead, managing communication with stakeholders and presenting deadlines. I learned to translate technical aspects to non-technical people and faced layout challenges that shaped me as developer.",
  //               link: null
  //             },
  //             annotations: {
  //               bold: false,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text:
  //               " I worked in a portfolio website project for a construction company. I also acted temporary as team lead, managing communication with stakeholders and presenting deadlines. I learned to translate technical aspects to non-technical people and faced layout challenges that shaped me as developer.",
  //             href: null
  //           }
  //         ]
  //       },
  //       slug: {
  //         id: "ah%7B%7B",
  //         type: "rich_text",
  //         rich_text: [
  //           {
  //             type: "text",
  //             text: { content: "portfolio-website-for-construction-company", link: null },
  //             annotations: {
  //               bold: false,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text: "portfolio-website-for-construction-company",
  //             href: null
  //           }
  //         ]
  //       },
  //       highlight: { id: "avIF", type: "checkbox", checkbox: true },
  //       title: {
  //         id: "title",
  //         type: "title",
  //         title: [
  //           {
  //             type: "text",
  //             text: { content: "Portfolio Website for Construction Company", link: null },
  //             annotations: {
  //               bold: false,
  //               italic: false,
  //               strikethrough: false,
  //               underline: false,
  //               code: false,
  //               color: "default"
  //             },
  //             plain_text: "Portfolio Website for Construction Company",
  //             href: null
  //           }
  //         ]
  //       }
  //     },
  //     url: "https://www.notion.so/Portfolio-Website-for-Construction-Company-25e72b392f7580cf8c59f75d90116507",
  //     public_url: null
  //   }
  // ];
};
