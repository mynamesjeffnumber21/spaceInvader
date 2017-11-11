manrunpath = "https://docs.google.com/uc?export=open&id=0B19mAvh2NxZ9OVBuLTlkUjdPNzg";
manidlepath = "https://docs.google.com/uc?export=open&id=0B19mAvh2NxZ9Q0pMdGN0NFAzYkE";

targetPosX = 100;
targetPosY = 50;
posX = 100;
posY = 50;



elapsed = 0;

var man = document.getElementById("man");
man.style.left = posX + "px";
man.style.top = posY + "px";

document.getElementById("container").onmousemove = setTargetposition;
setInterval(moveToTarget, 0.03);




// make alien
minLimitX = 200;    //left most position
maxLimitX = 1000; //right most position
minLimitY = 0;    //top most position
maxLimitY = 500; //bottom most position

function getRandomX()
{
  return minLimitX + Math.random()*(maxLimitX - minLimitX);
}
function getRandomY()
{
  return minLimitY + Math.random()*(maxLimitY - minLimitY);
}

targetAlienX = getRandomX();
targetAlienY = getRandomY();
alienX = targetAlienX;
alienY = targetAlienY;

var alien = document.getElementById("alien");
alien.style.left = alienX + "px";
alien.style.top = alienY + "px";

function getDistanceBetween(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function moveToTarget() {
  elapsed += 0.03;
  if (elapsed > 1)
  {
    elapsed -= 1;
    targetAlienX = getRandomX();
    targetAlienY = getRandomY();
  }

  var man = document.getElementById("man");
  var distBetw = getDistanceBetween(targetPosX, targetPosY, posX, posY);
  if (distBetw < 10) //reached target
  {
    //if (idlepath != man.src)
    man.src = manidlepath;
  } else //keepmoving
  {
    if (manrunpath != man.src)
      man.src = manrunpath;

    var dx = (targetPosX - posX) / distBetw;
    var dy = (targetPosY - posY) / distBetw;
    posX += dx;
    posY += dy;

    man.style.left = posX + "px";
    man.style.top = posY + "px";
  }
  /////////
  var alien = document.getElementById("alien");
  var distBetw = getDistanceBetween(targetAlienX, targetAlienY, alienX, alienY);
  if (distBetw < 10) //reached target
  {
    return;
  } else //keepmoving
  {
    var dx = (targetAlienX - alienX) / distBetw;
    var dy = (targetAlienY - alienY) / distBetw;
    alienX += dx;
    alienY += dy;

    alien.style.left = alienX + "px";
    alien.style.top = alienY + "px";
  }
}

function setTargetposition() {
  targetPosX = event.clientX;
  targetPosY = event.clientY;

  var man = document.getElementById("man");
  if (targetPosX < posX) {
    man.className = "invert";
  } else {
    man.className = "standard";
  }
}

var bullet = document.createElement("div");
bullet.id ="bullet";
document.body.appendChild(bullet);
$("#bullet").hide();

var score = 0;
var bulletx = 0;
var bullety = 0;
var alienx = alien.x;
var alieny = alien.y;

$("#container").click(function() {
  bulletx = man.x;
  bullety = man.y;
  $("#bullet").show();
  $("#bullet").css("left", bulletx+"px");
  $("#bullet").css("top", bullety+"px");
});

function updateBullet()
{
  bulletx += 15;
  $("#bullet").css("left", bulletx+"px");
  
  if ($("#bullet").is(":visible") && hasBulletHitEnemy())
    {
        score++
        $("#score").text("Score:" + score);
        $("#bullet").hide();
        $("#alien").css("background-color", "red");
   
    }
  else
    {
      $("#alien").css("background-color", "black");
    }
}

function hasBulletHitEnemy()
{
  var bulletMinX = bulletx;
  var bulletMaxX = bulletx + 10;
  var bulletMinY = bullety
  var bulletMaxY = bullety + 10;
  
  var alienMinX = alien.x;
  var alienMaxX = alien.x + 20;
  var alienMinY = alien.y;
  var alienMaxY = alien.y + 50;
  
  if (bulletMinX > alienMaxX || bulletMaxX < alienMinX) return false;
  if (bulletMinY > alienMaxY || bulletMaxY < alienMinY) return false;
  
  return true;
  
}

setInterval(updateBullet, 16);