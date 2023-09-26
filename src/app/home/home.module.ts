import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {CommonModule} from "@angular/common";


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CommonModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
