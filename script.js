$(function(){

	class Card {
		constructor(id, title, color) {
			this.title = title;
			this.color = color;
			this.id = id;
		}
		css() {
			return { 'background-color': this.color }
		}
		getid() {
			return 'card-' + this.id;
		}
		element() {
			return $('#card-' + id);
		}
	}

	const CARDS = [
		new Card(1, 1, 'green'),
		new Card(2, 2, 'blue'),
		new Card(3, 3, 'purple'),
	];

	var CARD_DIV = $('.card');
	var isAnimating;
	var currIdx = 0;

	function init() {
		CARD_DIV.each(function(idx) {
			$(this).css(CARDS[idx].css()).attr('id', CARDS[idx].getid());
			$(this).find('p.title').text(CARDS[idx].title);
			initEventHandler($(this));
		});
	}
	init();


	// Helper Functions
	function initEventHandler(o) {
		var mc = new Hammer.Manager(o[0], {
			recognizers: [
				// RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
				[Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}],
			]
		});
		// listen to events...
		mc.on("swipe", onSwipe);
	}

	function onSwipe(ev) {
		if (!isAnimating) {
			if (ev.deltaX < 0) {
				// FIX NEXT BUG
				animate($(ev.target), 'fadeOutLeft', next);
			}
			else if (ev.deltaX > 0) {
				animate($(ev.target), 'fadeOutRight', next);
			}
		}
	}

	function next() {
		if (++currIdx >= CARDS.length) currIdx = 0;
		$(CARD_DIV[0]).css(CARDS[currIdx].css()).attr('id', CARDS[currIdx].getid()).find('p.title').text(CARDS[currIdx].title);
		$(CARD_DIV[1]).css(CARDS[nextIdx()].css()).attr('id', CARDS[nextIdx()].getid()).find('p.title').text(CARDS[nextIdx()].title);
	}	

	function back() {
		if (--currIdx < 0) currIdx = CARDS.length - 1;
		$(CARD_DIV[0]).css(CARDS[currIdx].css()).attr('id', CARDS[currIdx].getid()).find('p.title').text(CARDS[currIdx].title);
		$(CARD_DIV[1]).css(CARDS[prevIdx()].css()).attr('id', CARDS[prevIdx()].getid()).find('p.title').text(CARDS[prevIdx()].title);
	}

	function nextIdx() {
		return currIdx + 1 >= CARDS.length ? 0 : currIdx + 1;
	}

	function prevIdx() {
		return currIdx - 1 < 0 ? CARDS.length - 1 : currIdx - 1;
	}

  function animate(obj, anim, cb) {
		isAnimating = true;
		obj.addClass(anim + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		  cb();
		  obj.removeClass(anim + ' animated');
		  window.setTimeout(function() {
		  	isAnimating = false;
		  }, 200);
		});
  }

});