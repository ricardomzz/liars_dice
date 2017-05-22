//Player Class and Prototype Methods
function Player(id){
  this.id=id;
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
  this.turn=null;
  this.previous_turn=null;
  this.next_turn = function (){
    this.previous_turn=this.turn;
    if (this.turn==this.players[this.players.length-1]){
      this.turn=this.players[0];
    } else{this.turn=this.players[this.players.indexOf(this.turn)+1];}

  };
  this.render = function(){
    $("#game").html('');
    game.players.forEach(function(player,index,array){
      html='<p>player '+player.id+'</p>';
      $("#game").append(html);
      if (player===game.turn) {$("#game").append(
        'Dice:  '+player.dice+
        ' Quantity: '+'<input type="number" min="1" id="bid_quantity" step="1" value="'+game.bid.quantity+'" />'+
        ' Face:'+'<input type="number" id="bid_face" min="1" max="6" step="1" value="'+game.bid.face+'" />'+
        '<button type="button" id="raise">Raise!</button>'
      );
      $("#raise").click(function(){
        quantity=$('#bid_quantity').val();
        face=$('#bid_face').val();
        game.raise({quantity:quantity,face:face});
      });
      }
      if (player===game.turn && game.previous_turn) {$("#game").append(
        '<button type="button" id="challenge">Challenge!</button>'
      );
      $("#challenge").click(function(){
        game.challenge();
      });
      }




    });

  };
  this.start = function (number_of_players){
    for (i=0; i<number_of_players; i++){
      this.players.push(new Player(i+1));
    }
    this.players.forEach(function(player){
      player.roll();
    });
    this.turn=this.players[0];
    game.render();
  };
  this.raise = function(bid){
    if((bid.quantity>game.bid.quantity && bid.face >= game.bid.face)||
    (bid.face > game.bid.face)){
    game.bid=bid;
    game.next_turn();
    this.render();
  } else {
    alert('bid must be greater!');
  }
  };
  this.challenge = function(){
    dice_with_correct_face=0;
    game.players.forEach(function(player){
      player.dice.forEach(function(die){
        if (die==game.bid.face) {dice_with_correct_face+=1;}
      });
    });
    if (dice_with_correct_face >= game.bid.quantity){
      this.turn.lose_die();
      alert('player '+this.turn.id+' lost! and player '+this.previous_turn.id+'won!count of dice with '+game.bid.face+' face: '+dice_with_correct_face);
      this.turn=this.previous_turn;
    } else {
      this.previous_turn.lose_die();
      alert('player '+this.turn.id+' won! and player '+this.previous_turn.id+'lost! count of dice with '+game.bid.face+' face: '+dice_with_correct_face); }
    game.new_round();
  };
  this.new_round = function(){
    game.previous_turn=null;
    //remove inactive players
    game.players.forEach(function(player){
      if (player.number_of_dice===0){
        game.players.splice(game.players.indexOf(player), 1 );
      }
      //check for victory
      if (game.players.length === 1){
        alert('player '+game.players[0].id+' won!');
        game.turn=null;
        game.render();
      } else { //else go on with game
      player.roll();
      game.bid={quantity:1,face:1};
      game.render();
    }
    });
  };
}


//Initialize
game = new Game();
game.start(2);
