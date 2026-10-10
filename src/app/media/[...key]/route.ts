import { getCloudflareContext } from "@opennextjs/cloudflare";

import { isValidMediaKey } from "@/lib/media";

/** Serves uploaded images from R2. Keys are unique, so responses are cached for a year. */
export async function GET(request: Request, { params }: RouteContext<"/media/[...key]">) {
  const key = (await params).key.join("/");
  if (!isValidMediaKey(key)) {
    return new Response("Not found", { status: 404 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const object = await env.MEDIA.get(key, { onlyIf: request.headers });
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("x-content-type-options", "nosniff");

  // A conditional request that matched returns metadata only.
  if (!("body" in object)) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(object.body, { headers });
}
