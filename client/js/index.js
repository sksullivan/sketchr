var tag = null;
var mouseIsDown = false;
var selected = null;
var roadImg, carImg;
var items = [];
var ctx;


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

	roadImg = new Image();
	roadImg.src = "/assets/road.png"
	setPos(roadImg,300,0);

	items.push(roadImg);
	items.push(carImg);
	items.forEach(function (item) {
		item.onload = function () {
			ctx.drawImage(item,item.posx,item.posy);
		}
	});
	ctx.strokeRect(0,0,$(window).width(),150);
	ctx.strokeRect(0,150,$(window).width(),$(window).height()-50);
});

function mouseDown(event) {
	mouseIsDown = true;
	items.forEach(function (item) {
		if (isIn(event,item)) {
			selected = item;
			tag = item.toString();
		}
	});
}

function mouseMove (event) {
	$('#info').text(event.x+","+event.y+tag);
	if (selected != null) {
		setPos(selected,event.x,event.y);
		ctx.drawImage(selected,selected.posx,selected.posy);
	}
}

function mouseUp (event) {
	mouseIsDown = false;
	tag = "";
	$('#info').text(event.x+","+event.y+tag);
	selected = null;
}

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