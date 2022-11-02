import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
    log: ['query']
});


async function boostrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true
    });

    fastify.get("/pools/count", async () => {
        const count = await prisma.pools.count();

        return { count };
    });

    fastify.get("/users/count", async () => {
        const count = await prisma.users.count();

        return { count };
    });

    fastify.get("/guesses/count", async () => {
        const count = await prisma.guesses.count();

        return { count };
    });

    fastify.post("/pools", async (request, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(request.body);
        const generate = new ShortUniqueId({ length: 6 })
        const shortCode = String(generate()).toLocaleUpperCase();

        const pool = await prisma.pools.create({
            data: {
                title,
                code: shortCode
            }
        });

        return reply.status(201).send(pool.code);
    });

    await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

boostrap();