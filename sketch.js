
// gui params
var numXaxis = 20;
var numYaxis = 4;

// data
//var	invert = true;

var gui, gui2;

// dynamic parameters
var bigRadius;

var layout;
var overpannel;
var img;

function preload() {
	img=loadImage('assets/background.png');
}

function setup() {

  createCanvas(1400, 700);
  //imageMode(CORNER);
  // Calculate big radius
  //bigRadius = height / 3.0;

  layout= new LAYOUT();
  layout.intialize(numXaxis,numYaxis);
  // Create Layout GUI
  gui = createGui('Layout');
  sliderRange(0, 100, 1);
  gui.addGlobals('numXaxis', 'numYaxis');
/*
  // Create Shape GUI
  gui2 = createGui('Style', width - 220, 20);
  colorMode(HSB);
  sliderRange(0, 50, 1);
  gui2.addGlobals('shape', 'label', 'radius', 'drawFill', 'fillColor');
  sliderRange(0, 10, 0.1);
  gui2.addGlobals('drawStroke', 'strokeColor', 'strokeWidth');

  // Don't loop automatically
  
*/
//noLoop();
}


function draw() {
	// true false
	

	layout.display();
	//fill(50);
	//rect(0,0,500,500);
  // clear all
  //clear();
/*
	// set fill style
	if(drawFill) {
		fill(fillColor);
	} else {
	  noFill();
	}

	// set stroke style
	if(drawStroke) {
	  //stroke(strokeColor);
	  //strokeWeight(strokeWidth);
	} else {
	  //noStroke();
	}
*/
/*
	// draw circles arranged in a circle
	for(var i = 0; i < numShapes; i++) {

		var angle = TWO_PI / numShapes * i;
		var x = width / 2 + cos(angle) * bigRadius;
		var y = height / 2 + sin(angle) * bigRadius;
		var d = 2 * radius;

    // pick a shape
		switch(shape) {

		  case 'circle':
		    ellipse(x, y, d, d);
		    break;

		  case 'square':
		    rectMode(CENTER);
		    rect(x, y, d, d);
		    break;

		  case 'triangle':
		    ngon(3, x, y, d);
		    break;

		  case 'pentagon':
		    ngon(5, x, y, d);
		    break;

		  case 'star':
		    star(6, x, y, d/sqrt(3), d);
		    break;

		}

    // draw a label below the shape
		push();
		noStroke();
		fill(0);
		textAlign(CENTER);
		text(label, x, y + radius + 15);
		pop();

	}
	*/

}


// check for keyboard events

function mouseReleased(){
	//console.log('1');
	overpannel.clicked();
	if (layout.numx!=numXaxis || layout.numy!=numYaxis){
		layout.intialize(numXaxis,numYaxis)
	}
	/*
	if (invert){
		//layout.invert();
		//invert=false;
	}else{
		layout.invert();
		//invert=true;
	}
	*/
}


function LAYOUT(){
	this.numx;
	this.numy;
	this.pw;
	this.ph;
	this.pannels=[];

	

	this.intialize = function(numx,numy){
		
		this.numx=numx;
		this.numy=numy;
		this.pw=width/this.numx;
		this.ph=height/this.numy;
		this.pannels=[];
		for(let i=0;i<numy;i+=1){
			for(let j=0;j<numx;j+=1){
				this.pannels.push(new PANNEL(j*this.pw,i*this.ph,this.pw,this.ph));
			}
		}
		
	}
	this.invert=function(){
		this.pannels.forEach(function(v,i){
			//console.log(i);
			if(v.hidden){
				v.hidden=false;
			}else{
				v.hidden=true;
			}
		});
	}
	this.display = function(){
		//stroke(150,0,0);
		background(img);
		this.pannels.forEach(function(v,i){
			//console.log(i);
			v.display();
		});

	}
}

function PANNEL(x,y,w,h){

	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.over=false;
	this.hidden=false;

	this.clicked = function(){
		if(this.hidden){
			this.hidden=false;
		}else{
			this.hidden=true;
		}
	}
	this.panelEvent = function(){
	  stroke(150,0,0);
	  if (this.hidden){
        fill(0,0);  
          
      }else{
      	fill(255,255);
      }

    //else{
      this.over = collidePointRect(mouseX,mouseY,this.x,this.y,this.w, this.h);
      
      
      if (this.over){
        fill(80,100);  
        overpannel=this;
        //console.log(this.x);  
      }else{
      
      }
  }
	this.display = function(){
		
		//console.log(this.x);
		this.panelEvent();
		
		rect(this.x+1,this.y+1,this.w-2,this.h-2);

	}
}