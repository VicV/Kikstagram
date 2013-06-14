App.populator('search', function (page) {

	p = $(page);
	lastPage = 0;
	App.destroyStack()
	p.find('.app-button.search').on('click', function(){

		var input = p.find('.app-input.tag').val();
		var data = { searchInput : input };
		if (input == null || input.length == 0 || input == "" ) {
			App.dialog({title: "Empty search", text: "Please enter a search term"})
		} else {
			_gaq.push(['_trackEvent', 'PageOpen', 'Search']);
	        App.load('home', data, 'fade');
    	}
	});

	p.find('.app-button.rightLevel0.back').on('click', function(){
		_gaq.push(['_trackEvent', 'PageOpen', 'Home']);
        App.load('home', 'fade');
	});

     p.find('.app-button.rightLevel0.about').on('click', function(){

          _gaq.push(['_trackEvent', 'PageOpen', 'About']);
          App.load('about', 'fade');
     
     });
     
},
	function (page) {
  		if (App.platform === 'android'){
    		cards.browser.unbindBack(handleBackButton);
		}
	}
);