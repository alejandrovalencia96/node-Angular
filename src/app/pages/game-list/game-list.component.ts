import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from 'src/app/models/Game';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  // @HostBinding('class') classes = 'row';

  games: any = [];
  tokenDecode: any = [];

  constructor(private gameService: GamesService,
              private authService: AuthService) { }

  ngOnInit(): void {

   this.getGames();
   this.getAccessToken();

  }

  getGames(){
    this.gameService.getGames().subscribe(
      res => {
        this.games = res;
        console.log(res);
      },
      err => console.error(err)
    );
  }

  deleteGame(id: string){
    this.gameService.deleteGame(id).subscribe(
      res=>{
       console.log(res);
       this.getGames();
      },
      err => console.error(err)
    )
  }

  getAccessToken(){
    const token = localStorage.getItem('token');
    console.log('el token es:', token);
    this.tokenDecode = this.authService.getDecodedAccessToken(token);
    
  }

 

}
