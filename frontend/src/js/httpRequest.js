// Sends an asynchronous HTTP request to the specified URL with the given HTTP method,
// request headers, and request body.

export default async function httpRequest({
  url,
  http_method,
  request_headers,
  request_body,
}) {
  try {
    const res = await fetch(url, {
      method: http_method,
      headers: request_headers,
      body: request_body,
    });
    const data = await res.json();
    if (data?.error) throw data;
    return data;
  } catch (error) {
    return error;
  }
}
