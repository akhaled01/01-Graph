import { setCookie } from "cookies-next";

/**
 * Obtain's the JWT token of the user to make GraphQL queries
 *
 * @param identifier - username/email of the user
 * @param password - plain text password of the user
 * @returns error if any
 */
export const JWT = async (
  identifier: string,
  password: string
): Promise<string> => {
  if (!identifier || !password) return "401";

  const auth_url = "https://learn.reboot01.com/api/auth/signin";
  let encoded_auth = Buffer.from(`${identifier}:${password}`).toString(
    "base64"
  );

  const res = await fetch(auth_url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${encoded_auth}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    let token = await res.text();
    console.log(token);
    setCookie("JWT_TOKEN", token.replaceAll('"', ""), { maxAge: 60 * 60 });
    return "";
  } else if (res.status === 401 || res.status === 403) {
    return "401";
  } else {
    console.warn("status code", res.status, res.statusText);
    return "500";
  }
};
