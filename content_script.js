
/**
Shows plain-text notification
**/
function notify(message) {
	// Create a simple text notification:
	var notification = webkitNotifications.createNotification(
	  'logo.png',  // icon url - can be relative
	  'Video downloader',  // notification title
	  // message body 
	  message
	);

	// Then show the notification.
	notification.show();
}


/**
Submits current page URL into OC queue
**/
function convert_video(info, tab) {
   var pageUrl = info.pageUrl;  
	
 	// submit URL to OC queue
    ocapi.submitVideo(pageUrl, function(record) {
			
		  // notification body text
		  msg = 'download_url:' + record.download_url + "\r\n"
		        'hash' +record.hash
		  
		  notify(msg)
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
