App.populator('preview', function(page, params){
     var data = params.data;
     var p = $(page);
     
     if(App.platform === "ios"){
     
          if(App.platformVersion <= 5){
               p.find('.app-topbar .app-title').css('font-family', 'helvetica');
               p.find('.app-topbar .title-bar-container').css('font-family', 'helvetica');
          }

     }

     /* To make the entire page black */
     p.find('.app-content').css('background','black');
     p.css('background','black');



     p.find('.app-button.rightLevel1.back').on('click', function(){
          if ( cards.kik.returnToConversation && !isDone) {
               isDone = true;
               App.load('search', App.getReverseTransition());
               App.removeFromStack(-1);

          } else {
          }
     });

     /* Main Page Builder */
     var previewTitle
     if (params.title == null || params.title.length == 0 ){
          previewTitle = "";
     } else {
          previewTitle = params.title.trunc(50);
     }
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