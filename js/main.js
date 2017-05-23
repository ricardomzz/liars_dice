//Game Class
function Game(number_of_players){
  this.players=[];
  this.bid={quantity:null,face:null,player:null};
  this.turn=null;
  this.next_turn = function (){
    this.turn=this.players[this.players.indexOf(this.turn)+1] ?
    this.players[this.players.indexOf(this.turn)+1]:
    this.players[0];
    this.render();
    console.log('player '+this.turn.id+"'s turn");
  };
  this.auto = function(){
    while(this.turn.auto){
      this.turn.auto_bid();
    }
  };
  this.render = function (){
    $('#main').html('');
    this.players.forEach(function(player){
      $('#main').append(
        '<div id="player'+player.id+'" class="player"><h1>Player'+player.id+
        '</h1></div>');
      $('#player'+player.id).append('<p>Dice: '+player.dice+'</p>');
    });
    $('#player'+game.turn.id).addClass('active');
    $('#player'+game.turn.id).append('<p>Your Turn!</p>');
    if (game.bid.player){
      $('#player'+game.bid.player.id).append('Bid: '+game.bid.quantity+' of '+game.bid.face);
    }
      //Add Controls and assign functions
    $('#player'+game.turn.id).append(' Quantity: '+
      '<input type="number" min="1" id="bid_quantity" step="1" value="'+
      game.bid.quantity+'" />');
    $('#player'+game.turn.id).append(' Face:'+
      '<input type="number" id="bid_face" min="1" max="6" step="1" value="'+
      game.bid.face+'" />');
    $('#player'+game.turn.id).append(
        '<button type="button" id="raise_bid">Raise Bid!</button>');
    $('#player'+game.turn.id).append(
        '<button type="button" id="challenge">Challenge!</button>');
    $('#player'+game.turn.id).append(
        '<button type="button" id="auto_bid">Auto</button>');

    $("#raise_bid").click(function(){
        quantity=parseInt($('#bid_quantity').val());
        face=parseInt($('#bid_face').val());
        game.turn.raise_bid(quantity,face);
      });
    $("#auto_bid").click(function(){
        game.turn.auto_bid();
      });
    $("#challenge").click(function(){
        game.turn.challenge_bid();
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
    //set player 0 (id 1) to non-AI
    this.players[0].auto=false;
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
  }
  this.render();
};
}

//Player Class
function Player(game,id){
  this.id=id;
  this.game=game;
  this.auto=true;
  this.number_of_dice=3;
  this.dice=[];
  this.roll = function (){
    this.dice=[];
    for (i=0; i<this.number_of_dice; i++){
      this.dice.push(Math.floor(Math.random() * 6) + 1);
    }
  };

  this.raise_bid=function(quantity,face){

    if(((quantity>game.bid.quantity && face >= game.bid.face)||
    (face > game.bid.face))&&(quantity>0 && face>0)&&(face<=6)){
      console.log('player '+this.id+' raised the bid to: '+quantity+' of '+
      face);
      this.game.bid={quantity:quantity,face:face,player:this};
      this.game.next_turn();
      if (game.turn.auto) {game.auto();}
    } else {console.log('Invalid Bid!');}


  };

  this.challenge_bid=function(){
    if (this.game.bid.player) {
    console.log('player '+this.id+' challenged player '+
    this.game.bid.player.id+"'s bid!");
    dice_with_correct_face=0;
    this.game.players.forEach(function(player){
      player.dice.forEach(function(die){
        if (die==game.bid.face || die==1) {dice_with_correct_face+=1;}
      });
    });
    console.log('There are '+dice_with_correct_face+' dice with face '+
    game.bid.face+' includng wild 1s!');
    if (dice_with_correct_face < game.bid.quantity){
      this.game.bid.player.lose_die();
      console.log('player '+this.game.bid.player.id+' lost a die!');
    } else{
      this.lose_die();
      console.log('player '+this.id+' lost a die!');
    }
    this.game.new_round();
    if (game.turn.auto) {game.auto();}
  } else {console.log('no bid to challenge');}
  };
  this.auto_bid = function () {
    quantity = this.game.bid.quantity?  this.game.bid.quantity+1 : 1;
    face = this.game.bid.face ? this.game.bid.face +1 : 1;
    if (this.game.bid.player && Math.random()>0.8){this.challenge_bid();} else
    {this.raise_bid(quantity,Math.min(face,6));}

  };
  this.lose_die = function () {
    this.number_of_dice=this.number_of_dice-1;
  };
}

//Initiate
game=new Game(5);
game.start();
