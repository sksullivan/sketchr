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
	if (event.targetTouches) {
		event.x = event.targetTouches[0].pageX;
		event.y = event.targetTouches[0].pageY;
	}
	return event.y < this.y+this.height && event.y > this.y && event.x < this.x+this.width && event.x > this.x;
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

Road.prototype.onMouseDown = function () {
	$('#info').text("pressed2");
}

Road.prototype.contains = function (event) {
	if (event.targetTouches) {
		event.x = event.targetTouches[0].pageX;
		event.y = event.targetTouches[0].pageY;
	}
	return event.y < this.y+this.height/2 && event.y > this.y-this.height/2 && event.x < this.x+this.width/2 && event.x > this.x-this.width/2;
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

Road.prototype.toString = function () {
	return 'Road';
}

// CarGenrator Class

function CarGenerator (x,y,heading,size,imageName,name,ctx,type) {
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
	this.type = type;
}

CarGenerator.prototype = new DrawItem();

CarGenerator.prototype.onMouseDown = function () {
	if (placeMode == "car") {
		this.rotate(45);
		redraw();
	} else {
		placeMode = "car";
	}
}

// UninvolvedCarGenrator Class

function UCarGenrator (x,y,heading,size,imageName,name,ctx,type) {
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
	this.type = type;
}

UCarGenrator.prototype = new DrawItem();

UCarGenrator.prototype.onMouseDown = function () {
	if (placeMode == "uCar") {
		this.rotate(45);
		redraw();
	} else {
		placeMode = "uCar";
	}
}

// Road Generator Class

function RoadGenrator (x,y,heading,size,imageName,name,ctx,type) {
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
	this.type = type;
}

RoadGenrator.prototype = new DrawItem();

RoadGenrator.prototype.onMouseDown = function () {
	placeMode = "road";
}

// Setup and Main code

drawItemList = [];
ctx = null;
cvs = null;

placeMode = null;
carGenerator = null;
uCarGenerator = null;
roadGenerator = null;

tempRoad = null;

$(document).ready(function () {
	// Initialize scene and Draw Items
	cvs = document.getElementById('canvas');
	cvs.width  = $(window).width();
	cvs.height  = $(window).height();
	ctx = document.getElementById('canvas').getContext('2d');
	carGenerator = new CarGenerator(0,0,0,100,"/assets/redcar.png","the car generator",ctx);
	uCarGenerator = new UCarGenrator(220,0,0,100,"/assets/graycar.png","the uninvolved car generator",ctx);
	roadGenerator = new RoadGenrator(440,0,0,100,"/assets/road.png","the road generator",ctx);
	drawItemList.push(carGenerator);
	drawItemList.push(uCarGenerator);
	drawItemList.push(roadGenerator);

	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mouseup", mouseUp, false);
	canvas.addEventListener("touchstart", mouseDown, false);

	redraw();
});

function mouseDown (event) {
	event.preventDefault();
	for (i=0;i<drawItemList.length;i++) {
		if (drawItemList[i].contains(event) && drawItemList[i].toString() != 'Road') {
			drawItemList[i].onMouseDown();
			return;
		}
	}
	switch (placeMode) {
		case "car":
			car = new DrawItem(event.x-carGenerator.width/2,event.y-carGenerator.height/2,carGenerator.heading,100,"/assets/redcar.png","the car",this.ctx);
			drawItemList.push(car);
			break;
		case "uCar":
			uCar = new DrawItem(event.x-uCarGenerator.width/2,event.y-uCarGenerator.height/2,uCarGenerator.heading,100,"/assets/graycar.png","the car",this.ctx);
			drawItemList.push(uCar);
			break;
		case "road":
			tempRoad = new Road(event.x,event.y,0,0,130,"/assets/road.png","the road",this.ctx);
			placeMode = "road2";
			break;
		case "road2":
			x2 = event.x;
			y2 = event.y;
			x1 = tempRoad.x;
			y1 = tempRoad.y;
			slope = (y2-y1)/(x2-x1);
			angle = -Math.atan(slope)/Math.PI*180;
			if (angle > 55) {
				x1 = (x2+x1)/2;
				x2 = x1;
			} else if (angle > 35) {
				ydiff = y2-y1;
				x2 = x1-ydiff;
			} else if (angle > -35) {
				y1 = (y2+y1)/2;
				y2 = y1;
			} else if (angle > -55) {
				ydiff = y2-y1;
				x2 = x1+ydiff;
			} else { 
				x1 = (x2+x1)/2;
				x2 = x1;
			}
			tempRoad.x = x1;
			tempRoad.y = y1;
			tempRoad.x2 = x2;
			tempRoad.y2 = y2;
			drawItemList.push(tempRoad);
			placeMode = "road";
			break;
		default:
			break;
	}
	redraw();
}

function mouseUp (event) {
	/*drawItemList.forEach(function (drawItem) {
		if (isIn(event,drawItem)) {
			drawItem.rotate(45);
		}
	});*/
}



function redraw () {
	ctx.clearRect(0,0,$(window).width(),$(window).height());
	ctx.moveTo(0, 150);
	ctx.lineTo($(window).width(), 150);
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	drawItemList.forEach(function (drawItem) {
		drawItem.draw();
	});

	/*setTimeout(function () {
		car.rotate(45);
		redraw();
	}, 1000);*/
}