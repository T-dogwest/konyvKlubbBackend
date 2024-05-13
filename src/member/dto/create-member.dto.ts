import { members_gender } from "@prisma/client"
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator"

export class CreateMemberDto {
    @IsNotEmpty({message:'A name mező nem lehet üres'})
    name:string
    @IsEnum(members_gender, { message: 'A nem értéke csak "M" vagy "F" lehet!' })
    @IsOptional()
    gender:members_gender
    @IsNotEmpty({message:'A birthdate mező nem lehet üres'})
    birth_date:Date
}
