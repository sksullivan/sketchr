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
	ctx.drawImage(this.image,this.x,this.y, this.size * this.image.width, this.size * this.image.height);
	ctx.restore();
}

DrawItem.prototype.contains = function (event) {
	if (event.targetTouches) {
		event.x = event.targetTouches[0].pageX;
		event.y = event.targetTouches[0].pageY;
	}
	return event.y < this.y+this.size*this.height && event.y > this.y && event.x < this.x+this.size*this.width && event.x > this.x;
}

DrawItem.prototype.onMouseDown = function () {
	$('#info').text("pressed a draw");
}

DrawItem.prototype.rotate = function (amount) {
	this.heading += amount;
}

DrawItem.prototype.move = function (x,y) {
	this.x += x;
	this.y += y;
}

function MenuItem (x,y,height,width,text,onMouseDown,draw) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.text = text;
	this.onMouseDown = onMouseDown;
	this.draw = draw;
}

DrawItem.prototype.displayMenu = function (event) {
	ctx.translate(event.x-90,event.y-40);
	deleteItem = new MenuItem(-90,-40,30,60,"Delete",function () {
		drawItemList.remove(drawItemList.indexOf(selected));
	});
	ctx.beginPath();
	ctx.rect(0,0,60,30);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.font="12px Arial";
	ctx.fillStyle = 'black';
	ctx.fillText("Delete",10,20);

	ctx.translate(90,0);
	ctx.beginPath();
	ctx.rect(0,0,60,30);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.font="12px Arial";
	ctx.fillStyle = 'black';
	ctx.fillText("Move",10,20);

	ctx.translate(-45,60);
	ctx.beginPath();
	ctx.rect(0,0,60,30);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.font="12px Arial";
	ctx.fillStyle = 'black';
	ctx.fillText("Label",10,20);

	ctx.translate(-event.x+45,-event.y-20);
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
	ctx.beginPath();
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = this.size/1.5;
	ctx.setLineDash([cvs.width+cvs.height]);
	ctx.moveTo(this.x-Math.cos(angle)*30, this.y+Math.sin(angle)*30);
	ctx.lineTo(this.x2+Math.cos(angle)*30, this.y2-Math.sin(angle)*30);
	ctx.stroke();
	ctx.moveTo(this.x-Math.cos(angle)*30, this.y+Math.sin(angle)*30);
	ctx.lineTo(this.x2+Math.cos(angle)*30, this.y2-Math.sin(angle)*30);
	ctx.strokeStyle = '#FFFF00'
	ctx.lineWidth = this.size/12;
	ctx.setLineDash([this.size/2,this.size/4]);
	ctx.stroke();
	ctx.setLineDash([cvs.width+cvs.height]);
}

Road.prototype.toString = function () {
	return 'Road';
}

// Generator Class

function Generator () {

}

Generator.prototype = new DrawItem();

Generator.prototype.isGenerator = function () {
	return true;
}

// CarGenerator Class

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

CarGenerator.prototype = new Generator();

CarGenerator.prototype.onMouseDown = function () {
	if (placeMode == "car") {
		this.rotate(45);
		redraw();
	} else {
		placeMode = "car";
	}
}

// UninvolvedCarGenerator Class

