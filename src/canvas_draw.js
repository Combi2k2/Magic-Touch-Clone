const canvas = document.getElementById('draw-canvas');
const smallCanvas = document.getElementById('small-canvas');
const displayBox = document.getElementById('prediction');

const inputBox = canvas.getContext('2d');
const smBox = smallCanvas.getContext('2d');

canvas.width  = window.innerWidth * 0.22;
canvas.height = canvas.width;

function draw_canvas_setup()	{
	const rect = canvas.getBoundingClientRect();
	canvas.width  = rect.width;
	canvas.height = rect.height;
}

let isDrawing = false;
let model;
let prediction = null;

/* Loads trained model */
async function init()	{
	model = await tf.loadModel('model/model.json');
}

let l = null, r = null;
let u = null, d = null;

let fadeId = null;

canvas.addEventListener('mousedown', _event =>	{
	canvas.width  = window.innerWidth * 0.22;
	canvas.height = canvas.width;

    isDrawing = true;

    inputBox.strokeStyle = 'black';
    inputBox.lineWidth = `${canvas.width / 12}`;
    inputBox.lineJoin = inputBox.lineCap = 'round';
    inputBox.beginPath();

	l = 1000;	r = 0;
	u = 1000;	d = 0;
});

canvas.addEventListener('mousemove', event =>	{
  	if (!isDrawing) return;
	inputBox.fillStyle = "rgb(255,255,255)";
	inputBox.fillRect(0, 0, canvas.width, canvas.height);
	clearTimeout(fadeId)
	fadeId = null;
	drawStroke(event.clientX, event.clientY);
});

//	the color of the stroke becomes the color of matched missle and then fade out
let colors = ['#FA8072', '#00FF00', '#1E90FF', '#DB7093', '#40E0D0', '#DCDC00', '#FFA500', '#9932CC', '#D2691E', '#C0C0C0'];

function HexToRGB(hex_col)	{
	function hex2dec(c)	{
		if ('0' <= c && c <= '9')	return  c.charCodeAt(0) - '0'.charCodeAt(0);
		if ('A' <= c && c <= 'F')	return	c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
		return  0;
	}
	let R = hex2dec(hex_col[1]) * 16 + hex2dec(hex_col[2]);
	let G = hex2dec(hex_col[3]) * 16 + hex2dec(hex_col[4]);
	let B = hex2dec(hex_col[5]) * 16 + hex2dec(hex_col[6]);

	return  [R, G, B];
}

canvas.addEventListener('mouseup', _event =>	{
	isDrawing = false;
	let pred = predict();
	let imgd = inputBox.getImageData(0, 0, canvas.width, canvas.height);

	let [pred_R, pred_G, pred_B] = HexToRGB(colors[pred]);

	//	transforming the color
	for(let i = 0 ; i < imgd.data.length ; i += 4)	if (imgd.data[i] <= 245)	{
		imgd.data[i] = pred_R;
		imgd.data[i + 1] = pred_G;
		imgd.data[i + 2] = pred_B;
	}
	//	re-draw the inputBox
	inputBox.putImageData(imgd, 0, 0);

	prediction = pred;
	console.log(pred);
	renderRockets();

	function fadeOut()  {
		let itr = 0;
		function run()  {
			inputBox.fillStyle = "rgba(255,255,255,0.25)";
			inputBox.fillRect(0, 0, canvas.width, canvas.height);
			itr++;
	
			if (itr >= 20)
				return;
			fadeId = setTimeout(run, 25);
		}
		fadeId = setTimeout(run, 50);
	}
	fadeOut();
});

/* Draws on canvas */
function drawStroke(clientX, clientY) {
	// get mouse coordinates on canvas
	const rect = canvas.getBoundingClientRect();
	const x = clientX - rect.left;
	const y = clientY - rect.top;

	l = Math.min(l, x);	r = Math.max(r, x);
	u = Math.min(u, y);	d = Math.max(d, y);

	// draw
	inputBox.lineTo(x, y);
	inputBox.stroke();
	inputBox.moveTo(x, y);
}

/* Makes predictions */
function predict()	{
	let values = getPixelData();
	smBox.clearRect(0, 0, smallCanvas.width, smallCanvas.height)
	let scores = model.predict(values).dataSync();

	return  scores.indexOf(Math.max(...scores));
}



/* Returns pixel data from canvas after applying transformations */
function getPixelData() {
	let center_x = (l + r) / 2;
	let center_y = (u + d) / 2;
	let size = canvas.width
	let cur = smBox.fillStyle
	smBox.fillStyle = 'rgb(255, 255, 255)';
	smBox.fillRect(0, 0, smallCanvas.width, smallCanvas.height)
	smBox.fillStyle = cur;

	smBox.drawImage(inputBox.canvas, 
		center_x - size/2, center_y - size/2, size, size,
		0, 0, smallCanvas.width, smallCanvas.height);

	const imgData = smBox.getImageData(0, 0, smallCanvas.width, smallCanvas.height);

	// preserve and normalize values from red channel only
	let values = [];

	for (let i = 0; i < imgData.data.length; i += 4)
		values.push(255 - imgData.data[i]);
	
	values = tf.reshape(values, [1, 28, 28, 1]);
	return  values;
}
init();