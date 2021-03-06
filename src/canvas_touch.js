canvas.addEventListener('touchstart', handleStart, false);
canvas.addEventListener('touchend', handleEnd, false);
canvas.addEventListener('touchcancel', handleCancel, false);
canvas.addEventListener('touchmove', handleMove, false);

function copyTouch(touch) {
	return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

function ongoingTouchIndexById(idToFind) {
	for (let i = 0; i < ongoingTouches.length; i++) {
		const id = ongoingTouches[i].identifier;

		if (id == idToFind)
			return i;
	}
	return -1;    // not found
}

const ongoingTouches = [];
function handleStart(evt) {
	evt.preventDefault();

	inputBox.fillStyle = "rgb(255,255,255)";
	inputBox.fillRect(0, 0, canvas.width, canvas.height);
	clearTimeout(fadeId)
	fadeId = null;

	console.log('touchstart.');
	const touches = evt.changedTouches;

	for (let i = 0; i < touches.length; i++) {
		console.log(`touchstart: ${i}.`);
		ongoingTouches.push(copyTouch(touches[i]));
		inputBox.beginPath();
		inputBox.lineWidth = `${canvas.width / 12}`;
		inputBox.lineJoin = inputBox.lineCap = 'round';
		inputBox.strokeStyle = 'black';
	}
	l = 1000;	r = 0;
	u = 1000;	d = 0;
	isDrawing = true;
}

function handleMove(evt) {
	if (!isDrawing) return;
	evt.preventDefault();
	const touches = evt.changedTouches;

	for (let i = 0; i < touches.length; i++) {
		const idx = ongoingTouchIndexById(touches[i].identifier);

		if (idx >= 0) {
			const rect = canvas.getBoundingClientRect();
			l = Math.min(l, touches[i].pageX - rect.left);	r = Math.max(r, touches[i].pageX - rect.left);
			u = Math.min(u, touches[i].pageY - rect.top);	d = Math.max(d, touches[i].pageY - rect.top);

			console.log(`continuing touch ${ idx }`);
			inputBox.beginPath();
			inputBox.moveTo(ongoingTouches[idx].pageX - rect.left, ongoingTouches[idx].pageY - rect.top);
			inputBox.lineTo(touches[i].pageX - rect.left, touches[i].pageY - rect.top);
			inputBox.stroke();

			ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
		} else {
			console.log('can\'t figure out which touch to continue');
		}
	}
}

function handleEnd(evt) {
	evt.preventDefault();
	console.log("touchend");
	const touches = evt.changedTouches;

	for (let i = 0; i < touches.length; i++) {
		let idx = ongoingTouchIndexById(touches[i].identifier);

		if (idx >= 0) {
			inputBox.lineWidth = 4;
			inputBox.beginPath();
			const rect = canvas.getBoundingClientRect();
			l = Math.min(l, touches[i].pageX - rect.left);	r = Math.max(r, touches[i].pageX - rect.left);
			u = Math.min(u, touches[i].pageY - rect.top);	d = Math.max(d, touches[i].pageY - rect.top);

			inputBox.moveTo(ongoingTouches[idx].pageX - rect.left, ongoingTouches[idx].pageY - rect.top);
			inputBox.lineTo(touches[i].pageX - rect.left, touches[i].pageY - rect.top);
			ongoingTouches.splice(idx, 1);  // remove it; we're done
		} else {
			console.log('can\'t figure out which touch to end');
		}
	}
	
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
}

function handleCancel(evt) {
	evt.preventDefault();
	console.log('touchcancel.');
	const touches = evt.changedTouches;

	for (let i = 0; i < touches.length; i++) {
		let idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(idx, 1);  // remove it; we're done
	}
}
