import { UserService } from './user.service';
import { Controller, Get, Param, Patch, Post, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserDetails } from './dto/user-details.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserInfoDTO } from './dto/update-user-info.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Patch()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('thumbnailFile'))
  async updateUserInfo(@UploadedFile() thumbnailFile: Express.Multer.File, @Body() updateUserInfo: UpdateUserInfoDTO, @Request() req){
    if(thumbnailFile){
      const response = await this.cloudinaryService.uploadFile(thumbnailFile);
      if(!response){
        throw new Error("Cập nhật hình ảnh thất bại!")
      }
      updateUserInfo.thumbnailURL = response.url;
      updateUserInfo.thumbnail_PublicID = response.public_id;
    }
    console.log(updateUserInfo)
    return await this.userService.update(req.user._id, updateUserInfo)
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
}
