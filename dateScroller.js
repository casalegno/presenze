HTMLElement.prototype.dateScroller = function (options={}) {
	var self = this;
	var defaults = {
		min: 0,
		max: 10,
		step: 1,
		value: 0,
		label: [],
		onChange: function (value) {
			console.log(value);
		}
	};
	if(self.type !='number'){
		console.error('Element must be of type number');
		return;
	}
	let timeoutBlur; //definisco un timeout per il blur
	
	options.min = self.min ?? options.min;
	options.max = self.max ?? options.max;

	//aggiorno le opzioni
	self.options = Object.assign({}, defaults, options);
	self.classList.add('input');
	//inizio a creare un contenitore per l'elemento
	let container = document.createElement('div');
	container.classList.add('date-scroll');
	self.parentNode.insertBefore(container, self);
	container.appendChild(self);
	//creo una label per l'elemento che riporta il valore dell'elemento stesso
	let span = document.createElement('span');
	span.innerHTML = self.options.label[parseInt(self.value)] ?? self.value;
	container.appendChild(span);

	const defineTimeout =()=>{
		if(timeoutBlur)
			clearTimeout(timeoutBlur);
		timeoutBlur=setTimeout(() => {
			self.dispatchEvent(new Event('blur'));
			console.log(`timeout ${self.value}`);
		}, 500);
	};


	//sul container attivo l'ascolto per la rotella del mouse
	container.addEventListener('wheel', (event) => {
		event.preventDefault(); // Impedisce lo scorrimento della pagina
		let currentValue = parseInt(self.value);
		if (event.deltaY > 0) { // Rotella del mouse verso l'alto
			currentValue = Math.min(self.options.max, currentValue + 1); // Incrementa, ma non supera 11
		} else { // Rotella del mouse verso il basso
			currentValue = Math.max(self.options.min, currentValue - 1); // Decrementa, ma non scende sotto 0
		}

		self.value = currentValue;
		span.textContent = self.options.label[currentValue] ?? currentValue;
		defineTimeout();
	});

	//sul container attivo l'ascolto per il touch
	container.addEventListener('touchmove', (event) => {
		event.preventDefault();
		const touchCurrentY = event.touches[0].clientY;
		const deltaY = touchStartY - touchCurrentY;
		//prendo l'attuale valore dell'elemento
		let currentValue = parseInt(self.value);
		if (deltaY > 10) { // Scorrimento verso l'alto
			currentValue = Math.min(self.options.max, currentValue + 1);
			touchStartY = touchCurrentY; // Aggiorna la posizione iniziale
		} else if (deltaY < -10) { // Scorrimento verso il basso
			currentValue = Math.max(self.options.min, currentValue - 1);
			touchStartY = touchCurrentY; // Aggiorna la posizione iniziale
		}
		self.value = currentValue;
		span.textContent = self.options.label[currentValue] ?? currentValue;
		defineTimeout();
	});

	let toUp=document.createElement('div');
	toUp.innerHTML='&#9650;';
	toUp.classList.add('up');
	toUp.onclick=()=>{
		let currentValue = parseInt(self.value);
		currentValue = Math.max(self.options.min, currentValue - 1); //decrementa fino al minimo
		self.value = currentValue;
		span.textContent = self.options.label[currentValue] ?? currentValue;
		defineTimeout()
	}
	container.prepend(toUp);
	let toDown=document.createElement('div');
	toDown.innerHTML='&#9660;';
	toDown.classList.add('down');
	toDown.onclick=()=>{
		let currentValue = parseInt(self.value);
		currentValue = Math.min(self.options.max, currentValue + 1);
		self.value = currentValue;
		span.textContent = self.options.label[currentValue] ?? currentValue;
		defineTimeout();
	}
	container.append(toDown);

	return self;
}