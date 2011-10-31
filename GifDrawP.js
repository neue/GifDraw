	var saved = PImage;
	var currentFrame = 0;
	var frames=new Array(10);
	var totalFrames = frames.length;
	console.log(totalFrames);
	void setup() {  
		size(500,500);  
		stroke(0);
		noSmooth();
		strokeWeight(5);
		
		for (var i=0; i < frames.length; i++) {
		  frames[i] = get();
		  console.log(i);
		}
		
	};
	
	void draw() {};
	
	void mouseDragged() {  
		line(pmouseX,pmouseY,mouseX,mouseY);
	
	};
	
	void keyPressed() {
	    console.log(key);
        
		if (key == "0") { switchFrame(0); };
		if (key == "1") { switchFrame(1); };
		if (key == "2") { switchFrame(2); };
		if (key == "3") { switchFrame(3); };
		if (key == "4") { switchFrame(4); };
		if (key == "5") { switchFrame(5); };
		if (key == "6") { switchFrame(6); };
		if (key == "7") { switchFrame(7); };
		if (key == "8") { switchFrame(8); };
		if (key == "9") { switchFrame(9); };
		
		if (key == CODED) {
		    if (keyCode == LEFT)    {prevFrame();}
		    if (keyCode == RIGHT)   {nextFrame();}
		};
		
	};
	
	void switchFrame(framenum){
		console.log("Going to Frame "+framenum);
		frames[currentFrame] = get();
		image(frames[framenum],0,0);
        tint(255,100);
		image(frames[whatsLastFrame()],0,0);
		noTint();
		
		currentFrame = framenum;
	};
	
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
        console.log(currentFrame);
    };
    
    void nextFrame(){
        switchFrame((currentFrame + 1) % (totalFrames));
        console.log(currentFrame);
        
    };