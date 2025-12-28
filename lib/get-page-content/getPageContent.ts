import { AppLogger } from "@/lib/logger/logger";
import { notFound } from "next/navigation";
import nextApiRequest from "../next/nextApiRequest";
import { Case } from "@/types/case";
import NEXT_API_ENDPOINTS from "@/utils/nextApiEndpoints";
import HTTP_METHODS from "@/utils/httpsMethods";

const getPageContent = async (slug: string): Promise<Case> => {
  try {
    AppLogger.trace("Getting page content", { slug });

    return await nextApiRequest<Case>({
      endPoint: NEXT_API_ENDPOINTS.GET_CASE_BY_SLUG(slug),
      method: HTTP_METHODS.GET
    });
  } catch (error) {
    AppLogger.fatal("Error fetching page content", { slug, error });
    return notFound();
  }
};

export default getPageContent;
