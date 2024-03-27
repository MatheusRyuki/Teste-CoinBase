import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly uploadDirectory = 'uploads';

  constructor() {
    if (!fs.existsSync(this.uploadDirectory)) {
      fs.mkdirSync(this.uploadDirectory, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const filePath = path.join(this.uploadDirectory, file.originalname);

      fs.writeFileSync(filePath, file.buffer);

      return filePath;
    } catch (error) {
      throw new HttpException(
        'Erro ao salvar o arquivo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
