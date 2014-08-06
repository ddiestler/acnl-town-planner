require(['draw'], function () {
	var $      = document.querySelector			.bind(document);
	var $all   = document.querySelectorAll		.bind(document);
	var $id    = document.getElementById		.bind(document);
	var $class = document.getElementsByClassName.bind(document);
	var $tag   = document.getElementsByTagName	.bind(document);

	var canvas, data, ctx;
	
	canvas = document.getElementsByTagName('canvas')[0];
	ctx = canvas.getContext('2d');
	
	
	$id('draw').addEventListener('click', draw, false);
	$id('file').addEventListener('change', onFileSelected, false);
	$tag('canvas')[0].addEventListener('click', canvasMouseClick, false);
	
});