import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { NavbarComponent } from './../../navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { FindModelService } from '../../services/find-model.service';
import { Color, ModelInformation } from '../../models/tesla';
import { TeslaService } from '../../services/tesla.service';

export interface Step1Form {
  selectedModel: FormControl<ModelInformation | null>,
  currentModel: FormControl<string>,
  selectedColor: FormControl<Color | null>,
  currentColor: FormControl<string>
}

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
  public isStep1Valid: boolean | null = false;
  public isStep2Valid: boolean | null = false;

  public teslaModelInformation: ModelInformation[] | null = null;
  public selectedModel: ModelInformation | null = null;
  public imagePath: string | null = null;

  step1Form: FormGroup = this.formBuilder.group<Step1Form>({
    selectedModel: new FormControl<ModelInformation | null>( null),
    currentModel: new FormControl<string>('', { nonNullable: true }),
    selectedColor: new FormControl<Color | null>( null),
    currentColor: new FormControl<string>('', { nonNullable: true })
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private teslaService: TeslaService,
    private findModel: FindModelService
  ){}
  
  ngOnInit(): void {
    this.teslaService.getModels()
      .pipe(
        map((payload: ModelInformation[]) => {
          this.teslaModelInformation = payload;
        }),
      ).subscribe();
    this.step1Form.patchValue(this.userService?.selectedModelColor);
    this.isStep1Valid =  this.userService.isStep1Valid;
    this.isStep2Valid =  this.userService.isStep2Valid;

    if(this.userService?.selectedModelColor?.selectedModel && this.userService?.selectedModelColor?.currentColor){
      this.selectedModel = this.userService?.selectedModelColor.selectedModel;
      this.imagePath = this.userService.buildImagePath(this.selectedModel.code, this.userService?.selectedModelColor.currentColor);
    }
  } 
  
  onModelChange(event: Event): void {
    if (!event) {
      return;
    }
    this.resetConfig();
    const selectedModelCode: string = (event.target as HTMLInputElement).value;
    const selectedModel: ModelInformation | undefined = this.findModel.findCurrentElement<ModelInformation>(selectedModelCode, this.teslaModelInformation);
    
    if (!selectedModel) {
      this.selectedModel = null;
      return;
    }

    const firstColor: Color = selectedModel.colors[0];
    this.selectedModel = selectedModel;
    this.userService.selectedModelColor = {
      selectedModel:selectedModel,
      currentModel: selectedModelCode,
      selectedColor: firstColor,
      currentColor: firstColor.code
    };
    this.userService.isStep1Valid = this.isStep1Valid = true;
    this.step1Form.patchValue(this.userService?.selectedModelColor);
    this.imagePath = this.userService.buildImagePath(selectedModel.code, firstColor.code);
  }

  onColorChange(event: Event): void {
    if (!event) return;
    const selectedColor: string = (event.target as HTMLInputElement).value;
    const color: Color | undefined = this.findModel.findCurrentColor<Color>(selectedColor, this.selectedModel?.colors);

    if (!color) {
      return;
    }
    this.userService.selectedModelColor.selectedColor = color;
    this.userService.selectedModelColor.currentColor = selectedColor;
    this.userService.isStep1Valid = this.isStep1Valid = true;
     
    this.step1Form.patchValue({
      selectedColor: color,
      currentColor: color.code
    })
    const modelCode: string = this.selectedModel?.code ? this.selectedModel.code : '';
    this.imagePath = this.userService.buildImagePath(modelCode, color.code);
  }

  resetConfig(): void {
    this.userService.selectedConfig = {
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
  }
}
