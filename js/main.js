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


var player_1 = new Player();
$("#dice").html(player_1.roll());
