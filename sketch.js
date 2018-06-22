// Play with these settting :) 
const INC      = 0.1  // distance between noise values each draw cycle, lower = closer  
const SCL      = 20     // scale of cells in 2d space, lower = more 
const NUMP     = 500    //number of particles 
const MAG      = 4      // magnitude of vector in vector field  
const ANGLEMOD = 2      //multiples angle used for flowfield vector, adds some more intrest 
const TIMEMOD  = 0.001  //how fast vectors will change 
const DURATION = 1200   //number of frames drawn  

let cols, row, fr, flowField, settings
let xoff, yoff
let zoff         = 0 
let frame        = 0 
let particlePool = []

function setup() {
  createCanvas(600,600) 
  cols = floor(width / SCL) 
  rows = floor(height / SCL)
  fr = createP('FPS: ') 
  settings = createP('increment: ' + INC + ' scale: ' + SCL)  
 
  //populating particles 
  for (let i = 0; i < NUMP; i++) {  
    particlePool[i] = createParticle()
  }
  //creating flow field array with indexes for each cell 
  flowField = new Array(rows * cols)
  background(255)
}

function draw() { 
  
  //end draw loop after set duration 
  if (frame > DURATION) {
   noLoop() 
   createP('DONE')
  }  


  stroke(0)
  strokeWeight(1) 
  
  //background(255)
  //background(255,255,255,0.1)
  
  //showGrid() 
  addVectorsToField()
  drawParticles(flowField, particlePool) 

  frame++
  fr.html(floor(frameRate()))

}

function drawParticles(flowfield, particlepool) {  
  for (particle of particlePool) { 
    particle.follow(flowField)
    particle.update()
    particle.edges() 
    particle.show()
  } 
} 

function addVectorsToField() {
  yoff = 0 
  for (let y = 0; y < rows; y++) {
    xoff = 0 
    for (let x = 0; x < cols; x++) {
    let angle, idx, v 
      angle = noise(xoff, yoff, zoff) * TWO_PI
      v = p5.Vector.fromAngle(angle) 
      v.setMag(MAG) 

      idx = x + y * cols
      flowField[idx] = v 
    //  showFieldVector(x,y,v)  
    
      xoff += INC
    }
  yoff += INC
  zoff += TIMEMOD
  }
}

function showFieldVector(x, y, v) {
  push()
  translate(x * SCL, y * SCL) 
  rotate(v.heading()) 
  line(0, 0, SCL/2, 0)
  line(SCL/2, 0, SCL/4, SCL/8 )
  line(SCL/2, 0, SCL/4, -SCL/8 )
  pop()  
}

function showGrid() {
  push() 
  stroke(1, 50)
  for (let v = 0; v <= width ; v += SCL) {
    line(v, 0, v, height)
  } 
  for (let h = 0; h <= height ; h += SCL) {
   line(0, h, width, h)
  }
  pop()
}
