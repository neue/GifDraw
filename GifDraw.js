    window.pjsin = Processing.getInstanceById("drawcanvas");
    // font = loadFont("Courier-12.vlw"); 
    // textFont(font); 

    void init(animationLength){
        console.log("New Gif with "+animationLength+" frames");
        currentFrame = 0;
        frames= null;
        console.log(animationLength);
    	frames=new Array(animationLength);
    	console.log(frames);
    	totalFrames = frames.length;
    	console.log(totalFrames);
        onionSkin = true;
        window.totalFramesForEncoder = totalFrames;
    	$("#framenumber").attr("max",totalFrames-1);
    	$("#framenumber").val(currentFrame);  
    	for (var i=0; i < frames.length; i++) {
            frames[i] = createGraphics(450,450,RGB);
            frames[i].strokeWeight(5);
            frames[i].stroke(0);
            frames[i].fill(255,0,0);
            frames[i].text("Frame "+i, 20, 40); 
		}
        switchFrame(0);      
    }
	    

	void setup() {  
		size(450,450);  
		stroke(0);
		fill(0);
		strokeWeight(5);
        init(20);
	};
	
	void draw() {
	    
	};
	
	void mousePressed() {
      if(mouseButton == LEFT)   {setStrokeColour(0,0,0)};
      if(mouseButton == RIGHT)  {setStrokeColour(204,204,204)};
    };
    
	
	void mouseDragged() {  
		line(pmouseX,pmouseY,mouseX,mouseY);
        frames[currentFrame].beginDraw();
		frames[currentFrame].line(pmouseX,pmouseY,mouseX,mouseY);
        frames[currentFrame].endDraw();
	};
	
	void keyPressed() {
	    console.log(key);
		if (key == 97) {
            image(testimg,0,0);
		};
		
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
	    console.log("Going to Frame "+framenum);
        // frames[currentFrame] = get();
		image(frames[framenum],0,0);
		if (onionSkin) {
            tint(255, 50);
            image(frames[getOnionFrame(framenum)],0,0);
    		noTint();		    
		};
		currentFrame = framenum;
        text("Frame "+currentFrame, 20, 20); 
	};
	
	void getOnionFrame(frame){
	    if (frame != 0) {
	        return frame - 1;
	    } else {
	        return 0;
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
    
    void nextFrame(){
        switchFrame((currentFrame + 1) % (totalFrames));
    };
    
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
        