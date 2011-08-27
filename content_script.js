
function convert_video(info, tab) {
    $.getJSON('http://bananos.kiev.ua/gh/api.php?url='+tab.url, function (json){
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
            var notification = webkitNotifications.createNotification(
              'logo.png',
              'Download video from site',
              json.message
            );
            notification.show();
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
