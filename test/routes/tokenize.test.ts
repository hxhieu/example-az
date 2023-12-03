import { test } from "tap";
import { build } from "../helper";

test("tokenize must return array of tokens", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/tokenize",
    payload: ["hello"],
  });

  const json = JSON.parse(res.payload);

  t.type(json, "array");
});
