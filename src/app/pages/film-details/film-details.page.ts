import { FavoriteService } from './../../services/favorite.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss'],
})
export class FilmDetailsPage implements OnInit {

  filmId = null;
  film: any;
  isFavorite = false;
 
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute,private http: HttpClient
    ,private emailComposer: EmailComposer, private favoriteService: FavoriteService) { }
 
  ngOnInit() {
    this.filmId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.http.get(`https://swapi.co/api/films/${id}`).subscribe(res => {
    //   this.film = res;
    // });
    this.api.getFilm(this.filmId ).subscribe(res => {
      this.film = res;
    });
    console.log('isFavorite Func call'); 
    this.favoriteService.isFavorite(this.filmId).then(isFav => {
      this.isFavorite = isFav;
    });
  }
 
  favoriteFilm() {
    this.favoriteService.favoriteFilm(this.filmId).then(() => {
      this.isFavorite = true;
    });
  }
 
  unfavoriteFilm() {
    this.favoriteService.unfavoriteFilm(this.filmId).then(() => {
      this.isFavorite = false;
    });
  }

  shareFilm() {
    let email = {
      to: 'saimon@devdactic.com',
      subject: 'I love this one: ' + this.film.title,
      body: 'Can you remember the opening?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }

}
