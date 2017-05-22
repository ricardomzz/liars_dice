//Player Class and Prototype Methods
function Player(){
  this.dice=[];
  this.number_of_dice=3;

}

Player.prototype.roll = function (){
  this.dice=[];
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
  this.bid={quantity:1,face:1};
  this.turn=0;
  this.next_turn = function (){
    if (this.turn === this.players.length-1) {
      this.turn = 0;
    } else {
      this.turn +=1;
    }
  };
  this.render = function(){
    $("#game").html('');
    game.players.forEach(function(player,index,array){
      html='<p>player '+index+': '+player.dice+'</p>';
      $("#game").append(html);
      if (game.turn == index) {$("#game").append(
        'Quantity: '+'<input type="number" min="1" id="bid_quantity" step="1" value="'+game.bid.quantity+'" />'+
        ' Face:'+'<input type="number" id="bid_face" min="1" max="6" step="1" value="'+game.bid.face+'" />'+
        '<button type="button" id="raise">Raise!</button>'+
        '<button type="button" id="challenge">Challenge!</button>'
      );
      $("#challenge").click(function(){
        game.challenge();
      });
      $("#raise").click(function(){
        quantity=$('#bid_quantity').val();
        face=$('#bid_face').val();
        game.raise({quantity:quantity,face:face});
      })

      ;}
    });

  };
  this.start = function (){
    for (i=0; i<3; i++){
      this.players.push(new Player());
    }
    this.players.forEach(function(player){
      player.roll();
    });
    game.render();
  };
  this.raise = function(bid){
    //TODO: Check if bid is valid
    game.bid=bid;
    game.next_turn();
    this.render();
  };
  this.challenge = function(){
    game.new_round();
  };
  this.new_round = function(){
    game.players.forEach(function(player){
      player.roll();
      game.bid={quantity:1,face:1};
      game.turn=0;
      game.render();
    });
  };
}


//Initialize
game = new Game();
game.start();
