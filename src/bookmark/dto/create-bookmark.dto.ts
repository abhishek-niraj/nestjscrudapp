import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBookMarkDto{
    @IsString()
    @IsOptional()
    title:string

    @IsString()
    @IsOptional()
    description:string
    
    @IsString()
    @IsNotEmpty()
    link:string
}
