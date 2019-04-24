export const setCookie = (cookies, token) => {
  cookies.set("NR_Token", token, { maxAge: 3600 });
};

export const getCookie = cookies => {
  return cookies.get("NR_Token");
};
