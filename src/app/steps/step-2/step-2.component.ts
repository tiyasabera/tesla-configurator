import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map} from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { Config, ConfigInformation } from '../../models/tesla';
import { TeslaService } from '../../services/tesla.service';
import { FindModelService } from '../../services/find-model.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { Router } from '@angular/router';

export interface Step2Form {
  selectedConfig: FormControl<Config | null>,
  currentConfig: FormControl<string>,
  towHitch: FormControl<boolean>,
  yoke: FormControl<boolean>,
}

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    CurrencyFormatPipe
  ],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit {

  public isStep1Valid: boolean | null = true; 
  public isStep2Valid: boolean | null = false; 
  public imagePath: string | null = null;
  selectedConfig: Config | null = null;
  public configInformation: ConfigInformation | null = null;

  step2Form: FormGroup = this.formBuilder.group<Step2Form>({
    selectedConfig: new FormControl<Config | null>( null),
    currentConfig: new FormControl<string>('', { nonNullable: true }),
    towHitch: new FormControl<boolean>(false, { nonNullable: true }),
    yoke: new FormControl<boolean>(false, { nonNullable: true }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private teslaService: TeslaService,
    private findModel: FindModelService
  ){}

  ngOnInit(): void {
    if(!this.userService?.selectedModelColor?.currentModel){
      this.router.navigate(['/']);
    }
   const selectedModelCode = this.userService?.selectedModelColor?.selectedModel?.code;
   const selectedColorCode = this.userService?.selectedModelColor?.selectedColor?.code as string;
   this.isStep1Valid =  this.userService.isStep1Valid;
   this.isStep2Valid =  this.userService.isStep2Valid;

    this.teslaService.getOptionByModel(selectedModelCode)
      .pipe(
        map((response: ConfigInformation) => {
          if(response){
            this.configInformation = response;
            if(!this.userService.selectedConfig.currentConfig) {
              this.userService.selectedConfig.towHitch = response.towHitch;
              this.userService.selectedConfig.yoke = response.yoke;
            }
          }
        })
      ).subscribe();
   
    this.selectedConfig = this.userService?.selectedConfig?.configs;
    this.step2Form.patchValue(this.userService?.selectedConfig);
    this.imagePath = this.userService.buildImagePath(selectedModelCode, selectedColorCode);
  }

  onModelChange(event: Event): void {
    if (!event) return;

    const selectConfig: string = (event.target as HTMLInputElement).value;
    const config: Config | undefined = this.findModel.findCurrentElement<Config>(selectConfig, this.configInformation?.configs);

    if (!config) {
      this.resetConfig();
      return;
    }
    this.userService.selectedConfig.currentConfig = selectConfig;
    this.userService.selectedConfig.configs = config;
    this.userService.isStep2Valid = this.isStep2Valid = true;
    this.selectedConfig = config;
    this.step2Form.get('selectedConfig')?.patchValue(this.selectedConfig);
  }

  towCheck(event: Event): void {
    this.userService.selectedConfig.towHitch = (event.target as HTMLInputElement).checked;
  }
  yokeCheck(event: Event): void {
    this.userService.selectedConfig.yoke = (event.target as HTMLInputElement).checked;
  }
  
  private resetConfig(): void {
    this.step2Form.get('selectedConfig')?.patchValue('');
    this.selectedConfig = null;
  }
}
