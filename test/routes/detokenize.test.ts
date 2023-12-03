import { test } from "tap";
import { build } from "../helper";

test("detokenize must return an array of results", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/detokenize",
    payload: ["hello"],
  });

  const json = JSON.parse(res.payload);

  t.type(json, "array");
});
