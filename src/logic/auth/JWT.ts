import { GetLogin } from "../graphql/apollo/basicinfo";
import { CredentialStore, setJwt, setLogin } from "../context/actions";

/**
 * Obtain the JWT token of the user to make GraphQL queries
 *
 * @param identifier - username/email of the user
 * @param password - plain text password of the user
 * @param dispatch - Redux dispatch function
 * @returns error if any
 */
export const JWT = async (
  identifier: string,
  password: string,
  dispatch: (action: any) => void
): Promise<string> => {
  if (!identifier || !password) return "401";

  const authUrl = "https://learn.reboot01.com/api/auth/signin";
  const encodedAuth = Buffer.from(`${identifier}:${password}`).toString(
    "base64"
  );

  try {
    const res = await fetch(authUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedAuth}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const jwt = await res.text();

      dispatch(setJwt(jwt.replaceAll('"', "")));

      const loginRes = await GetLogin();

      if (!loginRes || !loginRes.login) {
        console.warn("Failed to fetch user login information");
        return "500";
      }

      dispatch(setLogin(loginRes.login));

      return "";
    } else if (res.status === 401 || res.status === 403) {
      return "401";
    } else {
      console.warn("Status code:", res.status, res.statusText);
      return "500";
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return "500";
  }
};
