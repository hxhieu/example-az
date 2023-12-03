import { FastifyPluginAsync } from "fastify";
import { decode } from "../../services/tokenizer";
import * as db from "../../services/db";

const detokenize: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", async function (request, reply) {
    try {
      const result = await Promise.all(
        (request.body as []).map((token) => decode(token, db))
      );
      reply.send(result);
    } catch (err) {
      request.log.error(err);
      reply.code(500).send("cannot parse request");
    }
  });
};

export default detokenize;
