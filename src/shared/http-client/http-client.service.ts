import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpClientService {
  async get<T>(url: string, params?: Record<string, any>, headers?: Record<string, any>): Promise<T> {
    const config: AxiosRequestConfig = { params, headers };
    const response = await axios.get<T>(url, config);
    return response.data;
  }
}