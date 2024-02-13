import { Injectable } from '@angular/core';
import { Color, Config, ConfigInformation, ModelInformation, storeConfigInformation, storeModelColorInfo } from '../models/tesla';
@Injectable({
    providedIn: 'root'
  })

  export class UserService {
    public isStep1Valid: boolean | null = false;
    public isStep2Valid: boolean | null = false;

    public selectedModelColor : storeModelColorInfo = {
        selectedModel: {
            code: '3',
            description: 'Cybertruck',
            colors: []
        },
        currentModel: '',
        selectedColor: {
            code: 'white',
            description: '',
            price: 0
        },
        currentColor: ''
    };

    public selectedConfig : storeConfigInformation = {
        currentConfig : '',
        configs: {
            id: 0,
            description: '',
            range: 0,
            speed: 0,
            price: 0
        },
        towHitch: false,
        yoke: false
    };


    buildImagePath(modelCode: string, currentColor: string): string {
        return `assets/images/${modelCode}/${currentColor}.jpg`;
    }
  }