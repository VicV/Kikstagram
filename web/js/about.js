App.populator('about', function (page) {

	p = $(page);

	p.find('.app-button.rightLevel0.back').on('click', function(){
		_gaq.push(['_trackEvent', 'PageOpen', 'Home']);
        App.load('home', 'fade');

	});

},
	function (page) {
  		if (App.platform === 'android'){
    		cards.browser.unbindBack(handleBackButton);
		}
	}
);