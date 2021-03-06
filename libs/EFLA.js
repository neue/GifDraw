// Extremely Fast Line Algorithm
// Created by Po-Han Lin http://www.edepot.com
// Modified from the Processing version by Owaun Scantlebury

void setPixel(int x,int y, PGraphics targetCanvas, int R, int G, int B) {
    if (targetCanvas) {
       targetCanvas.set(x,y,color(R,G,B));        
    } else {
        set(x,y,color(R,G,B));
        frames[currentFrame].set(x,y,color(R,G,B));   
    };
}

void efLine(int x, int y, int x2, int y2, PGraphics targetCanvas, int R, int G, int B) {
    boolean yLonger=false;
    int shortLen=y2-y;
    int longLen=x2-x;
    if (abs(shortLen)>abs(longLen)) {
        int swap=shortLen;
        shortLen=longLen;
        longLen=swap;              
        yLonger=true;
    }
    int decInc;
    if (longLen==0) {decInc=0;}
    else{ decInc = (shortLen << 8) / longLen;}
    if (yLonger) {
        if (longLen>0) {
            longLen+=y;
            for (int j=0x80+(x<<8);y<=longLen;++y) {
                setPixel(j >> 8,y,targetCanvas,R,G,B);   
                j+=decInc;
            }
            return;
        }
        longLen+=y;
        for (int j=0x80+(x<<8);y>=longLen;--y) {
            setPixel(j >> 8,y,targetCanvas,R,G,B);   
            j-=decInc;
        }
        return;
    }
    if (longLen>0) {
        longLen+=x;
        for (int j=0x80+(y<<8);x<=longLen;++x) {
            setPixel(x,j >> 8,targetCanvas,R,G,B);
            j+=decInc;
        }
        return;
    }
    longLen+=x;
    for (int j=0x80+(y<<8);x>=longLen;--x) {
        setPixel(x,j >> 8,targetCanvas,R,G,B);
        j-=decInc;
    }
}


// Bresenham's circle algorithm
// http://en.wikipedia.org/wiki/Midpoint_circle_algorithm

void bCircle(int x0, int y0, int radius, PGraphics targetCanvas, int R, int G, int B){
  int f = 1 - radius;
  int ddF_x = 1;
  int ddF_y = -2 * radius;
  int x = 0;
  int y = radius;
  efLine(x0, y0 + radius,x0, y0 - radius,targetCanvas,R,G,B);
  efLine(x0 + radius, y0,x0 - radius, y0,targetCanvas,R,G,B);
  while(x < y){
    if(f >= 0){
      y--;
      ddF_y += 2;
      f += ddF_y;
    }
    x++;
    ddF_x += 2;
    f += ddF_x;    
    efLine(x0 + x, y0 + y,x0 - x, y0 + y,targetCanvas,R,G,B);
    efLine(x0 + x, y0 - y,x0 - x, y0 - y,targetCanvas,R,G,B);
    efLine(x0 + y, y0 + x,x0 - y, y0 + x,targetCanvas,R,G,B);
    efLine(x0 + y, y0 - x,x0 - y, y0 - x,targetCanvas,R,G,B);
  }
}

PGraphics leftBrush     = createGraphics(70,70);
PGraphics rightBrush    = createGraphics(70,70);

void setBrushWidth(int newLineWidth){
    lineWidth = newLineWidth;
    leftBrush = createGraphics(70,70);
    rightBrush = createGraphics(70,70);
    
    buildBrush(leftBrush,window.leftColour[0],window.leftColour[1],window.leftColour[2]);
    buildBrush(rightBrush,window.rightColour[0],window.rightColour[1],window.rightColour[2]);
}
void buildBrush(PGraphics brushToBuild, int R, int G, int B){
    brushToBuild.background(0,0,0,0);
    // Set special case square brush
    if (lineWidth == 2) {
        setPixel(35,35,brushToBuild,R,G,B);
        setPixel(36,35,brushToBuild,R,G,B);
        setPixel(35,36,brushToBuild,R,G,B);
        setPixel(36,36,brushToBuild,R,G,B);
    } else {
        bCircle(35,35,lineWidth-2,brushToBuild,R,G,B);    
    };
    // HACK
    brushToBuild.loadPixels();
    // END HACK
}


