function updatePageNav() {

	var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	var blocks = ['hero','challenges','results','about'];

	var activeIndex = 0;
	for (i = 0; i < blocks.length; i++) {
		var blockId = blocks[i] + '_block';
		var block = document.getElementsByClassName(blockId)[0];

		// console.log(block);

		if (scrollTop + (window.innerHeight / 2) > block.offsetTop) {
			activeIndex = i;
			if (block.className.indexOf('appeared') == -1) {
				block.className = block.className + ' appeared';
			}
		}

	}
	document.getElementById('page_nav').className = 'active-' + (activeIndex + 1);

}

var interval = 2000, // 1 second
	t,
	radios = document.getElementsByName('slide');

function enableSlidesActions() {
	for (var i = 0; i < radios.length; i++) {
		radios[i].addEventListener('change', handleSlidesChange);
	}
}
function disableSlidesActions() {
	for (var i = 0; i < radios.length; i++) {
		radios[i].removeEventListener('change', handleSlidesChange);
	}
}
function iterateSlides() {
	// console.log('iterateSlides');
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {

			// console.log(i + ' is checked'); // :)

			if (radios[i + 1] == undefined) {
				i = -1;
			}
			disableSlidesActions();
			radios[i + 1].checked = true;
			enableSlidesActions();
			break;
		}
	}
	t = setTimeout('iterateSlides()', interval);
}
function handleSlidesChange() {
	// console.log('handleSlidesChange');
	clearTimeout(t);
	t = setTimeout('iterateSlides()', interval);
}
var debounce_timer;

$(function() {
	enableSlidesActions();
	t = setTimeout('iterateSlides()', interval);

	updatePageNav();
	$(window).scroll(function() {

		if (debounce_timer) {
			clearTimeout(debounce_timer);
		}
		debounce_timer = window.setTimeout(function() {
			updatePageNav();
		}, 10);
	});

	// Smooth scroll animation
	var isSafari = false;
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') <= -1) {
		isSafari = true; // Safari
	}
	if (isSafari) {
		var links = $('a[href^="#"]');
		links.click(function(e) {


			if (isSafari) {
				e.preventDefault();
				var target = $($(this).attr('href'));

				var t = target.offset().top;
				maxHeight = $('html').height() - $(window).height();
				if (t > maxHeight) {
					t = maxHeight;
				}
				$('html').stop().animate({ scrollTop: t }, { duration: 1000, easing: 'swing' });
			}
		});
	}

});