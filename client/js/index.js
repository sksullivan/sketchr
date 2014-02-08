// Variables

var roadImg, carImg, cancelImg;
var items = [];
var ctx,diffx,diffy;
var roadMode = false;
var carMode = false;

var Pos1 = new Object();
var Pos2 = new Object();

// Setup

$(document).ready(function () {
	console.log("testing");

	ctx = document.getElementById('canvas').getContext('2d');
	var cvs = document.getElementById('canvas');
	cvs.width  = $(window).width();
	cvs.height  = $(window).height()-50;
	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseUp, false);

	// Load items
	carImg = new Image();
	carImg.src = "/assets/redcartop.png";
	setPos(carImg,0,10);

	roadImg = new Image();
	roadImg.src = "/assets/road.png";
	setPos(roadImg,300,10);

	cancelImg = new Image();
	cancelImg.src = "/assets/cancel.png";
	setPos(cancelImg,600,-10);

	items.push(roadImg);
	items.push(carImg);
	items.push(cancelImg);
	
	drawStatics();
	items.forEach(function (item) {
		item.onload = function () {
			ctx.drawImage(item,item.posx,item.posy);
		}
	});
});

// Mouse Events

function mouseDown(event) {
	Pos1.x = event.x;
	Pos1.y = event.y;

	if (isIn(event,carImg)) {
		roadMode = false;
		carMode = true;
		$(this).css('cursor', 'url(/assets/carcursor.png), auto');
	}

	if (isIn(event,roadImg)) {
		roadMode = true;
		$(this).css('cursor', 'url(/assets/roadcursor.png), auto');
	}

	if (isIn(event,cancelImg)) {
		roadMode = false;
		$(this).css('cursor', 'auto');
	}

	console.log(event.x+", "+event.y);
}

function mouseMove (event) {
	// todo?
}

function mouseUp (event) {
	if(roadMode) {
		Pos2.x = event.x;
		Pos2.y = event.y;
		newItem = new Object();
		newItem.isRoad = true;
		newItem.pos1 = Pos1;
		newItem.pos2 = Pos2;
		items.push(newItem);
		console.log(items);
		drawItems();
	}
	console.log(Pos1);
	console.log(Pos2);
	console.log(items);
}

// Helper Methods

function isIn (event,element) {
	return event.x < element.posx+element.width && event.x > element.posx && event.y < element.posy+element.height && event.y > element.posy;
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
			ctx.lineWidth=250;
			ctx.stroke();
			ctx.moveTo(item.pos1.x, item.pos1.y);
			ctx.lineTo(item.pos2.x, item.pos2.y);
			ctx.strokeStyle = '#FFFF00'
			ctx.lineWidth=10;
			ctx.stroke();
			ctx.strokeStyle = '#000000';
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

// function startDragging (event,item) {
// 	draggedItem = item;
// 	items.remove(items.indexOf(item));
// 	items.push(item);
// 	diffx = event.x - draggedItem.posx;
// 	diffy = event.y - draggedItem.posy;
// }

// function drag (event,selected) {
// 	setPos(selected,event.x-diffx,event.y-diffy);
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	drawStatics();
// 	drawItems();
// }

// function startDragging (event,item) {
// 	draggedItem = item;
// 	items.remove(items.indexOf(item));
// 	items.push(item);
// 	diffx = event.x - draggedItem.posx;
// 	diffy = event.y - draggedItem.posy;
// }