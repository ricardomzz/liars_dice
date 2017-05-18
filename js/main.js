var dice=[];

function roll(dice){
  dice=[];
for (i = 0; i < 3; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);

}
return dice;
}

$("#dice").html(roll(dice))
