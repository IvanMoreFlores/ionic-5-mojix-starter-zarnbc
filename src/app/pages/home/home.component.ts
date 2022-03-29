import {
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
// Services
import { ApiService } from '../../api/api.service';
import { SongResponse } from '../../song/song.model';
import { ModalController } from '@ionic/angular';
import { SongComponent } from '../../song/song.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnChanges, AfterViewInit {
  products: Array<any>;
  items: Array<any>;
  category: boolean;
  artist = 'Mana';
  media = 'movie'; // Or movie
  dataColor = [
    { upperCase: 'A', class: 'another-yellow' },
    { upperCase: 'E', class: 'another-red' },
    { upperCase: 'I', class: 'another-blue' },
    { upperCase: 'O', class: 'another-black' },
    { upperCase: 'U', class: 'another-green' },
  ];

  constructor(
    public api: ApiService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.api.searchSongs(this.artist, this.media).subscribe((result: any) => {
      this.products = result.results;
      this.items = this.products;
      console.log(result);
    });
  }

  shearhSongs() {
    this.api.searchSongs(this.artist, this.media).subscribe(
      (data: SongResponse) => {
        this.products = data.results;
        this.items = this.products;
        console.log(data);
      },
      (error) => {}
    );
  }

  searchToggle() {
    this.media = this.category ? 'music' : 'musicVideo';
    this.shearhSongs();
  }

  handleInput(event) {
    this.initializeItems();
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return item.trackName.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  initializeItems() {
    this.items = this.products;
  }

  returnName(name) {
    let clase = '';
    var cadena = name.charAt(0);
    this.dataColor.filter((item) => {
      if (item.upperCase === cadena) {
        clase = item.class;
      }
    });
    return clase;
  }

  loadData(event) {
    setTimeout(() => {
      this.shearhSongs();
      event.target.complete();
      if (this.items.length == 30) {
        event.target.disabled = true;
      }
    }, 500);
  }

  async presentModal(item) {
    const modal = await this.modalController.create({
      component: SongComponent,
      componentProps: {
        artistName: item?.artistName,
        artworkUrl100: item?.artworkUrl100,
        longDescription: item?.longDescription,
        trackName: item?.trackName,
        trackPrice: item?.trackPrice,
      },
    });
    return await modal.present();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit() {}
}
