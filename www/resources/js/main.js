var FWA = FWA || {};
FWA.socket = null;

$(function(){
	var cvs = $("#main-canvas")[0];
	var ctx = cvs.getContext('2d');
	var cvs_width = cvs.width;
	var cvs_height = cvs.height;
	var dots = [];
	var is_serverAvailable = false;

	function init() {
		is_serverAvailable = (FWA.socket && io);
		
		if(is_serverAvailable) {
			FWA.socket = io.connect('http://cowboy:7331');
			FWA.socket.on('connect', function() 
			{
				console.log("connected!");
			});
			
			FWA.socket.on('data', function(data) 
			{
				addDot(data.x, data.y)
			});
		}
		
		ctx.globalCompositeOperation = 'lighter';
		$(cvs).click(onCanvasClick);
		
		// start draw loop
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
		sendInfo(localX, localY)
	}
	function draw() {
		// clear frame
		ctx.clearRect(0 , 0, cvs_width, cvs_height);

		// draw dots
		var len = dots.length;
		for(var i=0; i < len; i++) {
			var dot = dots[i];
			dot.draw();
		}
		// trash old dots
		while(dots.length > 100) {
			dots.shift();
		}
	}
	function addDot(x, y) {
		dots.push(create_dot(x, y));
	}
	function removeDot(id) {
		dots.splice(id, 1);
	}
	function create_dot(x, y) {
		var radius = 0;
		var rMax = Math.floor(Math.random()*100) + 50;
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
			if(radius >= rMax){
				kill();
			}
		}
		function kill() {
			alive = false;
		}
		// return public members
		return {draw:draw};
	}
	function sendInfo(x, y) {
		if(is_serverAvailable)FWA.socket.emit('action', { "x": x, "y": y });
	}
	function receiveInfo(response) {
		var x = response.x;
		var y = response.y;

		addDot(x,y);
	}
	// start app
	init();
});


