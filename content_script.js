var conversion_page='?external_url='
var links = {
  image: 'http://image-conversion.online-convert.com/',
  ebook: 'http://ebook-conversion.online-convert.com/',
  doc:   'http://document-conversion.online-convert.com/',
  video: 'http://video-conversion.online-convert.com/',
  audio: 'http://audio-conversion.online-convert.com/'
}

function convert_image(info, tab) {
   var img_url = info.linkUrl || info.srcUrl;
   var url = links.image+conversion_page+img_url;  
   window.open(url);
}

function convert_ebook(info, tab) {
   var url = links.ebook+conversion_page+info.pageUrl;  
   window.open(url);
}

function convert_doc(info, tab) {
   chrome.tabs.sendRequest(tab.id, {"msg": "findImages"}, function(r){
     images = "";
     for (img in r.images) 
       images += r.images[img].url;
     alert(images);
   });

   var url = links.doc+conversion_page+(info.linkUrl || info.pageUrl);  
//   window.open(url);
}

function convert_video(info, tab) {
   var url = links.video+conversion_page+info.pageUrl;  
   window.open(url);
}

function convert_audio(info, tab) {
   var url = links.audio+conversion_page+info.linkUrl;  
   window.open(url);
}

var image_menu = chrome.contextMenus.create({"title": chrome.i18n.getMessage("convert_image"),
                                             "contexts": ["image"],
                                             "onclick": convert_image});

var ebook_menu = chrome.contextMenus.create({"title": chrome.i18n.getMessage("convert_ebook"),
                                             "contexts": ["page"],
                                             "onclick": convert_ebook});

var doc_menu = chrome.contextMenus.create({"title": chrome.i18n.getMessage("convert_doc"),
                                           "contexts": ["page", "link"],
                                           "onclick": convert_doc});

var video_menu = chrome.contextMenus.create({"title": chrome.i18n.getMessage("convert_video"),
                                           "contexts": ["page"],
                                           "onclick": convert_video
//                                           "documentUrlPatterns": ['*://*.youtube.com/watch*',
//                                                                   '*://vimeo.com/*',
//                                                                   '*://5min.com/*',
//                                                                   ]
                                                                   });


var audio_menu = chrome.contextMenus.create({"title": chrome.i18n.getMessage("convert_audio"),
                                           "contexts": ["link"],
                                           "onclick": convert_audio});
