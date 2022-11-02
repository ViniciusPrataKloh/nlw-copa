import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.users.create({
        data: {
            name: "John Doe",
            email: "john.doe@gmail.com",
            avatarUrl: "https://github.com/ViniciusPrataKloh.png"
        }
    });

    const pool = await prisma.pools.create({
        data: {
            title: "Example Pool",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    });

    const game1 = await prisma.games.create({
        data: {
            date: '2022-11-02T20:00:00.162Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    });

    const game2 = await prisma.games.create({
        data: {
            date: '2022-11-02T20:00:00.162Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 3,
                    secondTeamPoints: 0,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });
}

main()