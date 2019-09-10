export default function authenticatedRequest(
  request,
  uberToken,
  clientId,
  clientSecret
) {
  if (clientId) {
    request.headers.set("X-Ibm-Client-ID", clientId);
  }
  if (clientSecret) {
    request.headers.set("X-Ibm-Client-Secret", clientSecret);
  }
  if (uberToken) {
    request.headers.set("X-Ubertoken", uberToken);
  }

  return request;
}
