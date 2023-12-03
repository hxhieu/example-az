import { FastifyPluginAsync } from "fastify";
import { encode } from "../../services/tokenizer";
import * as db from "../../services/db";

const tokenize: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", async function (request, reply) {
    try {
      const result = await Promise.all(
        (request.body as []).map((raw) => encode(raw, db))
      );
      reply.send(result);
    } catch (err) {
      request.log.error(err);
      reply.code(500).send("cannot parse request");
    }
  });
};

export default tokenize;
