import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import {ComponentsModule} from '../components/components.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PagesModule { }
