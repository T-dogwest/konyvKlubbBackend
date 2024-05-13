import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()
async function main() {
 for (let i = 0; i < 15; i++) {
    await prisma.payments.create({
        data: {
            member_id:faker.datatype.number({min:1,max:11}),
            amount:faker.number.int(),
            paid_at:faker.date.recent()
        }
    })
    
 }
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