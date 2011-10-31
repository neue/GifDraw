$(document).ready(function() {
	var canvas = document.getElementById('drawcanvas');
	var pjs = new Processing("drawcanvas");
	
	var saved = pjs.PImage;
	var currentFrame = 1;
	var frames=new Array(9);
	
	pjs.setup = function() {  
		pjs.size(500,500);  
		pjs.stroke(0);
		pjs.noSmooth();
		pjs.strokeWeight(5);
		frames[1] = pjs.get();
		frames[2] = pjs.get();
		frames[3] = pjs.get();
		frames[4] = pjs.get();
		frames[5] = pjs.get();
		frames[6] = pjs.get();
		frames[7] = pjs.get();
		frames[8] = pjs.get();
		frames[9] = pjs.get();
		frames[10] = pjs.get();
		
	};
	
	pjs.draw = function() {};
	
	pjs.mouseDragged = function() {  
		pjs.line(pjs.pmouseX,pjs.pmouseY,pjs.mouseX,pjs.mouseY);
	
	};
	
	pjs.keyPressed = function(){
		if (pjs.key == 49) { switchFrame(1); };
		if (pjs.key == 50) { switchFrame(2); };
		if (pjs.key == 51) { switchFrame(3); };
		if (pjs.key == 52) { switchFrame(4); };
		if (pjs.key == 53) { switchFrame(5); };
		if (pjs.key == 54) { switchFrame(6); };
		if (pjs.key == 55) { switchFrame(7); };
		if (pjs.key == 56) { switchFrame(8); };
		if (pjs.key == 57) { switchFrame(9); };
		if (pjs.key == 48) { switchFrame(10); };
	};
	
	switchFrame = function(framenum){
		console.log("Going to Frame "+framenum);
		frames[currentFrame] = pjs.get();
		pjs.image(frames[framenum],0,0);
		currentFrame = framenum;
	};
	
	pjs.setup();  
});