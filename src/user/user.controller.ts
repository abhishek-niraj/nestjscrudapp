import { Controller, Get, UseGuards ,Req, Patch, Body, Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorater';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private userService:UserService){}
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user:User){
        
        return user;
    }
    @UseGuards(JwtGuard)
    @Patch()
    editUser(@GetUser("id") userId: number, @Body() dto: EditUserDto) {
        // const parsedUserId = parseInt(userId); // Parse userId to number

        return this.userService.editUser(userId,dto)
    }
}