void drawBrush(x,y,PGraphics brushCanvas){
	    imageMode(CENTER);
	    frames[currentFrame].imageMode(CENTER);
	    image(brushCanvas,x,y);
	    frames[currentFrame].image(brushCanvas,x,y);
	    imageMode(CORNER);
	    frames[currentFrame].imageMode(CORNER);
}

void pencilLine(int x1,int y1,int x2,int y2, int mouseBut){
    if(mouseBut == 0) {
        if(lineWidth == 1){
            efLine(x1,y1,x2,y2,null,window.leftColour[0],window.leftColour[1],window.leftColour[2]);
        } else {
            brushLine(x1,y1,x2,y2,leftBrush);
        }
    } else {
        if(lineWidth == 1){
            efLine(x1,y1,x2,y2,null,window.rightColour[0],window.rightColour[1],window.rightColour[2]);
        } else {
            brushLine(x1,y1,x2,y2,rightBrush);
        }    
    };
}

// DEBUG
void distance(int x, int y, int x2, int y2){
	double a = x - x2;
	double b = y - y2;
	double distance = Math.sqrt(a * a + b * b);
	return distance;
}

// EFLA
void brushLine(int x, int y, int x2, int y2, PGraphics brushCanvas) {
	
    boolean yLonger = false;
    int shortLen = y2-y;
    int longLen = x2-x;
    if (abs(shortLen)>abs(longLen)) {
        int swap = shortLen;
        shortLen = longLen;
        longLen = swap;              
        yLonger = true;
    }
    int decInc;
    if (longLen == 0) {decInc=0;}
    else{ decInc = (shortLen << 8) / longLen;}
    if (yLonger) {
        if (longLen>0) {
            longLen += y;
            for (int j=0x80+(x<<8);y<=longLen;++y) {
                drawBrush(j >> 8,y,brushCanvas);   
                j+=decInc;
            }
            return;
        }
        longLen += y;
        for (int j=0x80+(x<<8);y>=longLen;--y) {
            drawBrush(j >> 8,y,brushCanvas);   
            j -= decInc;
        }
        return;
    }
    if (longLen>0) {
        longLen += x;
        for (int j=0x80+(y<<8);x<=longLen;++x) {
            drawBrush(x,j >> 8,brushCanvas);
            j+=decInc;
        }
        return;
    }
    longLen += x;
    for (int j=0x80+(y<<8);x>=longLen;--x) {
        drawBrush(x,j >> 8,brushCanvas);
        j-=decInc;
    }



}


// DDA Line
void brushLineDDA(int x1, int y1, int x2, int y2, PGraphics brushCanvas) {
  int length,i;
  double x,y;
  double xincrement;
  double yincrement;
  console.log("hello");
  length = abs(x2 - x1);
  if (abs(y2 - y1) > length) length = abs(y2 - y1);
  xincrement = (double)(x2 - x1)/(double)length;
  yincrement = (double)(y2 - y1)/(double)length;
  x = x1 + 0.5; 
  y = y1 + 0.5;
  for (i = 1; i<= length;++i) {
     drawBrush(x,y,brushCanvas);
     x = x + xincrement;
     y = y + yincrement;
  }

}

// Bresenhams

void brushLineBresenhams(int x0, int y0, int x1, int y1, PGraphics brushCanvas) {
	int error;
	int dx = x1 - x0;
	int dy = y1 - y0;
	int yi = 1;
	if( dx < dy ){
		x0 ^= x1; x1 ^= x0; x0 ^= x1;
		y0 ^= y1; y1 ^= y0; y0 ^= y1;
	}
 
	if( dx < 0 ){
		dx = -dx; yi = -yi;
	}
 
	if( dy < 0 ){
		dy = -dy; yi = -yi;
	}
 
	if( dy > dx ){
		error = -( dy >> 1 );
		for( ; y1 < y0 ; y1++ )	{
			drawBrush(x1,y1,brushCanvas);
			error += dx;
			if( error > 0 ){
				x1 += yi;
				error -= dy;
			}
		}
	} else {
		error = -( dx >> 1 );
 
		for( ; x0 < x1 ; x0++ ) {
			drawBrush(x0,y0,brushCanvas);
			error += dy;
			if( error > 0 ) {
				y0 += yi;
				error -= dx;
			}
		}
	}
}

