App.populator('home', function (page, data) {
     var p = $(page);
       p.find('.app-button.rightLevel0.search').focus();

     if(App.platform === "ios" && App.platformVersion <= 5){
     
          p.find('.app-topbar .app-title').css('font-family', 'helvetica');
          p.find('.app-topbar .title-bar-container').css('font-family', 'helvetica');
     
     }

     p.find('.app-button.rightLevel0.search').on('click', function(){

          App.back();
     
     });
     /* For loader purposes */
     var loaderElem = p.find(".app-section.loader").clone();

     cards.ready(function(){
          /* Fetch data from zerver then use it 
          [this type of design must be used due to the asynchronous callbacks from zerver] */
          var tag = persistentTag;
          if(data != null && data.searchInput != null) {
               tag = data.searchInput;
               persistentTag = tag;
          }

          zAPI.getData(tag, function(meta, posts){
               if(posts){
                    PageBuilder(posts);
               }else{
                    App.back();
                    App.dialog({title:"Error retrieving data", text: "Please try again"});
                    _gaq.push(['_trackEvent', 'Error', 'Feedparser']);
                    return;
               }
          }).error(function(){
               App.back();
               App.dialog({title:"Error retrieving data", text: "Please try again"})
               _gaq.push(['_trackEvent', 'Error', 'Feedparser']);
               console.log("error error");

          });
     });


     function PageBuilder(data){

          /* Unreal SlideViewer
          - some maths to make slideViewer to function incoherent with topBar & title-bar-text;
          */
          var wrapper = page.querySelector('.wrapper');

          var height = (p.width());
          wrapper.innerHTML = '';
          wrapper.style.height = height + "px";
     
          var slideViewer = new SlideViewer(wrapper, source,{startAt: lastPage, length: data.length});

          if (data.length == 0) {
               _gaq.push(['_trackEvent', 'Empty Search', 'After Search']);
               App.back();
               App.dialog({title:"No results for that tag", text: "Please try again"})
          }

          p.find(".app-button.right.kik").click(function(){

               var k = slideViewer.page();
               
               cards.kik.send({
                    title: decodeSpecialChars(data[k].title),
                    text: 'So funny it\'s UNREAL',
                    pic: extract(data[k].description, 'img', 'src'),
                    linkData: JSON.stringify(data[k])
               });

               _gaq.push(['_trackEvent', 'KikContent', 'Kikked']);

          });

          slideViewer.on('flip', function(i){
               if (i >= 0){
                    lastPage = i;

                    var title = '';
                    if(data[i] != null && data[i].title != null){
                         title = data[i].title;
                         var upTitle = title;
                         if(upTitle.toUpperCase().indexOf("KIKSTAGRAM: ") > -1){
                              title = '<a src="http://kik.com">'+title+'</a>'
                              console.log(title);
                         }
                    }

                    _gaq.push(['_trackEvent', 'ContentSliding', 'slide']);

                    p.find('.title-bar-text').html(title);

               }else {
                    return;
               }                 
          });

          /*  Force dat SlideViewer to set the title of the first post
          */
          p.find('.title-bar-text')
               .html(data[0].title);

          function source(i){

               /* to bypass undefined-ness; since Slideviewer loads 3 images at a time */
               if ( i < 0 ) {
                    return;
               }

               /* For Future References if uri & publish dat is needed:
                    var postLink = data[i].link;
                    var postDate = data[i].pubDate.substr(0, data[i].pubDate.length - 14);
               */

               var description = '';
               if(data[i] != null && data[i].description != null) {
                    description = data[i].description;
               }

               var postImage = extract(description,'img','src');

               /* the main slideViewer content */
               var slideContent = $('<div />')
                    .addClass("listwrapper");

               /* Enable iScroll for certain devices */
               if ((App.platform === 'android' && App.platformVersion >= 4) || (App.platform ==='ios' && (App.platformVersion>=5 && App.platformVersion <6))) {
                    slideContent.scrollable(true);
               } else {
                    slideContent.scrollable();
               }

                    var postSection = $('<div />')
                         .addClass('app-section')
                         .css('text-align', 'center')
                         .append(loaderElem.clone());

                    var imageSection = $('<div />')
                         .addClass('image-section')
                         .css('text-align', 'center');

                    var img = $('<img />')
                         .addClass('main-image');

                         /* Show the loader until images are ready to be rendered & displayed */
                         img[0].onload = function() {
                              postSection.find(".loader").remove();
                              imageSection.append(img);
                              postSection.append(imageSection);
                         };

                         img.attr('src', postImage);

                         img.clickable().on('click', function(){

                              _gaq.push(['_trackEvent', 'PageOpen', 'ImagePreview']);

                              App.load('preview', data[slideViewer.page()]);
                         });

               slideContent.scrollableNode().append(postSection);
               return slideContent[0];
          }
     }
});
/* Thanks Ben for helping with the kinks of SlideViewer! */
