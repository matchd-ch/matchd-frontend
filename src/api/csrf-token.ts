import { VueCookieNext } from "vue-cookie-next";

export const fetchCsrfToken = async (baseUrl: string): Promise<string | undefined> => {
  const response = await fetch(`${baseUrl}/csrf/`, {
    credentials: "include",
  });
  if (response.status !== 204) {
    return;
  }
  return VueCookieNext.getCookie("csrftoken");
};
