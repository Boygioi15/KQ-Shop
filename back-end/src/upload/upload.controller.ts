import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
  import { memoryStorage } from 'multer';
  
  @Controller('api/upload/product')
  export class UploadController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('thumb')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: memoryStorage(),
        fileFilter: (req, file, callback) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return callback(
              new HttpException(
                'Only image files are allowed!',
                HttpStatus.BAD_REQUEST,
              ),
              false,
            );
          }
          callback(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      }),
    )
    async uploadThumb(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new HttpException(
          'File is not provided or invalid file format.',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      try {
        const result = await this.cloudinaryService.uploadFile(file);
        return {
          success: true,
          message: 'Image uploaded successfully.',
          data: {
            imageUrl: result.secure_url, 
            publicId: result.public_id,  
          },
        };
      } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new HttpException(
          'Failed to upload image to Cloudinary.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }