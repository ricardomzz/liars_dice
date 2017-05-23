//Game Class
function Game(number_of_players){
  this.players=[];
  this.bid={quantity:null,face:null,player:null};
  this.turn=null;
  this.next_turn = function (){
    this.turn=this.players[this.players.indexOf(this.turn)+1] ?
    this.players[this.players.indexOf(this.turn)+1]:
    this.players[0];
    console.log('player '+this.turn.id+"'s turn");
  };
  this.render = function (){
    $('#main').html('');
    this.players.forEach(function(player){
      $('#main').append(player.dice);
    });

  };
  this.roll_all=function(){
    this.players.forEach(function(player){
      player.roll();
    });
  };
  this.start=function(){
    for (i=0;i<number_of_players;i++){
      this.players.push(new Player(this,i+1));
    }
    this.new_round();
  };
  this.new_round=function(){
    //remove inactive players
    game.players.forEach(function(player){
      if (player.number_of_dice===0){
        console.log('player '+player.id+' has lost all dice and is out!');
        game.players.splice(game.players.indexOf(player), 1 );
      }
    });
    //check for victory
    if (game.players.length === 1){
      console.log('player '+game.players[0].id+' won!');
      game.turn=null;
    } else {
    this.roll_all();
    this.turn=this.players[0];
    this.bid={quantity:null,face:null,player:null};
    this.render();
  }
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
    console.log('player '+this.id+' raised the bid to: '+quantity+' of '+face);
    this.game.bid={quantity:quantity,face:face,player:this};
    this.game.next_turn();
  };

  this.challenge_bid=function(){
    if (this.game.bid.player) {
    console.log('player '+this.id+' challenged player '+this.game.bid.player.id+"'s bid!");
    dice_with_correct_face=0;
    this.game.players.forEach(function(player){
      player.dice.forEach(function(die){
        if (die==game.bid.face) {dice_with_correct_face+=1;}
      });
    });
    if (dice_with_correct_face >= game.bid.quantity){
      this.game.bid.player.lose_die();
      console.log('player '+this.game.bid.player.id+' lost a die!');
    } else{
      this.lose_die();
      console.log('player '+this.id+' lost a die!');
    }
    this.game.new_round();
  } else {console.log('no bid to challenge')}
  };
  this.auto_bid = function () {
    quantity = this.game.bid.quantity?  this.game.bid.quantity+1 : 1;
    face = this.game.bid.face ? this.game.bid.face +1 : 1;
    this.raise_bid(quantity,Math.min(face,6));
  };
  this.lose_die = function () {
    this.number_of_dice=this.number_of_dice-1;
  };
}

game=new Game(3);
game.start();
