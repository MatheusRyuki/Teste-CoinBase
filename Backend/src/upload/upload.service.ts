import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

interface Subscriber {
  'quantidade cobranças': number;
  'cobrada a cada X dias': number;
  'data início': number;
  status: string;
  'data status': number;
  valor: number;
  'próximo ciclo': number;
  'ID assinante': string;
}

@Injectable()
export class UploadService {
  constructor() {}

  readXlsxFile(buffer: Buffer): any[] {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: Subscriber[] = XLSX.utils.sheet_to_json(worksheet);

    const groupedByMonth: Record<string, Subscriber[]> = jsonData.reduce(
      (acc, subscriber) => {
        const startDate = this.parseExcelDate(subscriber['data início']);
        const monthYear = `${startDate.getMonth() + 1}-${startDate.getFullYear()}`;

        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(subscriber);

        return acc;
      },
      {},
    );

    const metrics = Object.entries(groupedByMonth).map(
      ([monthYear, subscribers]) => {
        return {
          monthYear,
          mrr: this.calculateMRR(subscribers),
          churnRate: this.calculateChurnRate(subscribers, monthYear),
        };
      },
    );

    return metrics;
  }

  parseExcelDate(serial: number): Date {
    const excelBaseDate = new Date(Date.UTC(1899, 11, 30));
    const days = Math.floor(serial);
    const milliseconds = (serial - days) * 86400000;
    return new Date(excelBaseDate.getTime() + days * 86400000 + milliseconds);
  }

  calculateMRR(subscribers: Subscriber[]): number {
    return subscribers
      .filter((subscriber) => subscriber.status === 'Ativa')
      .reduce((acc, subscriber) => acc + subscriber.valor, 0);
  }

  calculateChurnRate(subscribers: Subscriber[], monthYear: string): number {
    const month = parseInt(monthYear.split('-')[0]) - 1;
    const year = parseInt(monthYear.split('-')[1]);

    const activeStartOfMonth = subscribers.filter((subscriber) => {
      const startDate = this.parseExcelDate(subscriber['data início']);
      return (
        startDate.getMonth() === month &&
        startDate.getFullYear() === year &&
        subscriber.status === 'Ativa'
      );
    }).length;

    const cancelledDuringMonth = subscribers.filter((subscriber) => {
      const endDate = subscriber['data status']
        ? this.parseExcelDate(subscriber['data status'])
        : null;
      return (
        endDate &&
        endDate.getMonth() === month &&
        endDate.getFullYear() === year &&
        subscriber.status !== 'Ativa'
      );
    }).length;

    if (activeStartOfMonth === 0) return 0;

    return (cancelledDuringMonth / activeStartOfMonth) * 100;
  }

  async handleUploadAndCalculateMetrics(fileBuffer: Buffer) {
    return this.readXlsxFile(fileBuffer);
  }
}
