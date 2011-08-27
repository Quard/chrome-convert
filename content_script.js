function notify(message) {
	// Create a simple text notification:
	var notification = webkitNotifications.createNotification(
	  'logo.png',  // icon url - can be relative
	  'Download video from site',  // notification title
	  // message body 
	  message
	);

	// Then show the notification.
	notification.show();
}
function convert_video(info, tab) {
    $.getJSON('http://bananos.kiev.ua/gh/api.php', {url: tab.url}, function (json){
        if (json.code == 200) {
            for (var i=0; i<json.cookies.length; i++) {
                var cookie = json.cookies[i];
                chrome.cookies.set({
                    url: json.url,
                    domain: cookie.domain,
                    path: cookie.path,
                    name: cookie.name,
                    value: cookie.value,
                    expirationDate: parseInt(cookie.expires),
                });
            }
            chrome.tabs.create({url: json.download_link})
        } else {
            notify(json.message);
        }
    });
}

chrome.pageAction.onClicked.addListener(function(tab) {
    convert_video({}, tab);
});

/* inject "Download" link into page/link context menus */

var video_menu = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("download_video"),
    "contexts": ["page", "link"],
    "onclick": convert_video,
    "documentUrlPatterns": [
        '*://video.google.com/*',
        '*://*.youtube.com/watch*',
        '*://*.metacafe.com/watch/*',
        '*://*.photobucket.com/*',
        '*://*.yahoo.com/?vid=*',
        '*://video.yahoo.com/*',
        '*://*.dailymotion.com/video/*',
        '*://*.facebook.com/video/video.php*',
    ]
});
