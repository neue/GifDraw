window.pjsin = Processing.getInstanceById("drawcanvas");


void setup(){
	size(500,500);
	background(200);
}

var drawXY = 0;

void drawImg(img){
	console.log("Trying");
	console.log(img);
	console.log(importedImage);
	importedImage.fromImageData(img);
    image(importedImage,drawXY,drawXY);
	drawXY += 10;
	
}

PImage importedImage= createImage(500, 500, RGB);
void importImg(uri){
	console.log("Importing Image");
	importedImage = loadImage(uri, null, function(){
	    image(importedImage,drawXY,drawXY);
		drawXY + 10;
		
	});	
}
