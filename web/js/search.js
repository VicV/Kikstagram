App.populator('search', function (page) {

	p = $(page);

	p.find('.app-button.search').on('click', function(){

		var input = p.find('.app-input.tag').val();
		var data = { searchInput : input };
		
		_gaq.push(['_trackEvent', 'PageOpen', 'Search']);
        App.load('home', data, 'fade');
	});

	p.find('.app-button.rightLevel0.home').on('click', function(){
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