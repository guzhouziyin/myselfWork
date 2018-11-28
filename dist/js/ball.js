"use strict";

var _createClass = function() {
	function defineProperties(target, props) {
		for(var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if(protoProps) defineProperties(Constructor.prototype, protoProps);
		if(staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();

function _possibleConstructorReturn(self, call) {
	if(!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if(typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if(superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} 

function _classCallCheck(instance, Constructor) {
	if(!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

//1.获取当前的画布
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
canvas.style.backgroundColor = "#000000";
//2.小球类

var Ball = function() {
	//构造器
	function Ball(x, y, color) {
		_classCallCheck(this, Ball);

		this.x = x;
		this.y = y;
		this.color = color;
		this.r = 40;
	}
	//绘制小球

	_createClass(Ball, [{
		key: "render",
		value: function render() {
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.restore();
		}
	}]);

	return Ball;
}();

//3.会移动的小球类 	

var MoveBall = function(_Ball) {
	_inherits(MoveBall, _Ball);

	function MoveBall(x, y, color) {
		_classCallCheck(this, MoveBall);

		//量的变化
		var _this = _possibleConstructorReturn(this, (MoveBall.__proto__ || Object.getPrototypeOf(MoveBall)).call(this, x, y, color));

		_this.dX = _.random(-5, 5);
		_this.dY = _.random(-5, 5);
		_this.dR = _.random(1, 3);
		return _this;
	}

	_createClass(MoveBall, [{
		key: "upDate",
		value: function upDate() {
			this.x += this.dX;
			this.y += this.dY;
			this.r -= this.dR;
			if(this.r < 0) {
				this.r = 0;
			}
		}
	}]);

	return MoveBall;
}(Ball);

//4.实例化小球

var ballArr = [];
var colorArr = ['red', 'orange', 'yellow', 'green', 'pink', 'purple', 'blue'];

//5.监听鼠标移动
canvas.addEventListener('mousemove', function(e) {
	ballArr.push(new MoveBall(e.offsetX, e.offsetY, colorArr[_.random(0, colorArr.length - 1)]));
});

//6.开启定时器
setInterval(function() {
	//清屏
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//绘制
	for(var i = 0; i < ballArr.length; i++) {
		ballArr[i].render();
		ballArr[i].upDate();
	}
}, 50);