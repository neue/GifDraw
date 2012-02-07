// Extremely Fast Line Algorithm
// Created by Po-Han Lin http://www.edepot.com
// Modified from the Processing version by Owaun Scantlebury

void setPixel(int x,int y) {
  set(x,y,color(0,0,0));
}

void efLine(int x, int y, int x2, int y2) {
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
                setPixel(j >> 8,y);   
                j+=decInc;
            }
            return;
        }
        longLen+=y;
        for (int j=0x80+(x<<8);y>=longLen;--y) {
            setPixel(j >> 8,y);   
            j-=decInc;
        }
        return;
    }
    if (longLen>0) {
        longLen+=x;
        for (int j=0x80+(y<<8);x<=longLen;++x) {
            setPixel(x,j >> 8);
            j+=decInc;
        }
        return;
    }
    longLen+=x;
    for (int j=0x80+(y<<8);x>=longLen;--x) {
        setPixel(x,j >> 8);
        j-=decInc;
    }
}


void setup(){
  size(500,500);
  background(200,200,200);
  
  ellipseMode(CENTER);
  
  
}

void draw(){
    color(255,255,255);
    // noStroke();
    
}

// Bresenham's circle algorithm
// http://en.wikipedia.org/wiki/Midpoint_circle_algorithm

void bCircle(int x0, int y0, int radius){
  int f = 1 - radius;
  int ddF_x = 1;
  int ddF_y = -2 * radius;
  int x = 0;
  int y = radius;
 
  // setPixel(x0, y0 + radius);
  // setPixel(x0, y0 - radius);
  efLine(x0, y0 + radius,x0, y0 - radius);
  
  // setPixel(x0 + radius, y0);
  // setPixel(x0 - radius, y0);
  efLine(x0 + radius, y0,x0 - radius, y0);
  
 
  while(x < y)
  {
    // ddF_x == 2 * x + 1;
    // ddF_y == -2 * y;
    // f == x*x + y*y - radius*radius + 2*x - y + 1;
    if(f >= 0) 
    {
      y--;
      ddF_y += 2;
      f += ddF_y;
    }
    x++;
    ddF_x += 2;
    f += ddF_x;    
    // setPixel(x0 + x, y0 + y);
    // setPixel(x0 - x, y0 + y);
    efLine(x0 + x, y0 + y,x0 - x, y0 + y);
    
    // setPixel(x0 + x, y0 - y);
    // setPixel(x0 - x, y0 - y);
    efLine(x0 + x, y0 - y,x0 - x, y0 - y);
    
    // setPixel(x0 + y, y0 + x);
    // setPixel(x0 - y, y0 + x);
    efLine(x0 + y, y0 + x,x0 - y, y0 + x);
    
    // setPixel(x0 + y, y0 - x);
    // setPixel(x0 - y, y0 - x);
    efLine(x0 + y, y0 - x,x0 - y, y0 - x);
    
  }
}

void mouseDragged(){
    paintLine(pmouseX, pmouseY,mouseX,mouseY);
}

void mousePressed() {
    bCircle(mouseX,mouseY,lineWidth);   
    console.log(PGraphics);
}



int lineWidth = 5;

void keyPressed() {
    if (key == 61) { lineWidth = lineWidth + 1;};
    if (key == 45) { lineWidth = lineWidth - 1;};
    if (lineWidth <= 0) { lineWidth = 1 };
    console.log(lineWidth);
}


void paintLine(int x, int y, int x2, int y2) {
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
                bCircle(j >> 8,y,lineWidth);   
                j+=decInc;
            }
            return;
        }
        longLen+=y;
        for (int j=0x80+(x<<8);y>=longLen;--y) {
            bCircle(j >> 8,y,lineWidth);   
            j-=decInc;
        }
        return;
    }
 
    if (longLen>0) {
        longLen+=x;
        for (int j=0x80+(y<<8);x<=longLen;++x) {
            bCircle(x,j >> 8,lineWidth);
            j+=decInc;
        }
        return;
    }
    longLen+=x;
    for (int j=0x80+(y<<8);x>=longLen;--x) {
        bCircle(x,j >> 8,lineWidth);
        j-=decInc;
    }
 
}

