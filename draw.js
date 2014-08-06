//define([], function () {
	(function() {
		var cl = console.log;
		console.log = function() {
			cl.apply(console, [].slice.call(arguments).map(function(el) {
				return {}.toString.call(el) === '[object Object]' && typeof el.toString === 'function' && el.toString !== Object.prototype.toString ? el.toString() : el;
			}));
		};
	}());

	function Location (x, y) {
	}

	function draw() {
		//console.log('draw');

		//var img = new Image();
		var img = document.getElementById("myimage");

		if (!img.src) return;

	//        img.onload = function () {					
	//            
	//        };
		ctx.drawImage(img,0,0);
		//var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

		//data = imageData.data;

	}
	function loadFileImageIntoCanvas(fileEvent, callback) {		
		var selectedFile = event.target.files[0];
		var reader = new FileReader();

		var img = document.getElementById("myimage");
		img.title = selectedFile.name;

		reader.onload = function(event) {
			img.src = event.target.result;
			//console.log(img);
			canvas.width = img.width;
			canvas.height = img.height;
			draw();
			callback();
		};

		reader.readAsDataURL(selectedFile);

	}
	function onFileSelected(event) {
		loadFileImageIntoCanvas(event, function () {
			
			map.width = Math.floor(canvas.width / map.unitSquare);
			map.height = Math.floor(canvas.height / map.unitSquare);

			var foo = document.createElement('span');
			foo.textContent = map.width + " x " + map.height;
			$id('info').appendChild(foo);

		});
	}
	
	function setPixel(imageData, x, y, r, g, b, a) {
		index = (x + y * imageData.width) * 4;
		imageData.data[index+0] = r;
		imageData.data[index+1] = g;
		imageData.data[index+2] = b;
		imageData.data[index+3] = a;
	}
	function getPixel(x, y) {
		var p = ctx.getImageData(x,y,1,1).data;
		return new Color(p[0], p[1], p[2], p[3]);//.toString(16);
	}
	
	function Pixel (x, y, color) {
		this.x = x || 0;
		this.y = y || 0;
		this.color = defaultFor(color, new Color());
		this.toString = function () {
			return "x: " + this.x + ", y: " + this.y;	
		}
	}

	function Color (red, green, blue, alpha) {
		this.r = defaultFor(red  , 0);
		this.g = defaultFor(green, 0);
		this.b = defaultFor(blue , 0);
		this.a = defaultFor(alpha, 255);
		this.toString = function (radix) {
			var s = "";
			switch (radix) {
				case 16: 
					s = (this.r < 16 ? "0" : "") + this.r.toString(16) + 
						(this.g < 16 ? "0" : "") + this.g.toString(16) +
						(this.b < 16 ? "0" : "") + this.b.toString(16);
						//(this.a < 16 ? "0" : "") + this.a.toString(16);
					s = "" + s.toUpperCase();					
					break;
				case 10: 
				default:
					s = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
					break;
			}
			return s;
		}
		this.equals = function (color) {
			if (color.constructor.name !== "Color" ) return false;
			return this.r === color.r
				&& this.g === color.g
				&& this.b === color.b
				//&& this.a === color.a
			;
		}
	}
	
	function defaultFor(arg, val) { 
		return typeof arg === "undefined" ? val : arg; 
	}

//});