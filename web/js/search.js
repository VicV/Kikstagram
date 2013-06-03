App.populator('Search', function(page, data){
     p = $(page);

       p.find('.app-button.search').on('click', function(){

		p.find('.app-input.tag').blur();
		var tag = p.find('.app-input.tag').val();


		setTimeout(function(){

          App.load('home', {val:tag});

      	}, 0); 	
     });

     
});
