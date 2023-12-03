import { FastifyPluginAsync } from "fastify";

const detokenize: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    throw new Error("detokenize not implemented");
  });
};

export default detokenize;
