import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorater';
import { CreateBookMarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {

    constructor(private bookMarkService: BookmarkService) { }
    @Get()
    getBookmark(@GetUser("id") userId: number) {
        return this.bookMarkService.getBookmark(userId);
    }

    @Get(":id")
    getBookMarById(@GetUser('id') userId: number, @Param("id", ParseIntPipe) bookmarkId: number) {
        return this.bookMarkService.getBookMarById(userId, bookmarkId);
    }

    @Patch(":id")
    editBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number, @Body() dto: EditBookmarkDto) {
        return this.bookMarkService.editBookmark(userId, bookmarkId, dto);
    }

    @Post()
    createBookmark(@Body() dto: CreateBookMarkDto) {
        return this.bookMarkService.createBookmark(1, dto);
    }

    @Delete(":id")
    deleteBookmark(@GetUser("id") userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookMarkService.deleteBookmark(userId, bookmarkId);
    }
}
