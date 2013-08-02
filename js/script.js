// delay inbetween slides in slideshow, in milliseconds
var slideShowDelay = 12500;

// initial slideshow trigger
var t = setTimeout(function(){
			portfolio.next();
		},slideShowDelay);

// array of photos to display in portfolio
// landscape orientation works best due to cover/stretch presentation of images
var photos = [
	'http://farm8.staticflickr.com/7391/8882400348_a3ea5a5eb8_k_d.jpg' 
	'http://farm8.staticflickr.com/7023/6759616953_c681303f57_o_d.jpg'
	'http://farm9.staticflickr.com/8474/8416798197_571ab1d6e5_k_d.jpg'
	'http://farm4.staticflickr.com/3722/9159746784_e8756b56b0_k_d.jpg'
	'http://farm1.staticflickr.com/37/97897087_9789ac2cd9_o_d.jpg'
	'http://farm4.staticflickr.com/3259/2823047622_f7275cd77f_o_d.jpg'
	'http://farm4.staticflickr.com/3130/3169660819_844a476472_o_d.jpg'
	'http://farm3.staticflickr.com/2583/4031990333_90666c9bb6_o_d.jpg'
	'http://farm2.staticflickr.com/1264/777359539_62ce237b63_o_d.jpg'
	'http://farm5.staticflickr.com/4029/4666380798_ff9a5387ac_o_d.jpg'
]

// portfolio presentation and slideshow controller
var portfolio = {
	'slideshow': true,
	'current': 0,
	'next' : function() {
		this.current = (this.current==photos.length-1)?0:++this.current;
		this.show(this.current);
	},
	'prev' : function() {
		this.current = (this.current==0)?(photos.length-1):--this.current;
		this.show(this.current);
	},
	'show' : function(_index) {
		clearTimeout(t);
		$('#viewer').anystretch(photos[_index], {speed: 500});
		this.current = _index;
		this.step();
	},
	'play' : function() {
		this.slideshow = true;
		this.step();
	},
	'pause' : function() {
		this.slideshow = false;
		this.step();
	},
	'fullscreen' : function() {
		if (window.fullScreenApi.supportsFullScreen) {
			window.fullScreenApi.requestFullScreen($('section#main').get(0));

			$('section#main').get(0).addEventListener(fullScreenApi.fullScreenEventName, function() {
				if (fullScreenApi.isFullScreen()) {
					// in full screen, sweet!
					$('section#main').addClass('fullscreen');
				} else {
					// exited, cleanup
					$('section#main').removeClass('fullscreen');
				}
			}, true);
		}
	},
	'toggle' : function() {
		if($('#playpause a').hasClass('pause')){
			this.pause();
			$('#playpause a').removeClass('pause').addClass('play').text('play');
		} else {
			this.play();
			$('#playpause a').removeClass('play').addClass('pause').text('pause');
		}
	},
	'step' : function() {
		if (this.slideshow) {
			t = setTimeout(function(){
				portfolio.next();
			},slideShowDelay);
		} else {
			clearTimeout(t);
		}
	}
}

$(function(){
	// preload photos into cache
	$(photos).preload();

	// present first photo
	portfolio.show(0);

	// update current year in copyright footer, incase you don't get around to updating this in a timely manner
	$('#currYear').text(new Date().getFullYear());

	// keyboard shortcuts
	$(window).keydown(function(e){
		switch(e.keyCode) {
			case 32:
				// space
				portfolio.toggle();
				break;
			case 37:
				// left
				portfolio.prev();
				break;
			case 38:
				// up
				portfolio.prev();
				break;
			case 39:
				// right
				portfolio.next();
				break;
			case 40:
				// down
				portfolio.next();
				break;
			case 70:
				// f
				portfolio.fullscreen();
				break;
			case 74:
				// j
				portfolio.prev();
				break;
			case 75:
				// k
				portfolio.next();
				break;
		}
	});

	// onscreen slideshow navigation controls
	$('#next a').on('click',function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		portfolio.next();
	});
	$('#prev a').on('click',function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		portfolio.prev();
	});
	$('#playpause a').on('click',function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		portfolio.toggle();
	});

	// swipe controls for slideshow navigation
	$('#main, #viewer').swipe({
		swipeLeft: function() {
			portfolio.next();
		},
		swipeRight: function() {
			portfolio.prev();
		}
	});

	$('a#fullscreen').on('click',function(e){
		e.preventDefault();
		portfolio.fullscreen();
	})
});
