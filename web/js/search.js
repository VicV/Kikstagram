App.populator('Search', function(page, data){
     p = $(page);

       p.find('.app-button.search').on('click', function(){

		p.find('.app-input.tag').blur();

		setTimeout(function(){

          App.load('home', {val:p.find('.app-input.tag').val()});

      	}, 0); 	
     });

     
});
