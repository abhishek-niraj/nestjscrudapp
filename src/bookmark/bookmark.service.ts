import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookMarkDto, EditBookmarkDto } from './dto';
import { ForbiddenException } from 'src/error/errorhandeler';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) { }

    getBookmark(userId: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userId
            }
        })
    }

   async  getBookMarById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
        where:{
            userId:userId,
            id:bookmarkId
        }
    });

    return bookmark;
    }

    async  createBookmark(userId: number, dto: CreateBookMarkDto) {
        const bookmark = await this.prisma.bookmark.create({
            data:{
                userId,
                ...dto
            }
        });
        return bookmark;
    }


    async editBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        // get the bookmark by id 

        const bookmark = await this.prisma.bookmark.findUnique({
            where:{
                id:bookmarkId
            }
        });

        if(!bookmark  || bookmark.userId != userId) 
         throw new ForbiddenException("Access to resource denied")

         return this.prisma.bookmark.update({
        where:{
            id:bookmarkId
        },
        data:{
            ...dto
        }
         })
        // check if user owns the bookmark 


    }

   async  deleteBookmark(userId: number, bookmarkId: number) {
        // find bookmark

        const bookmark = await this.prisma.bookmark.findUnique({
            where:{
                id:bookmarkId
            }
        });

        if(!bookmark  || bookmark.userId != userId)
        throw new ForbiddenException("Access to resource denied")
        return this.prisma.bookmark.delete({
            where:{
                id:bookmarkId,
            }
        })
    }
}
