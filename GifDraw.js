    window.pjsin = Processing.getInstanceById("drawcanvas");
    // font = loadFont("Courier-12.vlw"); 
    // textFont(font); 

	canvasWidth  = 450;
	canvasHeight = 450;

	clipboard   = createGraphics(canvasWidth,canvasHeight,RGB);
	undo        = createGraphics(canvasWidth,canvasHeight,RGB);
	undoPossible  = false;
	
    window.leftColour  = [0,0,0];
    window.rightColour = [204,204,204];
    

	void setup(){  
		size(canvasWidth,canvasHeight);  
		stroke(0);
		fill(0);
		strokeWeight(5);
        init(5);
	};
	
	void draw() {
	    
	};

    void init(animationLength){
        console.log("New Gif with "+animationLength+" frames");
        currentFrame = 0;
        frames= null;
        console.log(animationLength);
    	frames=new Array(animationLength);
    	console.log(frames);
        onionSkin = true;
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
    	console.log(totalFrames);
        window.totalFramesForEncoder = totalFrames;
    	$("#framenumber").attr("max",totalFrames-1);
    	$("#framenumber").val(currentFrame);  
        switchFrame(targetFrame);      
    };
    
    void addFrame(){
        console.log("Frames before addition:"+frames.length);
        framesBefore    = frames.splice(0,parseInt(currentFrame)+1);		
        framesAfter     = frames.splice(0,frames.length);
        framesBefore.push(null);
        framesBefore[framesBefore.length-1] = createGraphics(canvasWidth,canvasHeight,RGB);
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
	   	
	void mousePressed() {
        saveUndoState();
      if(mouseButton == LEFT)   {setStrokeColour(window.leftColour[0],window.leftColour[1],window.leftColour[2])};
      if(mouseButton == RIGHT)  {setStrokeColour(window.rightColour[0],window.rightColour[1],window.rightColour[2])};
      point(mouseX, mouseY);
      
    };
    
	
	void mouseDragged() {  
      if(mouseButton == LEFT)   {setStrokeColour(window.leftColour[0],window.leftColour[1],window.leftColour[2])};
      if(mouseButton == RIGHT)  {setStrokeColour(window.rightColour[0],window.rightColour[1],window.rightColour[2])};
		line(pmouseX,pmouseY,mouseX,mouseY);
        frames[currentFrame].beginDraw();
		frames[currentFrame].line(pmouseX,pmouseY,mouseX,mouseY);
        frames[currentFrame].endDraw();
        console.log(mouseX);
	};
	
	void keyPressed() {
	    console.log(key);
        // +
        if (key == 61) { $('#size').val(parseInt($('#size').val())+1).change(); };
        // -
        if (key == 45) { $('#size').val(parseInt($('#size').val())-1).change(); };
        // c
		if (key == 99) { clipboardCopy(); };
        // p
        if (key == 112) { clipboardPaste(); };
        // z
        if (key == 122) { retrieveUndoState(); };
		
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
	    console.log("Going to Frame "+framenum);
		image(frames[framenum],0,0);
		if (onionSkin) {
            tint(255, 50);
            image(frames[getOnionFrame(framenum)],0,0);
    		noTint();		    
		};
		currentFrame = framenum;
        $('label[for="framenumber"]').text("Frame "+currentFrame);
        
	};
	
	void getOnionFrame(frame){
	    if (frame != 0) {
	        return frame - 1;
	    } else {
	        return totalFrames - 1;
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
    };

    void setStrokeColour(R,G,B){
        console.log("Setting Colour to:"+R+","+G+","+B);
        stroke(R,G,B);
        for (var i=0; i < frames.length; i++) {
            frames[i].stroke(R,G,B);
        }
    };

	void clipboardCopy(){
		console.log("Copied");
        clipboard = frames[currentFrame].get();
	};
      
  	void clipboardPaste(){
		console.log("Pasted");
	};
	
	void saveUndoState(){
        undo = frames[currentFrame].get();
        undoPossible = true;
	}
	
	void retrieveUndoState(){
	    if (undoPossible) {
    		frames[currentFrame].image(undo);
    		switchFrame(currentFrame);	    	        
	    } else {
	        console.log("Can't Undo");
	    };
		undoPossible = false;
	}