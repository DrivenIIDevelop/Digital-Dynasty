import { PORT } from "../port";

/**
 * Asynchronous function to sign up a user by sending a POST request to the server with user information.
 *
 * @param {Event} e - The event object.
 * @return {string} Returns an error message if any.
 */
export default async function SignUpApi(e) {
  try {
    const res = await fetch(`http://localhost:${PORT}/auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        country: e.target.country.value,
        address: e.target.address.value,
        zipcode: e.target.zipcode.value,
        phone: e.target.phone.value,
      }),
    });

    const data = await res.json();
    if (data?.error) throw data;
  } catch (error) {
    return error.error;
  }
}
