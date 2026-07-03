import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  const email = 'human.sany7@gmail.com'
  const password = 'sany2917'
  
  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  })

  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
