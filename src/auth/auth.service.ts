import { Injectable,HttpException,HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException } from "src/error/errorhandeler";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService{
   constructor(private prisma:PrismaService, private jwt:JwtService,private config:ConfigService){
   }
  async signup(dto:AuthDto){
   try{
      const user = await this.prisma.user.create({
         data:{
            email:dto.email,
            hash:dto.password,
         },
         select:{
            id:true,
            email:true,
            createdAt:true
         }
      })
      // return the saved user
      return this.signToken(user.id,user.email);
   }catch(error){
      if(error.code === "P2002"){
         throw new ForbiddenException("Credential Taken")
      }else{
         throw error;
      }
      
     }
   }
async signin(dto:AuthDto){
   // find the user by email
   const user  = await this.prisma.user.findMany({
      where:{
         email:dto.email,
         hash:dto.password
      }
   })
   //if user does not exist throw error 
if(!user.length) throw new ForbiddenException("Credential incorrect")
return this.signToken(user[0].id,user[0].email);
}
 async signToken( userId:number,email:string):Promise<{access_token:string}>{
   const payload = {
      sub:userId,
      email
   }
   const secret = this.config.get("JWT_SECRET");
   const token =  await this.jwt.signAsync(payload,{
      expiresIn:'15m',
      secret:secret
   });
   return{
      access_token:token,
   };
}
 }
