// Variables

var tag = "";
var mouseIsDown = false;
var draggedItem = null;
var selectedItem = null;
var roadImg, carImg;
var items = [];
var ctx,diffx,diffy;

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
	carImg.src = "/assets/redcartop.png"
	setPos(carImg,0,0);
	carImg.shouldDrag = true;

	roadImg = new Image();
	roadImg.src = "/assets/road.png"
	setPos(roadImg,300,0);
	roadImg.shouldSelect = true;

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
	mouseIsDown = true;
	if (selectedItem != null) {
		selectedItem = null;
		return;
	}
	items.forEach(function (item) {
		if (isIn(event,item)) {
			if (item.shouldDrag) {
				startDragging(event,item);
			} else {
				startSelecting(event,item);
			}
		}
	});
}

function mouseMove (event) {
	if (draggedItem != null || selectedItem != null) {
		drag(event,draggedItem || selectedItem);
	}
}

function mouseUp (event) {
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
		ctx.drawImage(item,item.posx,item.posy);
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

function drag (event,selected) {
	setPos(selected,event.x-diffx,event.y-diffy);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStatics();
	drawItems();
}

function startDragging (event,item) {
	draggedItem = item;
	items.remove(items.indexOf(item));
	items.push(item);
	diffx = event.x - draggedItem.posx;
	diffy = event.y - draggedItem.posy;
}

function startSelecting (event,item) {
	selectedItem = item;
	items.remove(items.indexOf(item));
	items.push(item);
	diffx = event.x - selectedItem.posx;
	diffy = event.y - selectedItem.posy;
}