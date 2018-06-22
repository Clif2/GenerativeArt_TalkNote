

let Particle = {
  init: function() {
    this.pos = createVector(random(width), random(height)) 
    this.vel = createVector(0,0) 
    this.acc = createVector(0,0)
    this.prevPos  = this.pos.copy()
    
    this.maxspeed = 4 
    this.color    = 0
    this.alpha    = 1  //change alpha of drawn particle here, look below for size 
  }, 
   
  follow: function(vectors) { 
    let x = floor(this.pos.x / SCL) 
    let y = floor(this.pos.y / SCL) 

    let index = x + y * cols
    let force = vectors[index]
    this.applyForce(force) 
  }, 

  update: function() { 
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }, 

  applyForce: function(force) {
    this.acc.add(force)
  }, 

  show: function() { 
    //stroke(0) 
    stroke(1, this.alpha) // change particle size here
    strokeWeight(4) 
    //point(this.pos.x, this.pos.y)
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y  
  }, 
	 
  edges: function() {
    let x = this.pos.x
    let y = this.pos.y 

    if (x > width)  x = 0 
    if (x < 0)      x = width 
    if (y > height) y = 0 
    if (y < 0)      y = height

    this.pos.x = x 
    this.pos.y = y 
   
    if (x == 0 || x == width){ 
    this.prevPos.x = this.pos.x
   }
 
    if (y == 0 || y == height){ 
    this.prevPos.y = this.pos.y
   }

  }
}


function createParticle() {
   let p = Object.create(Particle) 
   p.init()
   //console.log(p)
   return p
}
  
function randomColor(){
  let r = random(0, 255)
  let g = random(0, 255)
  let b = random(0, 255)
  let a = random(0, 255) 
  let c = color(r,g,b) 
  return  c
}

 
 