function UCarGenerator (x,y,heading,size,imageName,name,ctx,type) {
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

UCarGenerator.prototype = new Generator();

UCarGenerator.prototype.onMouseDown = function () {
	if (placeMode == "uCar") {
		this.rotate(45);
		redraw();
	} else {
		placeMode = "uCar";
	}
}

// Road Generator Class

function RoadGenerator (x,y,heading,size,imageName,name,ctx,type) {
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

RoadGenerator.prototype = new Generator();

RoadGenerator.prototype.onMouseDown = function () {
	placeMode = "road";
}

// North Arrow Generator

function NorthGenerator (x,y,heading,size,name,ctx) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.heading = heading; // In degrees
	this.images = [
		"/assets/arrowU.png",
		"/assets/arrowR.png",
		"/assets/arrowD.png",
		"/assets/arrowL.png",
	];
	this.index = 0;
	this.image = new Image();
	this.image.src = this.images[0];
	this.image.owner = this;
	this.image.onload = function () {
		this.owner.draw();
		this.owner.width = this.width;
		this.owner.height = this.height;
	}
	this.name = name;
	this.ctx = ctx;
}

NorthGenerator.prototype = new Generator();

NorthGenerator.prototype.onMouseDown = function () {
	if (placeMode == "arrow") {
		this.index = (this.index+1)%4;
		this.image.src = this.images[this.index];
		redraw();
	} else {
		placeMode = "arrow";
		console.log("changed modes");
	}
}

// Setup and Main code

drawItemList = [];
menuItems = [];
ctx = null;
cvs = null;

placeMode = null;
carGenerator = null;
uCarGenerator = null;
roadGenerator = null;
northGenerator = null;

menuOut = false;

tempRoad = null;

$(document).ready(function () {
	// Initialize scene and Draw Items
	cvs = document.getElementById('canvas');
	cvs.width  = $(window).width();
	cvs.height  = $(window).height();
	ctx = document.getElementById('canvas').getContext('2d');
	carGenerator = new CarGenerator(1/85*cvs.width,1/60*cvs.height,0,cvs.width/1800,"/assets/redcar.png","the car generator",ctx);
	uCarGenerator = new UCarGenerator(1/7*cvs.width,1/60*cvs.height,0,cvs.width/1800,"/assets/graycar.png","the uninvolved car generator",ctx);
	roadGenerator = new RoadGenerator(2/7*cvs.width,1/60*cvs.height,0,cvs.width/1800,"/assets/road.png","the road generator",ctx);
	northGenerator = new NorthGenerator(11/28*cvs.width,1/60*cvs.height,0,cvs.width/1800,"/assets/arrowU.png","the north generator",ctx);
	drawItemList.push(carGenerator);
	drawItemList.push(uCarGenerator);
	drawItemList.push(roadGenerator);
	drawItemList.push(northGenerator);

	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("touchstart", mouseDown, false);
	//canvas.addEventListener("touchmove", mouseDrag, false);

	redraw();
});

function mouseDown (event) {
	event.preventDefault();
	//if (menuOut) {
	//	if (event.)
	//}

	for (i=0;i<drawItemList.length;i++) {
		if (drawItemList[i].contains(event) && drawItemList[i].toString() != 'Road') {
			if (!drawItemList[i].isGenerator) {
				drawItemList[i].displayMenu(event);
			} else {
				drawItemList[i].onMouseDown();
			}
			return;
		}
	}
	switch (placeMode) {
		case "car":
			car = new DrawItem(event.x-carGenerator.size*carGenerator.width/2,event.y-carGenerator.size*carGenerator.height/2,carGenerator.heading,carGenerator.size,"/assets/redcar.png","the car",this.ctx);
			drawItemList.push(car);
			break;
		case "uCar":
			uCar = new DrawItem(event.x-uCarGenerator.size*uCarGenerator.width/2,event.y-uCarGenerator.size*uCarGenerator.height/2,uCarGenerator.heading,uCarGenerator.size,"/assets/graycar.png","the car",this.ctx);
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
			if (angle > 60) {
				x1 = (x2+x1)/2;
				x2 = x1;
			} else if (angle > 30) {
				ydiff = y2-y1;
				x2 = x1-ydiff;
			} else if (angle > -30) {
				y1 = (y2+y1)/2;
				y2 = y1;
			} else if (angle > -60) {
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

function redraw () {
	ctx.clearRect(0,0,cvs.width,cvs.height);
	ctx.beginPath();
	ctx.moveTo(0, cvs.width/1600*160);
	ctx.lineTo(cvs.width, cvs.width/1600*160);
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	console.log(drawItemList);
	drawItemList.forEach(function (drawItem) {
		drawItem.draw();
	});
}

function sendData () {
	$.post('/data', { data: drawItemList }, function (data) {
		alert("Success");
	});
}