// Variables

var tag = "";
var mouseIsDown = false;
var draggedItem = null;
var road = null;
var roadImg, carImg;
var items = [];
var ctx,diffx,diffy;
var roadMode = false;
var roadModeEnd = false;

var roadPos1 = new Object();
var roadPos2 = new Object();

// Setup

$(document).ready(function () {
	console.log("testing");

	ctx = document.getElementById('canvas').getContext('2d');
	var cvs = document.getElementById('canvas');
	cvs.width  = $(window).width();
	cvs.height  = $(window).height()-50;
	//canvas.addEventListener("pointerdown", mouseDown, false);
	//canvas.addEventListener("pointermove", mouseMove, false);
	//canvas.addEventListener("pointerup", mouseUp, false);

	canvas.addEventListener("touchstart", touchDown, false);
	//canvas.addEventListener("touchmove", touchMove, false);
	canvas.addEventListener("touchend", touchUp, false);
	canvas.addEventListener("touchcancel", touchCancel, false);

	// Load items
	carImg = new Image();
	carImg.src = "/assets/redcartop.png"
	setPos(carImg,0,0);
	carImg.shouldDragSimple = true;

	roadImg = new Image();
	roadImg.src = "/assets/road.png"
	setPos(roadImg,300,0);
	roadImg.shouldDragComplete = true;

	items.push(roadImg);
	items.push(carImg);
	
	drawStatics();
	items.forEach(function (item) {
		item.onload = function () {
			ctx.drawImage(item,item.posx,item.posy);
		}
	});
});

// Mouse Events

function touchDown(event) {
	event.preventDefault();
	$('#info').text("T-DOWN "+event.targetTouches[0].pageX+","+event.targetTouches[0].pageY);
	if (!roadMode) {
		roadPos1.x = event.targetTouches[0].pageX;
		roadPos1.y = event.targetTouches[0].pageY;
		roadMode = true;
	} else if (roadMode) {
		roadPos2.x = event.targetTouches[0].pageX;
		roadPos2.y = event.targetTouches[0].pageY;

		road = new Object();
		road.isRoad = true;
		road.pos1 = roadPos1;
		road.pos2 = roadPos2;
		items.push(road);
		roadMode = false;
		drawItems();
	}
}

function touchMove (event) {
	event.preventDefault();
	$('#info').text("T-MOVING "+event.targetTouches[0].pageX+","+event.targetTouches[0].pageY);
}

function touchUp (event) {
	$('#info').text("T-UP "+event.targetTouches[0].pageX+","+event.targetTouches[0].pageY);
}

function touchCancel (event) {
	$('#info').text("T-CANCEL "+event.targetTouches[0].pageX+","+event.targetTouches[0].pageY);
}

// Helper Methods

function isIn (event,element) {
	if (event.x < element.posx+element.width && event.x > element.posx && event.y < element.posy+element.height && event.y > element.posy) {
		return true;
	}
	return false;
}

function setPos (element,x,y) {
	element.posx = x;
	element.posy = y;
}

function drawStatics() {
	ctx.strokeRect(0,0,$(window).width(),150);
	ctx.strokeRect(0,150,$(window).width(),$(window).height()-50);
}

function drawItems() {
	items.forEach(function (item) {
		if (item.isRoad) {
			ctx.moveTo(item.pos1.x, item.pos1.y);
			ctx.lineTo(item.pos2.x, item.pos2.y);
			ctx.stroke();
		} else {
			ctx.drawImage(item,item.posx,item.posy);
		}
	});
}

Array.prototype.remove = function (from, to) { // Remove element code snippet by John Resig, creator of jQuery
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function startDragging (event,item) {
	draggedItem = item;
	items.remove(items.indexOf(item));
	items.push(item);
	diffx = event.x - draggedItem.posx;
	diffy = event.y - draggedItem.posy;
}

function startDraggingTouch (event,item) {
	draggedItem = item;
	items.remove(items.indexOf(item));
	items.push(item);
	diffx = event.targetTouches[0].pageX - draggedItem.posx;
	diffy = event.targetTouches[0].pageY - draggedItem.posy;
}

function drag (event,selected) {
	setPos(selected,event.x-diffx,event.y-diffy);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStatics();
	drawItems();
}

function dragTouch (event,selected) {
	setPos(selected,event.targetTouches[0].pageX-diffx,event.targetTouches[0].pageY-diffy);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStatics();
	drawItems();
}