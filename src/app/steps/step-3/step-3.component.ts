import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import {  ModelCodeAvailable, storeConfigInformation, storeModelColorInfo } from '../../models/tesla';


@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [
    NavbarComponent,
    CurrencyFormatPipe
  ],
  providers: [
  ],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component implements OnInit {
  public isStep1Valid: boolean = true;
  public isStep2Valid: boolean = true;
  public imagePath: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  public step1FormState: storeModelColorInfo | null = null;
  public step2FormState: storeConfigInformation | null = null;

  readonly OPTION_UPSELL_PRICE: number = 1000;
  totalPrice: number = 0;

  ngOnInit(): void {
    if(!this.userService?.selectedModelColor?.currentModel){
      this.router.navigate(['/']);
    }
    const selectedModelCode = this.userService?.selectedModelColor?.selectedModel?.code as ModelCodeAvailable;
    const selectedColor = this.userService?.selectedModelColor?.selectedColor?.code as string;
    this.step1FormState =  this.userService?.selectedModelColor;
    this.step2FormState = this.userService?.selectedConfig;
    this.totalPrice = this.calculateTotal();
    this.imagePath = this.userService.buildImagePath(selectedModelCode, selectedColor);
  }

  
  private calculateTotal(): number {
    // config and color selected
    const configPrice: number = this.userService?.selectedConfig?.configs?.price || 0;
    const colorPrice: number = this.userService?.selectedModelColor?.selectedColor?.price || 0;

    // options selected
    const yokePrice: number = this.userService?.selectedConfig?.yoke ? this.OPTION_UPSELL_PRICE : 0;
    const towHitchPrice: number = this.userService?.selectedConfig?.towHitch ? this.OPTION_UPSELL_PRICE : 0;

    return configPrice + colorPrice + yokePrice + towHitchPrice;
  }

}
