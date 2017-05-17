var dice=[];

for (i = 0; i < 3; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1)
}

$("#dice").html(dice)
