import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [UploadController],
  providers: [CloudinaryService]
})
export class UploadModule {}