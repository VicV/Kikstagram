App.populator('preview', function(page, params){
     var data = params.data;
     p = $(page);
     
     if(App.platform === "ios"){
     
          p.find('.app-topbar .app-button.semiright.home').text('Home');

          if(App.platformVersion <= 5){
               p.find('.app-topbar .app-title').css('font-family', 'helvetica');
               p.find('.app-topbar .title-bar-container').css('font-family', 'helvetica');
          }

     }

     /* To make the entire page black */
     p.find('.app-content').css('background','black');
     p.css('background','black');



     p.find('.app-button.rightLevel1.home').on('click', function(){
          _gaq.push(['_trackEvent', 'PageOpen', 'Home']);

               if ( cards.picker && cards.picker.cancel ) {
                    cards.picker.cancel();
                    App.load('home', 'scale-out');
                    App.removeFromStack(-1);
               } else {
                    App.load('search', 'scale-out');
               }
     });

     /* Main Page Builder */
     var previewTitle = params.title;
     var previewImage = extract(params.description,'img','src');

     p.find(".app-button.right").click(function(){

          cards.kik.send({
               title: params.title,
               text: 'New Kikstagram',
               pic: extract(params.description, 'img', 'src'),
               linkData: JSON.stringify(params)
          });

          _gaq.push(['_trackEvent', 'KikContent', 'Kikked']);

     });


     p.find('.preview-title').html(previewTitle);

     var photoViewer = new PhotoViewer(page, [previewImage], {
          automaticTitles: false
     });
     
}
     
);