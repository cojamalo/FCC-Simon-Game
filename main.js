//---Initialize variables and settings--->
var comp_sequence, player_sequence, counter, next_wedge, game_start, comp_length, timing, no_advance, timeouts;
$('#item-1').css('fill', '#FD2111');
$('#item-2').css('fill', '#35CE42');
$('#item-3').css('fill', '#FFF124');
$('#item-4').css('fill', '#0182E0');
player_sequence = [];
comp_sequence = [];
game_start = false;
comp_length = 0;

function Wedge(id, fill, color, highlight) {
  this.id = $(id);
  this.color = color;
  this.Listen = $(id).click(function() {
    document.getElementById(color).play();
    player_sequence.push(color);
    
    if (game_start && color != comp_sequence[comp_length-1].color) {
      player_sequence = [];
        document.getElementById('mistake').play();
        if (strict_on) {
          alert("Game over. Please try again!");
          setTimeout(gameStart, 2000);
        }
        else {
          no_advance = true;
          setTimeout(playPrevious, 1);
        }
    }
    else if (game_start && comp_length == comp_sequence.length) {      
      console.log(player_sequence);            
      if (moveCompare()) {
        player_sequence = [];
        console.log("there is a matching of inputs!");
        if (counter > 20) {
          alert("You've won the game! Nice job!");
        }
        setTimeout(playPrevious, 1000);
      }
      else {
        player_sequence = [];
        document.getElementById('mistake').play();
        if (strict_on) {
          alert("Game over. Please try again!");
          setTimeout(gameStart, 2000);
        }
        else {
          no_advance = true;
          setTimeout(playPrevious, 2000);
        }
      }
      
    }
    comp_length++;
  })
  this.Mark = function() {
    document.getElementById(color).play();
    $(id).css('fill', highlight);
    setTimeout(function() {
        $(id).css('fill', fill); 
    }, 500);
   
  }
}

var red = new Wedge("#item-1", '#FD2111', "red", '#FF776C');
var green = new Wedge("#item-2", '#35CE42', "green", '#84E88B');
var yellow = new Wedge("#item-3", '#FFF124', "yellow", '#FFF777');
var blue = new Wedge("#item-4", '#0182E0', "blue", '#30A1F1');
var wedges = [red, green, yellow, blue]; 

var power_on = false;
var count = 0;

$('#power-switch').click(function() {
  count++;
  if (!power_on && count == 2) {
    $('.threeDee').css('background-color', '#2196F3');
    $('.counter').text("0")
    power_on = true;
    //---Initialize sounds for mobile--->
for (var i = 0; i < wedges.length; i++) {
  document.getElementById(wedges[i].color).play();
  
}
    count = 0;
    setTimeout(gameStart, 1200);
  }
  else if (power_on && count == 2) {
    $('.threeDee').css('background-color', '#999999');
    power_on = false;
    game_start = false;
    for (var i = 0; i <= timeouts.length; i += 1) {
            clearTimeout(timeouts[i]);
        }
    $('.counter').text("--");
    count = 0;
  }
})

var strict_on = false;
var countb = 0;
$('#strict-switch').click(function() {
  countb++;
 if (!strict_on && countb == 2) {
    
    strict_on = true;
    countb = 0;
  }
  else if (strict_on && countb == 2) {
    
    strict_on = false;
    countb = 0;
  }
})

function gameStart() {
  game_start = true;
  timing = 1000;
  comp_sequence = [];
  player_sequence = [];
  comp_length = 1;
  counter = 0;
  $('.counter').text(counter);
  no_advance = false;
  timeouts = [];
  pickAnyWedge();
 
}

function pickAnyWedge() {
  var random = Math.floor((Math.random() * 4) + 0);
  next_wedge = wedges[random];
  comp_sequence.push(next_wedge);
  next_wedge.Mark();  
  counter++;
  $('.counter').text(counter);
}

function moveCompare() {
  for (var i = 0; i < player_sequence.length; i++) {
    if (comp_sequence[i].color != player_sequence[i]) {
      return false;
    }
  }
  return true;
}

//---Play green--->
function playPrevious() {
  
  for (var i = 0; i < comp_sequence.length; i++) {
    var tmp = comp_sequence[i];
    var time = i * timing;
    
    timer = setTimeout(tmp.Mark, time);
    timeouts.push(timer);
  }
  if (!no_advance) {
    timer = setTimeout(pickAnyWedge, (comp_sequence.length)*timing);
    timeouts.push(timer);
    timing = timing * 0.956;
  }  
  no_advance = false;
  comp_length = 1;
}

//---Restart the game--->
$('.threeDee').click(function() {
  if (power_on) {
    gameStart();
  }
})

