import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';

import { UserDetails } from './dto/user-details.dto';
import { UserRepository } from './user.repository';
import { UserDocument, User } from 'src/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserInfoDTO } from './dto/update-user-info.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';

import * as bcrypt from 'bcryptjs';
import { AddNewAddressDTO } from './dto/add-new-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository ,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  _getUserDetails(user: any): UserDetails {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }
  async getUserDetail(userID: string){
    return await this.userModel.findById(userID).select(`-password`)
  }
  isValidEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
  }
  async updateInfo(id: string, updateUserInfo: UpdateUserInfoDTO){
    const oldUser = await this.userModel.findById(id);
    const updatedUser =  await this.userModel.findByIdAndUpdate(id,updateUserInfo,{new: true})
    if(updateUserInfo.thumbnailURL){
      await this.cloudinaryService.destroyFile(oldUser.thumbnail_PublicID);
    }
    return updatedUser;
  }
  async updatePassword(id: string, updateUserPassword: UpdateUserPasswordDTO){
    const oldUser = await this.userModel.findById(id);
    if(!(await this.isPasswordMatch(updateUserPassword.oldPassword,oldUser.password))){
      throw new BadRequestException("Mật khẩu cũ không đúng");
    }
    if(updateUserPassword.newPassword.trim()!==updateUserPassword.confirmNewPassword.trim()){
      throw new BadRequestException("Mật khẩu mới và xác nhận mật khẩu mới không khớp!");
    }
    const newPassword = await bcrypt.hash(updateUserPassword.newPassword,12) 
    const updatedUser =  await this.userModel.findByIdAndUpdate(id,{password: newPassword},{new: true})
    return updatedUser;
  }
  async create(
    name: string,
    identifier: string,
    options?: {
      hashedPassword?: string;
      googleId?: string;
      facebookId?: string;
    },
  ) {
    const userData: Record<string, any> = { name };

    if (
      this.isValidEmail(identifier) &&
      !options?.googleId &&
      !options?.facebookId
    ) {
      userData.email = identifier;
      if (options?.hashedPassword) {
        userData.password = options.hashedPassword;
      } else {
        throw new Error('Password is required for email sign-up');
      }
    } else if (options?.googleId) {
      userData.googleId = options.googleId;
    } else if (options?.facebookId) {
      userData.facebookId = options.facebookId;
    } else {
      userData.phone = identifier;
    }

    // Create the user
    const newUser = await this.userRepository.create(userData);

    return this._getUserDetails(newUser);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) return null;
    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    return user;
  }

  async findByPhone(phoneNumber: string): Promise<UserDocument | null> {
    const user = await this.userRepository.findOne({ phone: phoneNumber });
    return user || null;
  }

  async findByIdentifier(identifier: string): Promise<UserDocument | null> {
    return this.isValidEmail(identifier)
      ? this.findByEmail(identifier)
      : this.findByPhone(identifier);
  }

  async findOrCreate(userData: {
    email: string;
    name: string;
    googleId?: string;
    facebookId?: string;
  }): Promise<UserDocument> {
    let user;

    if (userData.googleId) {
      user = await this.userRepository.findOne({ googleId: userData.googleId });
    } else if (userData.facebookId) {
      user = await this.userRepository.findOne({
        facebookId: userData.facebookId,
      });
    }

    if (!user) {
      user = await this.create(userData.name, userData.email, {
        googleId: userData.googleId,
        facebookId: userData.facebookId,
      });
    }

    return user;
  }
  async checkEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    return !!user;
  }
  async checkPhoneExist(phone: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ phone });
    return !!user;
  }

  async isPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
    



  //////////////////////ADDRESSeS???????????????????
  async addNewAddressOfUser(userID: string, addNewAddressDTO : AddNewAddressDTO){
    const user = await this.userModel.findById(userID);
    addNewAddressDTO._id = new Types.ObjectId();
    if(user.addresses.length===0){
      addNewAddressDTO.default=true;
    }
    else{
      addNewAddressDTO.default=false;
    }
    user.addresses.push(addNewAddressDTO)
    await user.save()
    return user.addresses;
  }
  async getAllAddressOfUser(userID: string){
    const user = await this.userModel.findById(userID);
    return user.addresses;
  }
  async getAnAddressOfUser(userID: string, addressID: string){
    const user = await this.userModel.findById(userID);
    const address = user.addresses.find((element)=>{
      return element._id.toString()===addressID})
    if(!address){
      throw new BadRequestException('Không tìm thấy địa chỉ. Vui lòng thử lại')
    }
    return address;
  }
  async updateAddressOfUser(userID: string, addressID: String, updateAddress: UpdateAddressDTO){
    const user = await this.userModel.findById(userID);
    const address = user.addresses.find((element)=>element._id.toString()===addressID);
    if(!address){
      throw new BadRequestException('Không tìm thấy địa chỉ. Vui lòng thử lại')
    }
    Object.assign(address,updateAddress);
    await user.save();
    return address;
  }
  async setDefaultAddressOfUser(userID: string, addressID: String){
    const user = await this.userModel.findById(userID);
    user.addresses.forEach((address) => {
      address.default = false;
    });
    const targetAddress = user.addresses.find((address) => address._id.toString() === addressID);
    if(!targetAddress){
      throw new BadRequestException('Không tìm thấy địa chỉ. Vui lòng thử lại')
    }
    targetAddress.default=true;
    await user.save();
    return targetAddress;
  }
  async deleteAddressOfUser(userID: string, addressID: String){
    const user = await this.userModel.findById(userID);
    const targetAddress = user.addresses.find((address) => address._id.toString() === addressID);
    if(!targetAddress){
      throw new BadRequestException('Không tìm thấy địa chỉ. Vui lòng thử lại')
    }

    if(targetAddress.default){
      throw new BadRequestException('Không thể xóa địa chỉ mặc định')
    } 
    const address = user.addresses.filter((element)=>element._id.toString()!==addressID);
    user.addresses = address
    await user.save();
    return address;
  }
}
