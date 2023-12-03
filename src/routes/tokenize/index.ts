import { FastifyPluginAsync } from "fastify";

const tokenize: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    throw new Error("tokenize not implemented");
  });
};

export default tokenize;
