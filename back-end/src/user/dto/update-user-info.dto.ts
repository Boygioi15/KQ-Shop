import { IsNotEmpty } from "class-validator"

export class UpdateUserInfoDTO{
    account?: string;
    @IsNotEmpty()
    name: String;
    email?: string;
    phone?: string;
    gender?: string;
    birdthDate?: Date
    thumbnailURL?: string
    thumbnail_PublicID?: string
}