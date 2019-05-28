export const setCookie = (cookies, token) => {
  cookies.set("NR_Token", token, { path: "/", maxAge: 7200 });
};

export const getCookie = cookies => {
  return cookies.get("NR_Token");
};
