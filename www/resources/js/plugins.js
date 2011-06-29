window.log = function(){
  log.history = log.history || [];  
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

// FWA Plugins // 
var FWA = FWA || {};

/*
 * FWA.drawCircle(ctx, props)
 * 
 * description: draws a circle on a canvas
 * param: ctx - a context of a canvas object
 * param: props - a generic object populated with properties needed to draw a circle
 * 	ex: {x:5, y:5, radius:10, fill:"#FF0000", stroke:"#000"}
 *  note: x, y, radius are required.
 *
 */
FWA.drawCircle = function(ctx, props){
	// optional props
	var fill = props.fill;
	var stroke = props.stroke;
	var alpha = props.alpha;

	if(fill) ctx.fillStyle = fill;
	if(stroke) ctx.stroke = stroke;
	
	ctx.arc(props.x, props.y, props.radius, 0, Math.PI*2, true);
	
	if(fill) ctx.fill();
	if(stroke) ctx.stroke();

	// reset path
	ctx.beginPath();
}

/*
 * FWA.randomColor
 *
 * description: returns a random color from a range
 * param: center - where the sin wave is located 
 * param: width - the length of the sin wave
 * param: freq - the frequency of the sin wave
 * inspiration: http://www.krazydad.com/makecolors.php
 *
 */
FWA.randomRGB = function(center, width, freq) {
	var i = Math.floor(Math.random() * 32);
	var freq = freq || 0.3;
	var center = center || 128;
	var width = width || 127;

	red   = Math.floor(Math.sin(freq*i + 0) * width + center);
	green = Math.floor(Math.sin(freq*i + 2*Math.PI/2) * width + center);
	blue  = Math.floor(Math.sin(freq*i + 4*Math.PI/3) * width + center);

	return{r: red, g: green, b:blue};
}
