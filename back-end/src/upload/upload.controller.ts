import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import * as fs from 'fs';
  
  @Controller('api/upload/product')
  export class UploadController {
    @Post('thumb')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: (req, file, callback) => {
            const uploadPath = './uploads/product/thumb';
            fs.mkdirSync(uploadPath, { recursive: true });
            callback(null, uploadPath);
          },
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileExtName = extname(file.originalname);
            callback(null, `${uniqueSuffix}${fileExtName}`);
          },
        }),
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
  
      const imageUrl = `http://localhost:8000/uploads/product/thumb/${file.filename}`;
  
      return {
        success: true,
        message: 'Image uploaded successfully.',
        data: {
          imageUrl,
        },
      };
    }
  }