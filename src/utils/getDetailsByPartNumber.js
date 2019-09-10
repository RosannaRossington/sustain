import querystring from "query-string";
import authenticatedRequest from "../authenticatedRequest";

export default function getDetailsByPartNumber(params) {
  let {
    baseUrl,
    brandId,
    country,
    partNumber,
    options,
    uberToken,
    clientId,
    clientSecret
  } = params;

  const localisedBrand = `${brandId}_${country.toLowerCase()}`;
  const optionalQuery = options ? `?${querystring.stringify(options)}` : "";

  const concatUrl = `${baseUrl}search/resources/store/${localisedBrand}/productview/${partNumber}${optionalQuery}`;
  return;
  authenticatedRequest(
    new Request(concatUrl),
    uberToken,
    clientId,
    clientSecret
  );
}
