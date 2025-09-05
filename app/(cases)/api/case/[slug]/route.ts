import { type NextRequest, NextResponse } from "next/server";

import { Case } from "@/types/case";
import { formatPageContent } from "lib/content-formatter/contentFormatter";
import { getPageContent as notionGetPageContent, queryCasesBySlug } from "@/lib/notion/get-cases";
import { HttpStatusCode } from "@/utils/httpStatus";
import { logger } from "@sentry/nextjs";

type PageProperties = {
  title: string;
  slug: string;
  content: string;
  description: string;
  stacks: string[];
};
type Context = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_req: NextRequest, context: Context) {
  try {
    const { slug } = await context.params;
    const queryCasesResponse = await queryCasesBySlug({
      pageSize: 1,
      slug
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
