PGraphics floodCanvas = createGraphics(canvasWidth,canvasHeight);

void floodFill(int x,int y,int x2,int y2,int mouseBut){
    console.log("Flooding");
    floodCanvas = createGraphics(canvasWidth,canvasHeight);
    floodCanvas = frames[currentFrame].get();
	
	if (mouseBut == 0) {
		var floodColour = color(window.leftColour[0],window.leftColour[1],window.leftColour[2]);		
	} else {
		var floodColour = color(window.rightColour[0],window.rightColour[1],window.rightColour[2]);		
	}
	
	
    flood(
        new Vec2D(mouseX,mouseY),
        floodColour,
        floodCanvas.get(mouseX,mouseY)
    );
    floodCanvas.updatePixels();
    // image(floodCanvas,0,0);
    frames[currentFrame].image(floodCanvas);
    //switchFrame(currentFrame); < Undo not possible if we use this, so workaround is below
    redrawFrame(currentFrame);
    
    
}


void flood(Vec2D p, int col, int prevCol) {
    int xx,idx;
    int h1=height-1;
    boolean scanUp,scanDown;

    // don't run if fill colour the same as bg
    if(prevCol==col) return;
    var stack = new Array(); 

    try {
        while(p!=null) {
            xx = p.x;
            idx=p.y*width+xx;
            while(xx >= 0 && floodCanvas.pixels[idx] == prevCol) {
                xx--;
                idx--;
            }
            scanUp = scanDown = false;
            while(++xx < width && floodCanvas.pixels[++idx] == prevCol) {
                floodCanvas.pixels[idx] = col;
                if(!scanUp && p.y > 0 && floodCanvas.pixels[idx-width] == prevCol) {
                    stack.push(new Vec2D(xx, p.y-1));
                    scanUp = true;
                }
                else if(scanUp && p.y > 0 && floodCanvas.pixels[idx-width] != prevCol) {
                    scanUp = false;
                }
                if(!scanDown && p.y < h1 && floodCanvas.pixels[idx+width] == prevCol) {
                    stack.push(new Vec2D(xx, p.y+1));
                    scanDown = true;
                }
                else if(scanDown && p.y < h1 && floodCanvas.pixels[idx+width] != prevCol) {
                    scanDown = false;
                }
            }
            p=(Vec2D)stack.pop();
        }
    }
    catch(EmptyStackException e) {console.log("Exception");}
    catch(Exception e) {console.log("Exception");}
}

class Vec2D {
    public int x,y;

    Vec2D(int x,int y) {
        this.x=x;
        this.y=y;
    }
} 
