import { e as error } from "../../../../chunks/index.js";
import { unfurl } from "unfurl.js";
const GET = async ({ url: request }) => {
  const url = request.searchParams.get("url");
  if (!url) {
    throw error(404, {
      message: "require url param"
    });
  }
  const result = await unfurl(url).catch((err) => {
    throw error(404, {
      message: err
    });
  });
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "text/json" }
  });
};
export {
  GET
};
