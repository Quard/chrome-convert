var conversion_page='?external_url='
var links = {
 // image: 'http://image-conversion.online-convert.com/',
 // ebook: 'http://ebook-conversion.online-convert.com/',
//  doc:   'http://document-conversion.online-convert.com/',
  video: 'http://video-conversion.online-convert.com/'
//  audio: 'http://audio-conversion.online-convert.com/'
}
var apiKey = '5d7c6b9862c6b8a9633ace4cf5fa1133';

/**
Submits current page URL into OC queue
**/
function convert_video(info, tab) {
   var pageUrl = info.pageUrl;  
	
	// console.log(info);
	// console.log(tab)
   // window.open(url);

 	// submit URL to OC queue
    ocapi.submitVideo(pageUrl, function(hashCode) {
		// alert("Hashcode:" + hashCode)
		
		// Create a simple text notification:
		var notification = webkitNotifications.createNotification(
		  'logo.png',  // icon url - can be relative
		  'Hello!',  // notification title
		  'Lorem ipsum...'  // notification body text
		);

		// // Or create an HTML notification:
		// 		var notification = webkitNotifications.createHTMLNotification(
		// 		  'notification.html'  // html url - can be relative
		// 		);

		// Then show the notification.
		notification.show();		
	});



	
	

}


/* inject "Download" link into page/link context menus */ 

var video_menu = chrome.contextMenus.create({"title": chrome.i18n.getMessage("download_video"),
                                           "contexts": ["page", "link"],
                                           "onclick": convert_video
//                                           "documentUrlPatterns": ['*://*.youtube.com/watch*',
//                                                                   '*://vimeo.com/*',
//                                                                   '*://5min.com/*',
//                                                                   ]
                                                                   });
