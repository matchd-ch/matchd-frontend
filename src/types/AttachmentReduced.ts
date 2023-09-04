import type { Attachment } from "@/api/models/types";
type AttachmentReduced = Pick<Attachment, "id" | "mimeType" | "url">;
export default AttachmentReduced;
