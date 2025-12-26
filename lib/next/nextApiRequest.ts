import HTTP_METHODS from "@/utils/httpsMethods";
import { logger } from "@sentry/nextjs";

type NextApiRequestParams = {
  method: HTTP_METHODS;
  endPoint: string;
  body?: any;
  params?: any;
  signal?: AbortSignal;
};
const nextApiRequest = async <T>({
  endPoint,
  method,
  body,
  params,
  signal
}: NextApiRequestParams): Promise<T> => {
  try {
    logger.trace("Calling nextApiRequest", {
      endPoint,
      method,
      body,
      params
    });
    const queryString = params ? "?" + new URLSearchParams(params).toString() : "";
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${endPoint}${queryString}`;

    const fetchOptions: RequestInit = {
      next: {
        revalidate: 60
      },
      method,
      body: method == HTTP_METHODS.GET ? undefined : JSON.stringify(body ?? {}),
      headers: {
        "Content-Type": "application/json"
      },
      ...(signal ? { signal } : {})
    };

    return <T>await fetch(url, fetchOptions).then(async (res) => await res.json());
  } catch (error: unknown) {
    logger.fatal("Error in nextApiRequest", {
      endPoint,
      method,
      body,
      params,
      error
    });
    throw error;
  }
};
export default nextApiRequest;
