$(function() {
	$('.form__search-btn').click(function(e) {
		e.preventDefault();
		$('.form__search-input').toggleClass('show');
	});

	$('.navbar-nav li').hover(function() {
		$(this).prev().toggleClass('no-border')
	});

	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		touchDrag: false,
		autoplay: false,
		autoplayTimeout: 7500
	});
});