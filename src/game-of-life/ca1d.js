const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const button = document.getElementById('live');
button.onclick = function () {
  for (var c = 0; c < cells.length; c++) {
    cells[c].isAlive = true;
  }

  drawAgain();
};

const otherButton = document.getElementById('die');
otherButton.onclick = function () {
  clearTimeout(timeout);
  
  for (var c = 0; c < cells.length; c++) {
    cells[c].isAlive = false;
  }
  
  drawOnce();
}

const size = 20;
const roof = 0;
const gap = 10;

var timeout = null;
var cells = [
  { draw : function() { ctx.fillRect(size * 0 + gap, roof, size, size /2); }, isAlive : false },
  { draw : function() { ctx.fillRect(size * 2 + gap, roof, size, size /2); }, isAlive : false },
  { draw : function() { ctx.fillRect(size * 4 + gap, roof, size, size /2); }, isAlive : false },
  { draw : function() { ctx.fillRect(size * 6 + gap, roof, size, size /2); }, isAlive : false },
  { draw : function() { ctx.fillRect(size * 8 + gap, roof, size, size /2); }, isAlive : true },
  { draw : function() { ctx.fillRect(size * 10 + gap, roof, size, size /2); }, isAlive : false },
  { draw : function() { ctx.fillRect(size * 12 + gap, roof, size, size /2); }, isAlive : false },
  { draw : function() { ctx.fillRect(size * 14 + gap, roof, size, size /2); }, isAlive : false }
];

var theRuleOfLaw = function (left, middle, right) {
  return left ^ right;
}


var amIAlive = function (i) {
  var me = cells[i].isAlive;
  
  var left = 0;
  var right = 0;
    
  if (i - 1 > -1) {
    left = cells[i - 1].isAlive;
  }
  
  if (i + 1 < cells.length) {
    right = cells[i + 1].isAlive;
  }
  
  return theRuleOfLaw(left, me, right);
};

var drawOnce = function() {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].isAlive) {
      ctx.fillStyle = 'green';
    } else {
      ctx.fillStyle = 'black';
    }
    cells[i].draw();
  }
}

var drawAgain = function () {
  for (var c = 0; c < cells.length; c++) {
    cells[c].isAlive = amIAlive(c);
  }
  
  drawOnce();
  
  timeout = window.setTimeout(drawAgain, 200);
};

drawOnce();
