import { PORT } from "../port";

/**
 * Asynchronous function to sign up a user by sending a POST request to the server with user information.
 *
 * @param {Event} e - The event object.
 * @return {string} Returns an error message if any.
 */
export default async function httpRequest(url, http_method, request_headers, request_body) {
  try {
    const res = await fetch(url, {
      method: http_method,
      headers: request_headers,
      body: request_body
     });

    const data = await res.json();
    if (data?.error) throw data;
  } catch (error) {
    return error.error;
  }
}
}
