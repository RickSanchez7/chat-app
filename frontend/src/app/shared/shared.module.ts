import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from './alert/alert.component';

const materialModules = [MatIconModule, MatButtonModule];

@NgModule({
  declarations: [InputComponent, AlertComponent],
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  exports: [InputComponent, ...materialModules, AlertComponent],
})
export class SharedModule {}
