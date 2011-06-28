var FWA = FWA || {};
FWA.socket = null;

$(function(){
	
	var cvs = $("#main-canvas")[0];
	var ctx = cvs.getContext('2d');
	var cvs_width = cvs.width;
	var cvs_height = cvs.height;
	

	var dots = [];
	var lastDotId = 0;

	function init() {
		$(cvs).click(onCanvasClick);
		setInterval(draw, 33);
	}
	function onCanvasClick(e) {
		var target = $(e.target);
		var offset   = target.offset();
		var left     = offset.left;
		var top      = offset.top;
		var mouseX   = e.pageX;
		var mouseY   = e.pageY;
		var localX   = mouseX - left;
		var localY   = mouseY - top;

		addDot(localX, localY)
	}
	function draw() {
		ctx.globalCompositeOperation = 'lighter';
		ctx.clearRect(0 , 0, cvs_width, cvs_height);

		var len = dots.length;

		for(var i=0; i < len; i++) {
			dots[i].draw();
		}
	}
	function addDot(x, y) {
		dots.push(create_dot(lastDotId, x, y, removeDot));
		lastDotId ++;

		sendInfo(x, y)
	}
	// bug when dot is removed while loop in draw is executing, removing for now.
	function removeDot(id) {
		// log('removeDot' + id);
		// log(dots);
		// dots.splice(id, 1);
	}
	function create_dot(id, x, y, onDeath) {
		var radius = 0;
		var rMax = Math.floor(Math.random()*135) + 50;
		var rSpeed = 2;
		var alive = true;
		var alpha = 1;
		var aSpeed = 1/ (rMax/rSpeed);
		var color = FWA.randomRGB(140, 115, 0.2);

		function draw() {
			if(alive) {
				var fill = "rgba(" + ""+color.r + ","+color.g + ","+color.b + ","+alpha + ")";

				FWA.drawCircle(ctx, {x:x, y:y, radius:radius, fill:fill});
				if(radius < rMax) {
					radius += rSpeed;
					alpha  -= aSpeed;
				}
			}else{
				return;
			}

			if(radius == rMax){
				kill();
			}
		}
		function kill() {
			alive = false;
			if(onDeath)onDeath(id);
		}

		return {draw:draw};
	}
	function sendInfo(x, y) {
		FWA.socket.
		// send info to node
	}
	function receiveInfo(response) {
		var x = response.x;
		var y = response.y;

		addDot(x,y);
	}
	// start app
	init();
});


