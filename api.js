/**
This will contain methods for API calls to
 
http://api.online-convert.com/queue-insert

**/


ocapi = {
	
	
	// This will submit specified URL to queue & return queue hashcode
	"submitVideo" : function(url, callback) {
		console.log("We are here!");
		
		var hashCode = "Myhashccode"
		// todo: receive hashcode from remote service & pass it to callback
		callback(hashCode);
	},
	
	// This will check the status of specified conversion process in OC queue by hashCode
	"checkStatus" : function(hashCode, callback) {
		
		return "Blyaaa!"
	}
	
	
}