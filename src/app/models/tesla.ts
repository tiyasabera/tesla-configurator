export interface storeModelColorInfo {
  selectedModel: ModelInformation,
  currentModel: string,
  selectedColor?: Color,
  currentColor?: string
}
export interface ModelInformation {
  code: ModelCodeAvailable;
  description: ModelDescriptionAvailable;
  colors: Color[];
}

export interface ConfigInformation {
  configs: Config[];
  towHitch: boolean;
  yoke: boolean;
}

export interface storeConfigInformation {
  currentConfig: string;
  configs: Config;
  towHitch: boolean;
  yoke: boolean;
}

export interface Color {
  code: ColorAvailable;
  description: string;
  price: number;
}

export interface Config {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}

export interface Step1FormInterface {
  selectedModel: ModelInformation;
  currentModel: ModelDescriptionAvailable;
  selectedColor: Color;
  currentColor: ColorAvailable;
}

export interface Step2FormInterface {
  selectedConfig: Config[];
  currentConfig: string;
  towHitch?: boolean;
  yoke?: boolean;
}

export type ModelCodeAvailable = 'S' | 'X' | 'C' | '3' | 'Y';
export type ModelDescriptionAvailable = 'Model S' | 'Model X' | 'Cybertruck' | 'Model 3' | 'Model Y';
export type ColorAvailable = 'white' | 'black'| 'blue' | 'grey'| 'red';
