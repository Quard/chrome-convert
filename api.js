/**
This will contain methods for API calls to
 
http://api.online-convert.com/queue-insert

**/

var queue = new Array();

ocapi = {
	
	// API key
	apiKey: '5d7c6b9862c6b8a9633ace4cf5fa1133',
		
	// This will submit specified URL to queue & return queue hashcode
	"submitVideo" : function(url, callback) {
		
		var content_type = "video";
		var to_format    = "convert-to-avi"
		
		var request = new XMLHttpRequest();
	    var xml = '<?xml version="1.0" encoding="utf-8" ?><queue><apiKey>'+ ocapi.apiKey +'</apiKey><targetType>'+ 
				  content_type +'</targetType><targetMethod>'+ to_format 
				  +'</targetMethod><testMode>true</testMode><sourceUrl>'+ escape(url) +'</sourceUrl></queue>';
	    var data = new FormData();

	    data.append('queue', xml);
	    request.open("POST", 'http://api.online-convert.com/queue-insert', false);

	    request.onreadystatechange = function(e) {
	        if (request.readyState == 4) {
	            if (request.status == 200) {
	                var dom = $($.parseXML(request.response));
	                // save result into internal storage
					// @todo: LocalStorage
					record = {
	                    url: url,
	                    status: dom.find('status code').text(),
	                    download_url: dom.find('params downloadUrl').text(),
	                    hash: dom.find('params hash').text(),
	                };
					
					// call external callback
					callback(record)
					queue.push(record);
					console.log('++')
	                console.log(queue);
	            }
	        }

	    }
	    request.send(data);					
	
	},

	// This will check the status of specified conversion process in OC queue by hashCode
	"checkStatus" : function() {
		for (var i=0; i<queue.length; i++) {
            var job = queue[i];
            if (job.status == 0) {
                var request = new XMLHttpRequest();
                var xml = '<?xml version="1.0" encoding="utf-8" ?><queue><apiKey>'+ apiKey +'</apiKey><hash>'+ job.hash +'</hash></queue>';
                var data = new FormData();

                data.append('queue', xml);
                request.open("POST", 'http://api.online-convert.com/queue-status', false);
                request.send(data);
                if (request.status == 200) {
                    var dom = $($.parseXML(request.response));
                    job.status = parseInt(dom.find('status code').text());
                    job.date_finish = dom.find('params dateProcessed').text();
                    job.direct_download = dom.find('params directDownload').text();
                    console.log('--')
                    console.log(queue);
                    if (job.status == 100) {
                        // ok, can donwload
                        local
                    }
                }
            }
        }
        setTimeout('ocapi.checkStatus()', 20000);

	}
}

setTimeout('ocapi.checkStatus()', 20000);
