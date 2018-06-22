
function createCanvas(canvasName) {
	let canvas = document.createElement('canvas')
	let body   = document.querySelector('body') 
	
	canvas.style.position = 'absolute'
	canvas.style.left     = '0px'
	canvas.style.top      = '0px'
	canvas.style.width    = '300px'
	canvas.style.height   = '300px'

	canvas.setAttribute('id', canvasName)
	body.appendChild(canvas) 
	
	let ctx = canvas.getContext('2d')
		
	return ctx	
}


