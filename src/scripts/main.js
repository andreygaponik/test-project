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
		mouseDrag: false,
		autoplay: true,
		autoplayTimeout: 7500
	});

	function alignSlideDescription() {
		$.each($('.owl-carousel .owl-item'), function() {
			var heightDescription = $(this).find('.owl-carousel__description').height();
			$(this).find('.owl-carousel__description').css('marginTop', -heightDescription/2);
		});
	}

	// alignSlideDescription();
});