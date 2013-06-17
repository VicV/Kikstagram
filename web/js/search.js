App.populator('search', function (page) {
	var p = $(page);
	lastPage = 0;
	p.find('.app-button.search').on('click', function(){
		var input = p.find('.app-input.tag').val().toLowerCase();
		var data = { searchInput : input };
		if (input == null || input.length == 0 || input == "" ) {
			App.dialog({title: "Empty search", text: "Please enter a tag"})
			_gaq.push(['_trackEvent', 'Empty Search', 'Search']);
		} else {				
	        App.load('home', data, 'fade');
    	}
	});

     p.find('.app-button.rightLevel0.about').on('click', function(){
          App.load('about', 'fade');
     
     });
     
},
	function (page) {
  		if (App.platform === 'android'){
    		cards.browser.unbindBack(handleBackButton);
		}
	}
);