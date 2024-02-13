import { Injectable } from '@angular/core';
import { Color, Config, ModelInformation } from '../models/tesla';

@Injectable({
  providedIn: 'root'
})
export class FindModelService {
  findCurrentElement<T extends ModelInformation | Config>(currentValue: string, array?: T[] | null): T | undefined {
    return array?.find((model: T) => model.description === currentValue);
  }

  findCurrentColor<T extends Color>(currentCode: string, array?: T[] | null): T | undefined {
    return array?.find((color: Color) => color.code === currentCode);
  }
}
