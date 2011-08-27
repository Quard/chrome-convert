var conversion_page='?external_url='
var links = {
 // image: 'http://image-conversion.online-convert.com/',
 // ebook: 'http://ebook-conversion.online-convert.com/',
//  doc:   'http://document-conversion.online-convert.com/',
  video: 'http://video-conversion.online-convert.com/'
//  audio: 'http://audio-conversion.online-convert.com/'
}
var apiKey = '5d7c6b9862c6b8a9633ace4cf5fa1133';
// var apiKey = 'd57d45af2895ebbce65a3ca4d15e1d3d';

/**
Submits current page URL into OC queue
**/
function convert_video(info, tab) {
   var pageUrl = info.pageUrl;  
	
	// console.log(info);
	// console.log(tab)
   // window.open(url);

 	// submit URL to OC queue
    ocapi.submitVideo(pageUrl, tab.title, function(hashCode) {
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

function download(info, tab) {
    $.getJson('', {url: tag.pageUrl}, function (json){
        if (json.status) {
            for (var i=0; i<json.cookies.length; i++) {
                var cookie = json.cookies[i];
                chrome.cookies.set({
                    url: tab.pageUrl,
                    domain: cookie.domain,
                    path: cookie.path,
                    name: cookie.name,
                    value: cookie.value,
                    expirationDate: cookie.expiration,
                });
            }
        }
    });
}

/* inject "Download" link into page/link context menus */

var video_menu = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("download_video"),
    "contexts": ["page", "link"],
    "onclick": convert_video,
    "documentUrlPatterns": [
        '*://video.google.com/*',
        '*://*.youtube.com/watch*',
        '*://metacafe.com/*',
        '*://photobucket.com/*',
        '*://video.yahoo.com/*',
        '*://dailymotion.com/video/*',
        '*://depositfiles.com/*',
        '*://facebook.com/video/video.php*',
    ]
});
