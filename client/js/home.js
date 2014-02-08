// Draw Item Class

function DrawItem (x,y,heading,size,imageName,name,ctx) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.heading = heading; // In degrees
	if (imageName != null) {
		this.image = new Image();
		this.image.src = imageName;
		this.image.owner = this;
		this.image.onload = function () {
			this.owner.draw();
			this.owner.width = this.width;
			this.owner.height = this.height;
		}
	}
	this.name = name;
	this.ctx = ctx;
}

DrawItem.prototype.draw = function () {
	ctx.save();
	ctx.translate(this.x+this.image.width/2, this.y+this.image.height/2);
	ctx.rotate(this.heading/180*Math.PI);
	ctx.translate(-(this.x+this.image.width/2), -(this.y+this.image.height/2));
	ctx.drawImage(this.image,this.x,this.y);
	ctx.restore();
}

DrawItem.prototype.contains = function (event) {
	/*if (event.targetTouches) {
		event.x = event.targetTouches[0].pageX;
		event.y = event.targetTouches[0].pageY;
	}*/
	//return event.y < this.y+this.height && event.y > this.y && event.x < this.x+this.width && event.x > this.x;
	return event.targetTouches[0].pageY < this.y+this.height && event.targetTouches[0].pageY > this.y && event.targetTouches[0].pageX < this.x+this.width && event.targetTouches[0].pageX > this.x;
}

DrawItem.prototype.onMouseDown = function () {
	$('#info').text("pressed a draw");
}

DrawItem.prototype.onMouseUp = function () {
	
}

DrawItem.prototype.rotate = function (amount) {
	this.heading += amount;
}

DrawItem.prototype.move = function (x,y) {
	this.x += x;
	this.y += y;
}

// Road Class

function Road (x,y,x2,y2,size,name,ctx) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.x2 = x2;
	this.y2 = y2;
	if (this.x2-this.x > 0) {
		this.width = Math.abs(this.x2-this.x);
		this.height = this.size;
	} else {
		this.width = this.size;
		this.height = Math.abs(this.y2-this.y);
	}
	this.ctx = ctx;
	this.name = name;
}

Road.prototype = new DrawItem();

Road.prototype.onMouseDown = function () {
	$('#info').text("pressed2");
}

Road.prototype.contains = function (event) {
	/*if (event.targetTouches) {
		event.x = event.targetTouches[0].pageX;
		event.y = event.targetTouches[0].pageY;
	}*/
	return event.targetTouches[0].pageY < this.y+this.height/2 && event.targetTouches[0].pageY > this.y-this.height/2 && event.targetTouches[0].pageX < this.x+this.width/2 && event.targetTouches[0].pageX > this.x-this.width/2;
}

Road.prototype.draw = function () {
	slope = (this.y2-this.y)/(this.x2-this.x);
	angle = -Math.atan(slope);
	ctx.moveTo(this.x-Math.cos(angle)*30, this.y+Math.sin(angle)*30);
	ctx.lineTo(this.x2+Math.cos(angle)*30, this.y2-Math.sin(angle)*30);
	ctx.lineWidth = this.size;
	ctx.stroke();
	ctx.moveTo(this.x-Math.cos(angle)*30, this.y+Math.sin(angle)*30);
	ctx.lineTo(this.x2+Math.cos(angle)*30, this.y2-Math.sin(angle)*30);
	ctx.strokeStyle = '#FFFF00'
	ctx.lineWidth = this.size/10;
	ctx.stroke();
	ctx.strokeStyle = '#000000';
}

/*function Genrator (x,y,heading,type) {
	this.x = x;
	this.y = y;
	this.heading = heading;
	this.type = type;
}

Generator.prototype.makeItem(type) {
  var item = Object.create();
  baby.name = name;
  return baby;
}*/

// Setup and Main code

drawItemList = [];
ctx = null;
cvs = null;

$(document).ready(function () {
	// Initialize scene and Draw Items
	cvs = document.getElementById('canvas');
	cvs.width  = $(window).width();
	cvs.height  = $(window).height()-200;
	ctx = document.getElementById('canvas').getContext('2d');
	car = new DrawItem(0,0,0,100,"/assets/redcar.png","the car",ctx);
	road = new Road(500,0,500,500,130,"the road",ctx);
	drawItemList.push(car);
	drawItemList.push(road);

	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mouseup", mouseUp, false);
	canvas.addEventListener("touchstart", touchDown, false);

	redraw();
});

function mouseDown (event) {
	drawItemList.forEach(function (drawItem) {
		if (drawItem.contains(event)) {
			drawItem.onMouseDown();
			redraw();
		}
	});
}

function mouseUp (event) {
	/*drawItemList.forEach(function (drawItem) {
		if (isIn(event,drawItem)) {
			drawItem.rotate(45);
		}
	});*/
}

function touchDown (event) {
	event.preventDefault();
	drawItemList.forEach(function (drawItem) {
		if (drawItem.contains(event)) {
			drawItem.onMouseDown();
		}
	});
}

function redraw () {
	ctx.clearRect(0,0,$(window).width(),$(window).height());
	drawItemList.forEach(function (drawItem) {
		drawItem.draw();
	});

	/*setTimeout(function () {
		car.rotate(45);
		redraw();
	}, 1000);*/
}

// Helper Methods

function isInTouch (event,element) {
	return event.targetTouches[0].pageX < element.x+element.width && event.targetTouches[0].pageX > element.x && event.targetTouches[0].pageY < element.y+element.height && event.targetTouches[0].pageY > element.y;
}