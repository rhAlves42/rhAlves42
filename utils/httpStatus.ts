export enum HttpStatusCode {
  // 1xx Informational
  Continue = 100,
  SwitchingProtocols = 101,

  // 2xx Success
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  // 3xx Redirection
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,

  // 4xx Client Error
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  UnprocessableEntity = 422,

  // 5xx Server Error
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504
}
