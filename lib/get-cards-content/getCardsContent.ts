import { logger } from "@sentry/nextjs";

import nextApiRequest from "../next/nextApiRequest";
import { CaseCard } from "@/types/case";
import NEXT_API_ENDPOINTS from "@/utils/nextApiEndpoints";
import HTTP_METHODS from "@/utils/httpsMethods";

const getCardsContent = async (): Promise<CaseCard[]> => {
  try {
    logger.trace("Getting cards content");

    const response = await nextApiRequest<CaseCard[]>({
      endPoint: NEXT_API_ENDPOINTS.GET_CARDS,
      method: HTTP_METHODS.GET
    });

    return response;
  } catch (error) {
    logger.error("Error fetching cards content", { error });
    return [];
  }
};

export default getCardsContent;
