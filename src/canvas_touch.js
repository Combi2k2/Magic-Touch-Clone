const el = document.getElementById('draw-canvas');
el.addEventListener('touchstart', handleStart);
el.addEventListener('touchend', handleEnd);
el.addEventListener('touchcancel', handleCancel);
el.addEventListener('touchmove', handleMove);
const ctx = el.getContext('2d');

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
	console.log('touchstart.');
	const touches = evt.changedTouches;

	for (let i = 0; i < touches.length; i++) {
		console.log(`touchstart: ${i}.`);
		ongoingTouches.push(copyTouch(touches[i]));
		//const color = colorForTouch(touches[i]);
		ctx.beginPath();
		ctx.lineWidth = `${el.width / 12}`;
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.strokeStyle = 'black';
	}
}

function handleMove(evt) {
	evt.preventDefault();
	const touches = evt.changedTouches;

	for (let i = 0; i < touches.length; i++) {
		//const color = colorForTouch(touches[i]);
		const idx = ongoingTouchIndexById(touches[i].identifier);

		if (idx >= 0) {
			const rect = el.getBoundingClientRect();
			console.log(`continuing touch ${ idx }`);
			ctx.beginPath();
			ctx.moveTo(ongoingTouches[idx].pageX - rect.left, ongoingTouches[idx].pageY - rect.top);
			ctx.lineTo(touches[i].pageX - rect.left, touches[i].pageY - rect.top);
			ctx.stroke();

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
			ctx.lineWidth = 4;
			ctx.beginPath();
			const rect = canvas.getBoundingClientRect();
			ctx.moveTo(ongoingTouches[idx].pageX - rect.left, ongoingTouches[idx].pageY - rect.top);
			ctx.lineTo(touches[i].pageX - rect.left, touches[i].pageY - rect.top);
			ongoingTouches.splice(idx, 1);  // remove it; we're done
		} else {
			console.log('can\'t figure out which touch to end');
		}
	}

	if (ongoingTouches.length != 0) {
		return;
	}
	let pred = predict();
	let imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);

	let [pred_R, pred_G, pred_B] = HexToRGB(colors[pred]);

	//	transforming the color
	for(let i = 0 ; i < imgd.data.length ; i += 4)	if (imgd.data[i] != 255)	{
		imgd.data[i] = pred_R;
		imgd.data[i + 1] = pred_G;
		imgd.data[i + 2] = pred_B;
	}
	//	re-draw the inputBox
	ctx.putImageData(imgd, 0, 0);

	function fadeOut()  {
		let itr = 0;
		function run()  {
			ctx.fillStyle = "rgba(255,255,255,0.25)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			itr++;

			if (itr >= 20)
				return;
			setTimeout(run, 50);
		}
		setTimeout(run, 100);
	}
	fadeOut();
	prediction = pred;
	console.log(pred);
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
