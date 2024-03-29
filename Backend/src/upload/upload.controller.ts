import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

// Define o controller com a rota base 'upload'
@Controller('upload')
export class UploadController {
  // Injeta o UploadService
  constructor(private readonly uploadService: UploadService) {}

  // Endpoint POST para upload de arquivo
  @Post()
  @UseInterceptors(FileInterceptor('file')) // Usa o FileInterceptor para processar o arquivo 'file' enviado no corpo da requisição
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Verifica se o arquivo foi recebido
    if (!file) {
      throw new BadRequestException('Arquivo é preciso!'); // Lança exceção se nenhum arquivo for enviado
    }

    // Chama o serviço para processar o arquivo e calcular as métricas
    const metrics = await this.uploadService.handleUploadAndCalculateMetrics(
      file.buffer,
    );

    // Retorna uma resposta com as métricas calculadas
    return { message: 'Arquivo processado com sucesso', data: metrics };
  }
}
