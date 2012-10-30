
    window.pjsin = Processing.getInstanceById("drawcanvas");

	canvasWidth  = 450;
	canvasHeight = 450;

	clipboard       = createGraphics(canvasWidth,canvasHeight,RGB);
	undo            = createGraphics(canvasWidth,canvasHeight,RGB);
	undoPossible    = false;
	
    window.leftColour  = [0,0,0];
    window.rightColour = [204,204,204];
    
    lineWidth = $('#size').val();
    
    

	void setup(){  
		stroke(0);
		fill(0);
		strokeWeight(5);
        init(canvasWidth,canvasHeight,5);
        setStrokeWeight(lineWidth);
	};
	
	void draw() {
	    
	};

    void init(initWidth,initHeight,animationLength){
		canvasWidth  = initWidth;
		canvasHeight = initHeight;
		
		size(canvasWidth,canvasHeight);  
		
		clipboard       = createGraphics(canvasWidth,canvasHeight,RGB);
		undo            = createGraphics(canvasWidth,canvasHeight,RGB);
		
	
        console.log("New Gif with "+animationLength+" frames");
        currentFrame = 0;
        frames= null;
        console.log(animationLength);
    	frames=new Array(animationLength);
    	console.log(frames);
        onionSkin = $('#onionSkin').is(":checked");
    	totalFrames = frames.length;
    	console.log(totalFrames);
        window.totalFramesForEncoder = totalFrames;
    	$("#framenumber").attr("max",totalFrames-1);
    	$("#framenumber").val(currentFrame);  
    	for (var i=0; i < frames.length; i++) {
            frames[i] = createGraphics(canvasWidth,canvasHeight,RGB);
            frames[i].background(rightColour[0],rightColour[1],rightColour[2]);
            frames[i].strokeWeight(5);
            frames[i].stroke(0);
            frames[i].fill(255,0,0);
            frames[i].text("Frame "+i, 20, 20); 
            frames[i].fill(0,0,0);
		}
        switchFrame(0);      
    }
    
    void resetFrameData(targetFrame){
    	totalFrames = frames.length;
        window.totalFramesForEncoder = totalFrames;
    	$("#framenumber").attr("max",totalFrames-1);
    	$("#framenumber").val(currentFrame);  
		if(targetFrame < 0){
			switchFrame(0);      
		} else {
			switchFrame(targetFrame); 
		}
        
    };
    
    void addFrame(){
        console.log("Frames before addition:"+frames.length);
        framesBefore    = frames.splice(0,parseInt(currentFrame)+1);		
        framesAfter     = frames.splice(0,frames.length);
        framesBefore.push(null);
        framesBefore[framesBefore.length-1] = createGraphics(canvasWidth,canvasHeight,RGB);
        framesBefore[framesBefore.length-1].background(rightColour[0],rightColour[1],rightColour[2]);
        framesBefore[framesBefore.length-1].strokeWeight(5);
        framesBefore[framesBefore.length-1].stroke(0);
        framesBefore[framesBefore.length-1].fill(255,0,0);
        framesBefore[framesBefore.length-1].text("NEW Frame", 20, 20); 
        framesBefore[framesBefore.length-1].fill(0,0,0);
        framesCombined  = framesBefore.concat(framesAfter);
		frames = framesCombined;
        console.log("Frames after addition :"+frames.length);
        resetFrameData(parseInt(currentFrame)+1);
    };
    
    void removeFrame(){
        if(frames.length > 1){
            console.log("Frames before deletion:"+frames.length);
    		framesBefore    = frames.splice(0,currentFrame);
    		framesAfter     = frames.splice(1,frames.length);
    		framesCombined  = framesBefore.concat(framesAfter);
            frames = framesCombined;
            console.log("Frames after deletion :"+frames.length);
            resetFrameData(currentFrame - 1);
        }
    };
	   	
	var mouseClickTool = pencilLine;
	var mouseDragTool  = pencilLine;
	//var toolArray = [pencilLine,floodFill,inkDropper];
	void setTool(int tool){
		switch(tool){
			case 0:
				console.log("Paint");
				mouseClickTool = pencilLine;
				mouseDragTool  = pencilLine;
			break;
			case 1:
				console.log("Fill");
				mouseClickTool = floodFill;
				mouseDragTool  = null;
			break;
			case 2:
				console.log("InkDropper");
				mouseClickTool = inkDropper;
				mouseDragTool  = inkDropper;
			break;
		default:
			mouseClickTool = pencilLine;
			mouseDragTool  = pencilLine;
		}
	}
	
	void mousePressed() {
        saveUndoState();
        if(mouseButton == LEFT)   {mouseClickTool(mouseX,mouseY,mouseX,mouseY,0);   };
        if(mouseButton == RIGHT)  {mouseClickTool(mouseX,mouseY,mouseX,mouseY,1);   };
    };
    
    void mouseReleased(){
        // HACK
        frames[currentFrame].loadPixels();
        // END HACK
		redrawFrame(currentFrame); // Redraw Onion Skin
    }
	
	void mouseDragged() {  
        if(mouseButton == LEFT)   {mouseDragTool(pmouseX,pmouseY,mouseX,mouseY,0);   };
        if(mouseButton == RIGHT)  {mouseDragTool(pmouseX,pmouseY,mouseX,mouseY,1);   };
	};
	
	void keyPressed() {
        // console.log(key);
        // +
        if (key == 61) { $('#size').val(parseInt($('#size').val())+1).change();
	 		setStrokeWeight(parseInt($('#size').val())); 
		};
        // -
        if (key == 45) { $('#size').val(parseInt($('#size').val())-1).change();
			setStrokeWeight(parseInt($('#size').val())); 
		};
        // c
		if (key == 99) { clipboardCopy(); };
        // p
        if (key == 112) { clipboardPaste(); };
        // z
        if (key == 122) { retrieveUndoState(); };
        // b
        if (key == 98) { $('#tool_paint').click(); };
        // i
        if (key == 105) { $('#tool_ink').click(); };
        // f
        if (key == 102) { $('#tool_fill').click(); };
		// r
		if (key == 114) { $('#leftColour').miniColors('value',hex(color(random(255),random(255),random(255)),6))};

		if (key == CODED) {
		    if (keyCode == LEFT)    {prevFrame();}
		    if (keyCode == RIGHT)   {nextFrame();}
		};
		
	};
	
	void switchFrame(framenum){
        gotoFrame(framenum);
        $("#framenumber").val(currentFrame);
        
	};
	
	void gotoFrame(framenum){
	    undoPossible = false;
		image(frames[framenum],0,0);
		if (onionSkin) {
            tint(255, 50);
            image(frames[getOnionFrame(framenum)],0,0);
    		noTint();		    
		};
		currentFrame = framenum;
        $('label[for="framenumber"]').text("Frame "+currentFrame);
	};
	
	// Duplicate of code in above function, for floodfill
	void redrawFrame(framenum){
	    image(frames[framenum],0,0);
		if (onionSkin) {
            tint(255, 50);
            image(frames[getOnionFrame(framenum)],0,0);
    		noTint();		    
		};
	}
	
    void getOnionFrame(frame){
        if (frame != 0) {
            return frame - 1;
        } else {
            return totalFrames - 1;
        };
    }

    void getMotionBlurFrame(target){
        if (frame-target < 1) {
            return totalFrames - target;
        } else {
            return frame - target;
        };
    }
	

	void whatsLastFrame(){
	    if (currentFrame == 0) {
            return totalFrames-1;
        } else {
            return currentFrame - 1;        
        };
	}
	
    void prevFrame(){
        if (currentFrame == 0) {
            switchFrame(totalFrames-1);
        } else {
            switchFrame((currentFrame - 1));        
        };
    };
    
    void nextFrame(){ switchFrame((currentFrame + 1) % (totalFrames)); };

