window.pjsin = Processing.getInstanceById("drawcanvas");


void setup(){
	size(350,350);
	background(200);
}

var drawXY = 0;

void drawImg(img){
	console.log("PS Got Frame");
	console.log(importedImage.width);
	importedImage.fromImageData(img);
    image(importedImage,drawXY,drawXY);
	drawXY += 10;
	if (drawXY > width) {drawXY = 0;};
}

PImage importedImage= createImage(500, 500, RGB);
void importImg(uri){
	console.log("Importing Image");
	importedImage = loadImage(uri, null, function(){
	    image(importedImage,drawXY,drawXY);
		drawXY + 10;
		
	});	
}
