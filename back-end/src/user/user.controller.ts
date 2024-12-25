import { UserService } from './user.service';
import { Controller, Get, Param, Patch, Post, Body, UseGuards, Request, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { UserDetails } from './dto/user-details.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserInfoDTO } from './dto/update-user-info.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { AddNewAddressDTO } from './dto/add-new-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Patch('/info')
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
    return await this.userService.updateInfo(req.user._id, updateUserInfo)
  }
  @Patch('/password')
  @UseGuards(JwtGuard)
  async updateUserPassword(@Body() updateUserPassword: UpdateUserPasswordDTO, @Request() req){
    console.log(updateUserPassword)
    return await this.userService.updatePassword(req.user._id, updateUserPassword);
  }




  @Post('address')
  @UseGuards(JwtGuard)
  async addNewAddress(@Body() addNewAddress: AddNewAddressDTO, @Request() req){
    return await this.userService.addNewAddressOfUser(req.user._id, addNewAddress);
  }
  @Get('address')
  @UseGuards(JwtGuard)
  async getAllAddressOfUser(@Request() req){
    return await this.userService.getAllAddressOfUser(req.user._id);
  }
  @Get('address/:addressID')
  @UseGuards(JwtGuard)
  async getAnAddressOfUser(@Param('addressID') addressID: string, @Request() req){
    return await this.userService.getAnAddressOfUser(req.user._id, addressID);
  }
  @Patch('/address/:addressID')
  @UseGuards(JwtGuard)
  async updateAddressOfUser(@Param('addressID') addressID: String, @Request() req, @Body() updateAddress: UpdateAddressDTO){
    return await this.userService.updateAddressOfUser(req.user._id, addressID, updateAddress);
  }
  @Post('/address/:addressID/set-default')
  @UseGuards(JwtGuard)
  async setDefaultAddressOfUser(@Param('addressID') addressID: String, @Request() req){
    return await this.userService.setDefaultAddressOfUser(req.user._id, addressID);
  }
  @Delete('/address/:addressID')
  @UseGuards(JwtGuard)
  async deleteUserAddress(@Param('addressID') addressID: String, @Request() req){
    return await this.userService.deleteAddressOfUser(req.user._id, addressID);
  }
}
