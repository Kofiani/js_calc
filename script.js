class Calculator {
	constructor(pre_txt_el, nxt_txt_el) {
		this.pre_txt_el = pre_txt_el;
		this.nxt_txt_el = nxt_txt_el;
		this.clear();
	}

	clear() {
		this.pre_op = '';
		this.nxt_op = '';
		this.operation = undefined;
	}

	delete() {
		this.nxt_op = this.nxt_op.toString().slice(0, -1);
	}

	appendNum(number) {
		if (number === '.' && this.nxt_op.includes('.')) return;
		this.nxt_op = this.nxt_op.toString() + number.toString();
	}

	sel_op(operation) {
		if (this.nxt_op === '') return;
		if (this.nxt_op !== '') {
			this.compute();
		}
		this.operation = operation;
		this.pre_op = this.nxt_op;
		this.nxt_op = '';
	}

	compute() {
		let computation;
		const pre = parseFloat(this.pre_op);
		const nxt = parseFloat(this.nxt_op);
		if (isNaN(pre) || isNaN(nxt)) return;
		switch (this.operation) {
			case '+':
				computation = pre + nxt;
				break;
			case '-':
				computation = pre - nxt;
				break;
			case '×':
				computation = pre * nxt;
				break;
			case '÷':
				computation = pre / nxt;
				break;
			default:
				computation = nxt;
		}
		this.nxt_op = computation;
		this.hist = computation;
		this.pre_op = '';
		this.operation = undefined;
		this.count = 0;
	}

	display_num(number) {
		// const floatNumber = parseFloat(number);
		// if (isNaN(floatNumber)) return '';
		// return floatNumber.toLocaleString('en');
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	update_dispay() {
		this.nxt_txt_el.innerText = this.display_num(this.nxt_op);
		if (this.operation != null) {
			this.pre_txt_el.innerText = `${this.display_num(this.pre_op)} ${
				this.operation
			}`;
		} else {
			this.pre_txt_el.innerText = '';
		}
	}

	reset() {
		if (this.count == 0) {
			this.nxt_op = '';
			this.nxt_txt_el.innerText = this.display_num(this.hist);
		}
	}
}

const num_btn = document.querySelectorAll('[data-num]');
const op_btn = document.querySelectorAll('[data-op]');
const eq_btn = document.querySelector('[data-eq]');
const pre_txt_el = document.querySelector('[data-pre]');
const nxt_txt_el = document.querySelector('[data-nxt]');
const del_btn = document.querySelector('[data-del]');
const clr_btn = document.querySelector('[data-clr]');

const calculator = new Calculator(pre_txt_el, nxt_txt_el);
const count = 0;

num_btn.forEach((btn) => {
	btn.addEventListener('click', () => {
		calculator.appendNum(btn.innerText);
		calculator.update_dispay();
		count = 1;
	});
});
op_btn.forEach((btn) => {
	btn.addEventListener('click', () => {
		calculator.sel_op(btn.innerText);
		calculator.update_dispay();
		count = 1;
	});
});
eq_btn.addEventListener('click', (e) => {
	calculator.compute();
	calculator.update_dispay();
	if (calculator.count == 0) {
		calculator.reset();
	}
});
clr_btn.addEventListener('click', (button) => {
	calculator.clear();
	calculator.update_dispay();
});
del_btn.addEventListener('click', (button) => {
	calculator.delete();
	calculator.update_dispay();
});
