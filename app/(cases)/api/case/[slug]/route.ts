import { type NextRequest, NextResponse } from "next/server";

import { Case } from "@/types/case";
import { formatBatchStacks, formatPageContent } from "lib/content-formatter/contentFormatter";
import { getPageContent as notionGetPageContent, queryCasesBySlug } from "@/lib/notion/get-cases";

import { HttpStatusCode } from "@/utils/httpStatus";
import { logger } from "@sentry/nextjs";
import { getStackBatchContent } from "@/lib/notion/get-stacks";

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

    const { properties, markdown } = formatPageContent<Case>(pageContent);
    const stacksBatch = properties.stack.map((stack) => ({ stackId: stack.id }));
    const rawStacks = await getStackBatchContent(stacksBatch);
    const stacks = formatBatchStacks(rawStacks);

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
    logger.error("Error in GET /api/case/[slug]:", error);
    return NextResponse.json({} as Case, { status: HttpStatusCode.InternalServerError });
  }
}
