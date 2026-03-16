import { NextResponse } from "next/server";

/**
 * Debug route to inspect presence of Notion-related environment variables.
 *
 * IMPORTANT:
 * - This endpoint intentionally does NOT return the full NOTION_API_KEY value.
 *   It only returns presence, length, and a safely-redacted prefix/suffix.
 * - Do NOT enable this in a public-facing production site unless you understand
 *   the security implications.
 */
export async function GET() {
  const token = process.env.NOTION_API_KEY ?? null;
  const casesDb = process.env.NOTION_CASES_DATABASE_ID ?? null;
  const stackDb = process.env.NOTION_STACK_DATABASE_ID ?? null;

  const safeRedact = (value: string | null) => {
    if (!value) return null;
    // show a short prefix and suffix, never the full secret
    const prefix = value.slice(0, 6);
    const suffix = value.length > 10 ? value.slice(-4) : "";
    return `${prefix}...${suffix}`;
  };

  const payload = {
    node_env: process.env.NODE_ENV ?? null,
    notion_api_key_set: !!token,
    notion_api_key_length: token ? token.length : 0,
    notion_api_key_redacted: safeRedact(token),
    notion_cases_database_id_set: !!casesDb,
    notion_cases_database_id: casesDb ? safeRedact(casesDb) : null,
    notion_stack_database_id_set: !!stackDb,
    notion_stack_database_id: stackDb ? safeRedact(stackDb) : null,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(payload, {
    status: 200,
    // don't cache this; it's for ad-hoc debugging
    headers: {
      "cache-control": "no-store"
    }
  });
}
