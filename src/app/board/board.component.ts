import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  imports:[SquareComponent,CommonModule]
})
export class BoardComponent implements OnInit {

  squares: any[];
  xIsNext: boolean;
  winner: string;

 constructor() { 
  
 }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = '';
  }

  get player(){
    return this.xIsNext ? 'X' : 'O'; //if xIsNext true return X else return O
  }

  MakeMove(squareIndex: number){ //event handler for when a player make a move 
    if (!this.squares[squareIndex]){ //check the square index in the array that the player clicked on, if square already clicked skip
      this.squares.splice(squareIndex,1,this.player); //replace the value of the square to the current player val
      this.xIsNext = !this.xIsNext;//replace the current player to the opposite player
      this.calculateWinner();
    }
  }

  calculateWinner() {
    const lines = [ //metrix for all the winning options
      [0, 1, 2], //horizontal win
      [3, 4, 5], //horizontal win
      [6, 7, 8], //horizontal win
      [0, 3, 6], //vertical win
      [1, 4, 7], //vertical win
      [2, 5, 8], //vertical win
      [0, 4, 8], //diagonal win
      [2, 4, 6], //diagonal win
    ];
  
    for (const line of lines) {
      const [a, b, c] = line;//for each winning option
      if (  //check if the value of each square in the line equals the same player
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) { //if true winner equals the value of those squares in the line
        this.winner = this.squares[a];
        break;
      }
    }
  }
}
