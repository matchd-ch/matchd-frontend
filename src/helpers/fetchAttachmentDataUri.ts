import type { Attachment } from "@/api/models/types";
import { useStore } from "@/store";

export default async function fetchAttachmentDataUri(url: Attachment["url"], stack: string) {
  const store = useStore();
  const result = await fetch(url.replace("{stack}", stack), {
    headers: {
      authorization: `JWT ${store.getters["accessToken"]}`,
    },
  });
  return URL.createObjectURL(await result.blob());
}
