import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { sanityEnv } from "@/lib/sanity/env";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const redirectTo = url.searchParams.get("redirect") ?? "/";

  if (!sanityEnv.previewSecret || secret !== sanityEnv.previewSecret) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(redirectTo);
}
