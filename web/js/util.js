
var persistentTag = "uwaterloo";
var lastPage = 0;
var isDone = true;
// HTML Tag Extractor
function extract(data, tag, attr){
	var html = $("<div>" + data + "</div>");
	return html.find(tag).attr(attr);
}

// Android Back Button Handler
function handleBackButton () {
 	if (cards.kik.returnToConversation) {
     	cards.kik.returnToConversation();
 	}else{
		return false;
  	}
}

function onBack(){
	if ( cards.picker && cards.picker.cancel ) {
				cards.picker.cancel();
			}

			App.back();
}

String.prototype.trunc = 
      function(n){
          return this.substr(0,n-1)+(this.length>n?'&hellip;':'');
      };


function removeFirst(input) {
	console.log("removing");
	var s = (input.length && input[0] == '#') ? input.slice(1) : input;
	console.log("new: "+s);
	return s;
};

var getNthWord = function(string, n){
    var words = string.split(" ");
    return words[n-1];
};
