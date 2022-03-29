import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongComponent } from './song.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: SongComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  declarations: [SongComponent],
  exports: [SongComponent],
})
export class SongModule {}
