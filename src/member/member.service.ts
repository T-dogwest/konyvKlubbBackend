import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemberService {
  constructor(private readonly db:PrismaService){}
   create(createMemberDto: CreateMemberDto) {
    const newMember= this.db.members.create({
      data:{...createMemberDto,
        created_at:new Date(),
        birth_date:new Date(createMemberDto.birth_date)
      }
    });return newMember
  }
  async pay(id: number){
    try{
    const existMember=await this.db.members.findUnique({
      where:{id}
    })}catch(ex){
      throw new NotFoundException('Nincs ilyen Id',ex)

    }
    const currentMonth=new Date().getMonth()+1;
    const currentYear=new Date().getFullYear()
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1); // Az aktuális hónap első napja
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
    const existingPayment = await this.db.payments.findFirst({
      where: {
        member_id: id,
        paid_at: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    });
    if (existingPayment) {
      throw new ConflictException('A felhasználónak már van fizetése az aktuális hónapban');
    }
      const newPayment = this.db.payments.create({
        data: {
          paid_at: new Date(),
          member_id: id,
          amount: 5000,

        }
      }); return newPayment
    

  }

  async findAll() {
   const member= await this.db.members.findMany({
    select:{
      id:true,
      name:true,
      gender:true,
      birth_date:true,
      created_at:true
    }
   })
   const formatmember=member.map((m)=>({
    "id":m.id,
    "name":m.name,
    "gender":m.gender,
    "birth_date":m.birth_date.toISOString().split('T')[0],
    "createdAt":m.created_at
   }))
   return {data:formatmember};
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
