describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game(5);
    game.start();
  });

  it("should have players", function() {
    expect(game.players.length).toEqual(5);
  });

  it("should have players with 3 dice each", function() {
    game.players.forEach(function (player){
      expect(player.dice.length).toEqual(3);
    });
  });
  it("should have a turn assigned", function() {
      expect(game.turn).toBeTruthy();
    });
});
