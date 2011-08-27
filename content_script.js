
function convert_video(info, tab) {
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
