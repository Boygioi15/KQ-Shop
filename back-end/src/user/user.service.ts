import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { UserDetails } from './dto/user-details.dto';
import { UserRepository } from './user.repository';
import { UserDocument, User } from 'src/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserInfoDTO } from './dto/update-user-info.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

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
  async update(id: string, updateUserInfo: UpdateUserInfoDTO){
    const oldUser = await this.userModel.findById(id);
    const updatedUser =  await this.userModel.findByIdAndUpdate(id,updateUserInfo,{new: true})
    if(updateUserInfo.thumbnailURL){
      await this.cloudinaryService.destroyFile(oldUser.thumbnail_PublicID);
    }
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
}
