(function() {
var val = 0
var op = ''
var newNum = true

function sub()
{
	if (op != '') {
		equals()
	}
	op = 'sub'
	val = document.getElementById('screen').innerText
	newNum = true
}

function mul(digit)
{
	if (op != '') {
		equals()
	}
	op = 'mul'
	val = document.getElementById('screen').innerText
	newNum = true
}

function div(digit)
{
	if (op != '') {
		equals()
	}
	op = 'div'
	val = document.getElementById('screen').innerText
	newNum = true
}

function clear()
{
	if (op != '') {
		equals()
	}
	document.getElementById('screen').innerText = '0'
	newNum = true
}

function compute(n1, n2, op)
{
	switch (op) {
		case '+': return +n1 + +n2
		case '-': return +n1 - +n2
		case '*': return +n1 * +n2
		default: return +n1 / +n2
	}
}


function display(digit)
{
	if (newNum == true) {
		document.getElementById('screen').innerText = digit
		newNum = false
	}
	else {
		document.getElementById('screen').innerText += digit
	}
}

function equals()
{
	let val2 = document.getElementById('screen').innerText
	if (op == "sub") {
		document.getElementById('screen').innerText = +val - +val2
		op = ''
		newNum = true
	}
	else if (op == 'mul') {
		document.getElementById('screen').innerText = +val * +val2
		op = ''
		newNum = true
	}
	else if (op == 'div') {
		document.getElementById('screen').innerText = +val / +val2
		op = ''
		newNum = true
	}
	else if (op == 'sum') {
		document.getElementById('screen').innerText = +val + +val2
		op = ''
		newNum = true
	}
	else {
		op = 'sum'
		val = document.getElementById('screen').innerText
		newNum = true
	}
}

function clicked(c)
{
	var id = c.target.getAttribute('id')
	switch (id) {
		case '+':
			equals()
			break
		case '-':
			sub()
			break
		case "*":
			mul()
			break
		case '/':
			div()
			break
		case 'c':
			clear()
			break
		default:
			display(id)
	}
}

function init()
{
	var btns = document.getElementsByTagName("button")
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', function(e){clicked(e)})
	}
}

document.addEventListener('DOMCententLoaded', init())
})()

