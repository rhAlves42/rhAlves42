import nextApiRequest from "../next/nextApiRequest";
import { CaseCard } from "@/types/case";
import NEXT_API_ENDPOINTS from "@/utils/nextApiEndpoints";
import HTTP_METHODS from "@/utils/httpsMethods";
import { AppLogger } from "@/lib/logger/logger";

const getCardsContent = async (): Promise<CaseCard[]> => {
  try {
    AppLogger.error("Getting cards content");

    return await nextApiRequest<CaseCard[]>({
      endPoint: NEXT_API_ENDPOINTS.GET_CARDS,
      method: HTTP_METHODS.GET
    });
  } catch (error) {
    AppLogger.error("Error fetching cards content", { error });
    return [];
  }
};

export default getCardsContent;
