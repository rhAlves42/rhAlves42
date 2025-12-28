import { type NextRequest, NextResponse } from "next/server";

import { CaseCard } from "@/types/case";
import { formatCardsContent } from "lib/content-formatter/contentFormatter";
import { queryCasesByHighlight } from "@/lib/notion/get-cases";

import { HttpStatusCode } from "@/utils/httpStatus";
import { AppLogger } from "@/lib/logger/logger";

export async function GET(_req: NextRequest) {
  try {
    const queryCasesResponse = await queryCasesByHighlight({
      pageSize: 2
    });

    const data = formatCardsContent(queryCasesResponse);
    return NextResponse.json(data, {
      status: HttpStatusCode.OK
    });
  } catch (error: any) {
    AppLogger.error("Error in GET /api/cards:", error);
    return NextResponse.json([] as CaseCard[], { status: HttpStatusCode.InternalServerError });
  }
}
