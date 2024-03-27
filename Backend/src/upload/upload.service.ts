import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

interface Subscriber {
  id: string;
  monthlyFee: number;
  active: boolean;
  startDate: string;
  endDate?: string;
}

@Injectable()
export class UploadService {
  constructor() {}

  readXlsxFile(buffer: Buffer): Subscriber[] {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData.map((row: any) => {
      return {
        id: row['ID assinante'],
        monthlyFee: parseFloat(row['valor']),
        active: row['status'] === 'Ativa',
        startDate: row['data início'],
        endDate: row['data cancelamento']
          ? row['data cancelamento']
          : undefined,
      };
    });
  }

  calculateMRR(subscribers: Subscriber[]): number {
    return subscribers
      .filter((subscriber) => subscriber.active)
      .reduce((acc, subscriber) => acc + subscriber.monthlyFee, 0);
  }

  calculateChurnRate(subscribers: Subscriber[]): number {
    const totalSubscribers = subscribers.length;
    const totalCancelled = subscribers.filter(
      (subscriber) => !subscriber.active,
    ).length;

    if (totalSubscribers === 0) return 0;

    return (totalCancelled / totalSubscribers) * 100;
  }

  async handleUploadAndCalculateMetrics(
    fileBuffer: Buffer,
  ): Promise<{ mrr: number; churnRate: number }> {
    const subscribers = this.readXlsxFile(fileBuffer);

    const mrr = this.calculateMRR(subscribers);
    const churnRate = this.calculateChurnRate(subscribers);

    return { mrr, churnRate };
  }
}
