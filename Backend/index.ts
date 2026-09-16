
import "dotenv/config"
import { PrismaClient } from "./generated/prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })
async function main() {
    const newUser = await prisma.user.create({
        data: { 
            name: "Tito",
            surname: "Nico",
            password: "herreraymorejon",
            birthdate: new Date("2001-01-01"),
            email: "titonico17@gmail.com"
        }
    })
    console.log(newUser);
}

main()