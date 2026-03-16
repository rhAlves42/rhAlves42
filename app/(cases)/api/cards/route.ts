import { type NextRequest, NextResponse } from "next/server";

import { CaseCard } from "@/types/case";
import { formatCardsContent } from "lib/content-formatter/contentFormatter";
import { queryCasesByHighlight } from "@/lib/notion/get-cases";
import {getDatabase} from "@/lib/notion/connection";

import { HttpStatusCode } from "@/utils/httpStatus";
import { AppLogger } from "@/lib/logger/logger";
import { DATABASES } from "@/lib/notion/types";

export async function GET(_req: NextRequest) {
  try {
    const retrievedDB = await getDatabase(DATABASES.CASES)
    const queryCasesResponse = await queryCasesByHighlight({
      pageSize: 2
    });

    const data = formatCardsContent(queryCasesResponse);
    console.info("GET /api/cards successful: " + data.length);
    console.info("GET retrievedDB: " + retrievedDB);

    return NextResponse.json(data, {
      status: HttpStatusCode.OK
    });
  } catch (error: any) {
    AppLogger.error("Error in GET /api/cards:", error);
    return NextResponse.json([] as CaseCard[], { status: HttpStatusCode.InternalServerError });
  }
}
