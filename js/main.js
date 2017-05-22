//Player Class and Prototype Methods
function Player(){
  this.dice=[];
  this.number_of_dice=3;

}

Player.prototype.roll = function (){
  for (i=0; i<this.number_of_dice; i++){
    this.dice.push(Math.floor(Math.random() * 6) + 1);
  }
  return this.dice;
};

Player.prototype.lose_die = function (){
  this.number_of_dice = this.number_of_dice-1;
};

//Game Class

function Game(){
  this.players=[];
  this.start = function (){
    for (i=0; i<3; i++){
      this.players.push(new Player());
    }
    game.players.forEach(function(player){
      player.roll();
    });

  };


}


//Initialize
game = new Game();
game.start();
$("#dice").html(game.players[0].dice);
