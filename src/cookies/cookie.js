export const setCookie = (cookies, token) => {
  cookies.set("NR_Token", token, { path: "/", maxAge: 21600 });
};

export const getCookie = cookies => {
  return cookies.get("NR_Token");
};
