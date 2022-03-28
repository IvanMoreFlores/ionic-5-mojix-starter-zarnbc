import {
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
// Services
import { ApiService } from '../../api/api.service';
import { SongResponse } from '../../song/song.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnChanges, AfterViewInit {
  products: Array<any>;
  items: Array<any>;
  category: boolean;
  artist = 'Shakira';
  media = 'musicVideo'; // Or movie
  dataColor = [
    { upperCase: 'G', transparency: '50%', color: '' },
    { upperCase: 'E', transparency: '50%', color: '' },
    { upperCase: 'I', transparency: '50%', color: '' },
    { upperCase: 'O', transparency: '50%', color: '' },
    { upperCase: 'U', transparency: '50%', color: '' },
  ];

  constructor(public api: ApiService) {}

  ngOnInit() {
    this.api.searchSongs(this.artist, this.media).subscribe((result: any) => {
      this.products = result.results;
      this.items = this.products;
    });
  }

  shearhSongs() {
    this.api.searchSongs(this.artist, this.media).subscribe(
      (data: SongResponse) => {
        this.products = data.results;
        this.items = this.products;
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
    var cadena = name.charAt(0);
    this.dataColor.filter((item) => {
      if (item.upperCase === cadena) {
        console.log(item.upperCase);
        console.log(cadena);
        console.log(item);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit() {}
}
