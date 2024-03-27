import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async handleFile(file: Express.Multer.File): Promise<void> {
    console.log('Handling file:', file.originalname);
  }
}
