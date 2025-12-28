import { GetServerSidePropsContext, NextApiRequest } from "next";
import HTTP_METHODS from "@/utils/httpsMethods";
import { AppLogger } from "@/lib/logger/logger";

interface ServerRequest {
  method: HTTP_METHODS;
  endPoint: string;
  context?: GetServerSidePropsContext;
  req?: NextApiRequest;
}

export interface ServerResponse<T> {
  data: T;
  status: number;
}

export const SERVER_API_ENDPOINTS = {
  CASES: process.env.CASES_ENDPOINT ?? "",
  STACK: process.env.STACK_ENDPOINT ?? ""
};

export const serverRequest = async <T>({
  method,
  endPoint,
  req
}: ServerRequest): Promise<ServerResponse<T>> => {
  try {
    AppLogger.trace("Calling serverRequest", { method, endPoint, req });
    const response = await fetch(endPoint, {
      method,
      body: JSON.stringify(req?.body),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (res) => await res.json());

    return { data: <T>response.data, status: response.status };
  } catch (error: any) {
    AppLogger.fatal("Error fetching API:", {
      data: error.response?.data,
      status: error.response?.status ?? 500
    });
    return {
      data: error.response?.data,
      status: error.response?.status ?? 500
    };
  }
};
