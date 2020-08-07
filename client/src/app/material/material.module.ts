import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class MaterialModule {}
