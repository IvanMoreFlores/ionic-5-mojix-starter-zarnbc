import { Component, Input, OnInit } from '@angular/core';
import { SongModel } from './song.model';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  artistName: string;
  artworkUrl100: string;
  longDescription: string;
  trackName: string;
  trackPrice: number;
  @Input() currentSong: SongModel;

  constructor(public modalController: ModalController, navParams: NavParams) {
    this.artistName = navParams.get('artistName');
    this.artworkUrl100 = navParams.get('artworkUrl100');
    this.longDescription = navParams.get('longDescription');
    this.trackName = navParams.get('trackName');
    this.trackPrice = navParams.get('trackPrice');
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  ngOnInit(): void {}
}
