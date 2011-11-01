

    window.pjsin = Processing.getInstanceById("drawcanvas");
	var saved = PImage;
	var currentFrame = 0;
	var frames=new Array(10);
	var totalFrames = frames.length;
    var onionSkin = true;
    window.totalFramesForEncoder = totalFrames;
	$("#framenumber").attr("max",totalFrames-1);
	$("#framenumber").val(currentFrame);
	
    PGraphics testimg = createGraphics(500,500,RGB);
    
    font = loadFont("Courier-12.vlw"); 
    textFont(font); 
	
	void setup() {  
		size(500,500);  
		stroke(0);
		fill(0);
		strokeWeight(5);
		for (var i=0; i < frames.length; i++) {
            frames[i] = createGraphics(500,500,RGB);
            frames[i].strokeWeight(5);
		}
        noSmooth();
        
	};
	
	void draw() {
	    
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
    }
    