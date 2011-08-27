/**
This will contain methods for API calls to
 
http://api.online-convert.com/queue-insert

**/

function insertToQueue(url, content_type, to_format) {
    var request = new XMLHttpRequest();
    var xml = '<?xml version="1.0" encoding="utf-8" ?><queue><apiKey>'+ apiKey +'</apiKey><targetType>'+ content_type +'</targetType><targetMethod>'+ to_format +'</targetMethod><testMode>true</testMode><sourceUrl>'+ escape(url) +'</sourceUrl></queue>';
    var data = new FormData();
    
    data.append('queue', xml);
    request.open("POST", 'http://api.online-convert.com/queue-insert', false);
    request.send(data);
    request.onload = function(e) {
        //if (request.status == 200) {
                var dom = request.responseXML;
                //alert(dom);
				console.log(dom)
        //}
    }
}


ocapi = {
	
	// API key
	apiKey: '5d7c6b9862c6b8a9633ace4cf5fa1133',
	
	// This will submit specified URL to queue & return queue hashcode
	"submitVideo" : function(url, callback) {
		
		// insertToQueue(url, 'video', 'convert-to-avi');
		
		var content_type = "video";
		var to_format    = "convert-to-avi" 
		var request = new XMLHttpRequest();
	    var xml = '<?xml version="1.0" encoding="utf-8" ?><queue><apiKey>'+ ocapi.apiKey +'</apiKey><targetType>'+ content_type +'</targetType><targetMethod>'+ to_format +'</targetMethod><testMode>true</testMode><sourceUrl>'+ escape(url) +'</sourceUrl></queue>';
	    var data = new FormData();

	    data.append('queue', xml);
	    request.open("POST", 'http://api.online-convert.com/queue-insert', false);
	    request.send(data);
	    request.onload = function(e) {
	        //if (request.status == 200) {
	                var dom = request.responseXML;
	                //alert(dom);
					console.log(dom)
	        //}
	    }
		
		
		var hashCode = "Myhashccode"
		
		
		// todo: receive hashcode from remote service & pass it to callback
		callback(hashCode);
	},
	
	// This will check the status of specified conversion process in OC queue by hashCode
	"checkStatus" : function(hashCode, callback) {
		
		return "Blyaaa!"
	}
	
	
}