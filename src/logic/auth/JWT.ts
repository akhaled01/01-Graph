/**
 * Obtain's the JWT token of the user to make GraphQL queries
 *
 * @param identifier - username/email of the user
 * @param password - plain text password of the user
 * @returns token - the JWT token or "400" if issue faced
 */
export const JWT = async (
  identifier: string,
  password: string
): Promise<string> => {
  const auth_url = "https://learn.reboot01.com/api/auth/signin";
  let encoded_auth = Buffer.from(`${identifier}:${password}`).toString(
    "base64"
  );

  const res = await fetch(auth_url, {
    method: "POST",
    body: JSON.stringify({
      Authorization: `Basic ${encoded_auth}`,
    }),
  });

  if (res.status === 200) {
    localStorage.setItem("JWT_TOKEN", await res.text());
    return "200";
  } else if (res.status === 401) {
    return "401";
  } else {
    console.warn("status code", res.status, res.statusText);
    return "500";
  }
};
