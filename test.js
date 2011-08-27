chrome.extension.onRequest.addListener( function(request, sender, sendResponse){
  if(request.msg=="findImages"){
    var big_images = {};
    var urls = [];
    jQuery("img").each(function() {
        if
        if (big_images[this.width]) 
            big_images[this.width].push(this.src)
        else
            big_images[this.width] = [this.src];
    });
    sendResponse({images: big_images});
  }
});