//
//	Tools
//    


    void setOnionSkin(value){
        onionSkin = value;
        gotoFrame(currentFrame);
        console.log("Onion Skin: "+onionSkin);
    };
    
    void setStrokeWeight(value){
        console.log("Setting Stroke to:"+value);
        strokeWeight(value);
        for (var i=0; i < frames.length; i++) {
            frames[i].strokeWeight(value);
        }
        setBrushWidth(parseInt(value));
    };

    void setStrokeColour(R,G,B){
        setBrushWidth(parseInt(lineWidth));
        // stroke(R,G,B);
        // for (var i=0; i < frames.length; i++) {
        //     frames[i].stroke(R,G,B);
        // }
    };
    
    void inkDropper(int x,int y,int x2, int y2, int mouseBut){
        grabbed = get(x,y);
		if (mouseBut == 0) {
	        $('#leftColour').miniColors('value',hex(grabbed,6));			
		} else {
	        $('#rightColour').miniColors('value',hex(grabbed,6));					
		}
        
    };

	void clipboardCopy(){
		console.log("Copied");
        clipboard = frames[currentFrame].get();
	};
      
  	void clipboardPaste(){
		console.log("Pasted");
		frames[currentFrame].image(clipboard);
        switchFrame(currentFrame);
	};
	
	void saveUndoState(){
	    console.log("Undo State Saved");
        undo = frames[currentFrame].get();
        undoPossible = true;
	};
	
	void retrieveUndoState(){
	    if (undoPossible) {
    		frames[currentFrame].image(undo);
    		switchFrame(currentFrame);	    	        
	    } else {
	        console.log("Can't Undo");
	    };
		undoPossible = false;
	}
	
// 
//	Importing
//

PImage importedImage;
void importImg(uri){
	console.log("Importing Image");
	importedImage = loadImage(uri, null, function(){
		
	    frames[currentFrame].imageMode(CENTER);	    
	    frames[currentFrame].image(importedImage,canvasWidth/2,canvasHeight/2);
	    frames[currentFrame].imageMode(CORNER);
	    redrawFrame(currentFrame);
	});	
}

	
