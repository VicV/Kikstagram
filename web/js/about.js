App.populator('about', function (page) {

	var p = $(page);

	p.find('.app-button.rightLevel0.back').on('click', function(){
		App.back();

	});

},
	function (page) {
  		if (App.platform === 'android'){
    		cards.browser.unbindBack(handleBackButton);
		}
	}
);