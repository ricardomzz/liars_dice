//Game Class
function Game(number_of_players){
  this.players=[];
  this.bid={quantity:null,face:null,player:null};
  this.start=function(){
    for (i=0;i<number_of_players;i++){
      this.players.push(new Player(this,i+1));
    }
    this.players.forEach(function(player){
      player.roll();
    });
  };
}

//Player Class
function Player(game,id){
  this.id=id;
  this.game=game;
  this.number_of_dice=3;
  this.dice=[];
  this.roll = function (){
    this.dice=[];
    for (i=0; i<this.number_of_dice; i++){
      this.dice.push(Math.floor(Math.random() * 6) + 1);
    }
  };

  this.raise_bid=function(quantity,face){
    this.game.bid={quantity:quantity,face:face,player:this};
  };
  this.challenge_bid=function(){
    dice_with_correct_face=0;
    this.game.players.forEach(function(player){
      player.dice.forEach(function(die){
        if (die==game.bid.face) {dice_with_correct_face+=1;}
      });
    });
    if (dice_with_correct_face >= game.bid.quantity){
      this.game.bid.player.lose_die();
    } else{
      this.lose_die();
    }

  };
  this.lose_die = function () {
    this.number_of_dice=this.number_of_dice-1;
  };
}

game=new Game(3);
game.start();
