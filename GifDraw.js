$(document).ready(function() {
	var canvas = document.getElementById('drawcanvas');
	var pjs = new Processing("drawcanvas");
	
	var saved = pjs.PImage;
	var currentFrame = 0;
	var frames=new Array(9);
	var totalFrames = frames.length;
	console.log(totalFrames);
	pjs.setup = function() {  
		pjs.size(500,500);  
		pjs.stroke(0);
		pjs.noSmooth();
		pjs.strokeWeight(5);
		frames[0] = pjs.get();
		frames[1] = pjs.get();
		frames[2] = pjs.get();
		frames[3] = pjs.get();
		frames[4] = pjs.get();
		frames[5] = pjs.get();
		frames[6] = pjs.get();
		frames[7] = pjs.get();
		frames[8] = pjs.get();
		frames[9] = pjs.get();
		
	};
	
	pjs.draw = function() {};
	
	pjs.mouseDragged = function() {  
		pjs.line(pjs.pmouseX,pjs.pmouseY,pjs.mouseX,pjs.mouseY);
	
	};
	
	pjs.keyPressed = function(){
	    console.log(pjs.key);
        
		if (pjs.key == 49) { switchFrame(0); };
		if (pjs.key == 50) { switchFrame(1); };
		if (pjs.key == 51) { switchFrame(2); };
		if (pjs.key == 52) { switchFrame(3); };
		if (pjs.key == 53) { switchFrame(4); };
		if (pjs.key == 54) { switchFrame(5); };
		if (pjs.key == 55) { switchFrame(6); };
		if (pjs.key == 56) { switchFrame(7); };
		if (pjs.key == 57) { switchFrame(8); };
		if (pjs.key == 48) { switchFrame(9); };
		
		if (pjs.key == pjs.CODED) {
		    if (pjs.keyCode == pjs.LEFT)    {prevFrame();}
		    if (pjs.keyCode == pjs.RIGHT)   {nextFrame();}
		};
		
	};
	
	switchFrame = function(framenum){
		console.log("Going to Frame "+framenum);
		frames[currentFrame] = pjs.get();
		pjs.image(frames[framenum],0,0);
		currentFrame = framenum;
	};
	
    prevFrame = function(){
        if (currentFrame == 0) {
            switchFrame(totalFrames);
        } else {
            switchFrame((currentFrame - 1));        
        };
        console.log(currentFrame);
    };
    
    nextFrame = function(){
        switchFrame((currentFrame + 1) % (totalFrames+1));
        console.log(currentFrame);
        
    };
    
	pjs.setup();  
});