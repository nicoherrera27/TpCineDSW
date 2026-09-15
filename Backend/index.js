import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const newUser = await prisma.user.create({
        data: { 
            name: "Tito",
            surname: "Nico",
            password: "herreraymorejon",
            birthdate: "2001-01-01",
            email: "titonico17@gmail.com"
        }
    })
    console.log(newUser);
}

main()