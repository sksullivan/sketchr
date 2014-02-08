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

	canvas.addEventListener("touchstart", mouseDown, false);
	canvas.addEventListener("touchmove", mouseMove, false);
	//canvas.addEventListener("touchend", mouseUp, false);
	canvas.addEventListener("touchcancel", mouseUp, false);

	//canvas.addEventListener("touchstart", mouseDown, false);
	//canvas.addEventListener("touchmove", mouseMove, false);
	//canvas.addEventListener("touchend", mouseUp, false);

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

function mouseDown(event) {
	$('#info').text("POW "+event.targetTouches[0].pageX+","+event.targetTouches[0].pageY);
	if (roadMode) {
		roadPos1.x = event.targetTouches[0].pageX;
		roadPos1.y = event.targetTouches[0].pageY;
		roadMode = false;
		roadModeEnd = true;
	}


	if (!mouseIsDown) {
		items.forEach(function (item) {
			if (isIn(event,item)) {
				if (item.shouldDragSimple || item.shouldDragComplete) {
					startDraggingTouch(event,item);
				}
				if (item.shouldDragComplete) {
					roadMode = true;
					road = item;
					/*for (i=0;i<$(window).height()/draggedItem.height;i++) {
						newItem = draggedItem.cloneNode(false);
						newItem.cloned = true;
						setPos(newItem,draggedItem.posx,draggedItem.posy+draggedItem.height*(i+1));
						console.log(newItem);
						items.push(newItem);
					}
					drawItems();
					console.log(items);*/
				}
			}
		});
	}
	mouseIsDown = true;
	console.log(event.targetTouches[0].pageX+","+event.targetTouches[0].pageY);
}

function mouseMove (event) {
	$('#info').text("MOVING "+event.targetTouches[0].pageX+","+event.targetTouches[0].pageY);
	if (draggedItem != null) {
		if (draggedItem.shouldDragComplete) {

		}
		dragTouch(event,draggedItem);
		/*items.forEach(function (item) {
			if (item.cloned) {
				drag(event,item);
			}
		});*/
	}
}

function mouseUp (event) {
	$('#info').text("UNPOW "+event.targetTouches[0].pageX+","+event.targetTouches[0].pageY);
	if(roadModeEnd) {
		roadPos2.x = event.targetTouches[0].pageX;
		roadPos2.y = event.targetTouches[0].pageY;
		newItem = new Object();
		newItem.isRoad = true;
		newItem.pos1 = roadPos1;
		newItem.pos2 = roadPos2;
		items.push(newItem);
		road = null;
		console.log(items);
	}
	roadModeEnd = false
	console.log(roadPos1);
	console.log(roadPos2);
	drawItems();
	console.log(items);

	mouseIsDown = false;
	draggedItem = null;
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