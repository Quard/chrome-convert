
/**
Submits current page URL into OC queue
**/
function convert_video(info, tab) {
   var pageUrl = info.pageUrl;  
	
 	// submit URL to OC queue
    ocapi.submitVideo(pageUrl, function(record) {
				
		// Create a simple text notification:
		var notification = webkitNotifications.createNotification(
		  'logo.png',  // icon url - can be relative
		  'Submitted your video for download',  // notification title
		   
		  // notification body text
		  'URL:' + record.url+"\r\n"+
		    'download_url:' + record.download_url + 
		    'hash' +record.hash
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
