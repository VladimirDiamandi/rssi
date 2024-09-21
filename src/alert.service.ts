import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { ConfigService } from 'src/config/config.service';
import { IAlertPayload } from './dto/signal.dto';

@Injectable()
export class AlertService {
  private ALERT_URL: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.ALERT_URL = this.configService.get('ALERT_URL');
  }

  async pushAlert(payload: IAlertPayload) {
    await fetch(this.ALERT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    })
  }
}
