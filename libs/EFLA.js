// Extremely Fast Line Algorithm
// Created by Po-Han Lin http://www.edepot.com
// Modified from the Processing version by Owaun Scantlebury

void setPixel(int x,int y, PGraphics targetCanvas) {
    if (targetCanvas) {
       targetCanvas.set(x,y,color(window.leftColour[0],window.leftColour[1],window.leftColour[2]));        
    } else {
        set(x,y,color(window.leftColour[0],window.leftColour[1],window.leftColour[2]));
        frames[currentFrame].set(x,y,color(window.leftColour[0],window.leftColour[1],window.leftColour[2]));   
    };
}

void efLine(int x, int y, int x2, int y2, PGraphics targetCanvas) {
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
                setPixel(j >> 8,y,targetCanvas);   
                j+=decInc;
            }
            return;
        }
        longLen+=y;
        for (int j=0x80+(x<<8);y>=longLen;--y) {
            setPixel(j >> 8,y,targetCanvas);   
            j-=decInc;
        }
        return;
    }
    if (longLen>0) {
        longLen+=x;
        for (int j=0x80+(y<<8);x<=longLen;++x) {
            setPixel(x,j >> 8,targetCanvas);
            j+=decInc;
        }
        return;
    }
    longLen+=x;
    for (int j=0x80+(y<<8);x>=longLen;--x) {
        setPixel(x,j >> 8,targetCanvas);
        j-=decInc;
    }
}


// Bresenham's circle algorithm
// http://en.wikipedia.org/wiki/Midpoint_circle_algorithm

void bCircle(int x0, int y0, int radius, PGraphics targetCanvas){
  int f = 1 - radius;
  int ddF_x = 1;
  int ddF_y = -2 * radius;
  int x = 0;
  int y = radius;
  efLine(x0, y0 + radius,x0, y0 - radius,targetCanvas);
  efLine(x0 + radius, y0,x0 - radius, y0,targetCanvas);
  while(x < y){
    if(f >= 0){
      y--;
      ddF_y += 2;
      f += ddF_y;
    }
    x++;
    ddF_x += 2;
    f += ddF_x;    
    efLine(x0 + x, y0 + y,x0 - x, y0 + y,targetCanvas);
    efLine(x0 + x, y0 - y,x0 - x, y0 - y,targetCanvas);
    efLine(x0 + y, y0 + x,x0 - y, y0 + x,targetCanvas);
    efLine(x0 + y, y0 - x,x0 - y, y0 - x,targetCanvas);
  }
}

PGraphics leftBrush     = createGraphics(70,70);
PGraphics rightBrush    = createGraphics(70,70);

void setBrushWidth(int newLineWidth){
    lineWidth = newLineWidth;
    leftBrush = createGraphics(70,70);
    righBrush = createGraphics(70,70);
    
    buildBrush(leftBrush);
    buildBrush(rightBrush);
    console.log("EFLA Width:"+lineWidth);
    image(leftBrush,40,40);
    image(rightBrush,140,40);
}
void buildBrush(PGraphics brushToBuild){
    console.log(brushToBuild);
    brushToBuild.background(0,0,0,0);
    // Set special case square brush
    if (lineWidth == 2) {
        setPixel(35,35,brushToBuild);
        setPixel(36,35,brushToBuild);
        setPixel(35,36,brushToBuild);
        setPixel(36,36,brushToBuild);
    } else {
        bCircle(35,35,lineWidth-2,brushToBuild);    
    };
    // HACK
    brushToBuild.loadPixels();
    // END HACK
}


void drawBrush(x,y){
    imageMode(CENTER);
    frames[currentFrame].imageMode(CENTER);
    image(leftBrush,x,y);
    frames[currentFrame].image(leftBrush,x,y);
    imageMode(CORNER);
    frames[currentFrame].imageMode(CORNER);
}

void pencilLine(int x1,int y1,int x2,int y2){
    if(lineWidth == 1){
        efLine(x1,y1,x2,y2);
    } else {
        brushLine(x1,y1,x2,y2);
    }
}

void brushLine(int x, int y, int x2, int y2) {
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
                drawBrush(j >> 8,y,lineWidth);   
                j+=decInc;
            }
            return;
        }
        longLen += y;
        for (int j=0x80+(x<<8);y>=longLen;--y) {
            drawBrush(j >> 8,y,lineWidth);   
            j -= decInc;
        }
        return;
    }
    if (longLen>0) {
        longLen += x;
        for (int j=0x80+(y<<8);x<=longLen;++x) {
            drawBrush(x,j >> 8,lineWidth);
            j+=decInc;
        }
        return;
    }
    longLen += x;
    for (int j=0x80+(y<<8);x>=longLen;--x) {
        drawBrush(x,j >> 8,lineWidth);
        j-=decInc;
    }
}

