import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";

import { Case } from "@/types/case";
import { formatPageContent } from "lib/content-formatter/contentFormatter";
import { getPageContent as notionGetPageContent, queryDatabase } from "@/lib/notion/get-pages";
import { DATABASES } from "@/lib/notion/types";
import { HttpStatusCode } from "@/utils/httpStatus";
import { logger } from "@sentry/nextjs";

type PageProperties = {
  title: string;
  slug: string;
  content: string;
  description: string;
  stacks: string[];
};

export async function GET(_req: NextApiRequest, context: { params: { slug: string } }) {
  try {
    const { slug } = context.params;
    const queryCasesResponse = await queryDatabase(DATABASES.CASES, {
      filter: {
        property: "slug",
        rich_text: {
          equals: slug ?? ""
        }
      },
      page_size: 1
    });
    const pageId = queryCasesResponse[0]?.id;

    if (!pageId) {
      return NextResponse.json({} as Case, { status: HttpStatusCode.NotFound });
    }
    const pageContent = await notionGetPageContent({ pageId });
    const { properties, markdown } = formatPageContent<PageProperties>(pageContent);

    const stacks = properties.stacks || [];

    return NextResponse.json(
      {
        id: pageId,
        title: properties.title,
        content: markdown,
        description: properties.description,
        stack: stacks
      },
      {
        status: HttpStatusCode.OK
      }
    );
  } catch (error: any) {
    // Log the error for debugging purposes

    logger.error("Error in GET /api/case/[slug]:", error);

    return NextResponse.json({} as Case, { status: HttpStatusCode.InternalServerError });
  }
}
