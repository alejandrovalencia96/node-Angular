import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from '../../models/Game';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  // @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false; 

  constructor(private gameService: GamesService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

   const params = this.activatedRouter.snapshot.params;
   if(params.id){
     this.gameService.getGame(params.id).subscribe(
       res => {
          // console.log(res);
          this.game = res;
          this.edit = true;
       },
       err => console.error(err)
     )
   }


  }


  saveNewGame(game: NgForm){
    delete this.game.created_at;
    delete this.game.id;

    this.gameService.saveGame(game.value)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.log(err)
      )
      
  }
 

  updateGame(game: NgForm){
   delete this.game.created_at;

   this.gameService.updateGame(this.game.id, game.value).subscribe(
     res =>{
        this.router.navigate(['/games']);
     },
     err => console.error(err)
   )
  }

}
