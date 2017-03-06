var https = require('https');
var http = require('http');
var url = require('url');

var LineByLineReader = require('line-by-line'),
	lr = new LineByLineReader('alexa100kk.txt');

lr.on('line', function(line) {
	//console.log(line);
	// 'line' contains the current line without the trailing newline character.
	http.get('http://' + line, function(res) {
		//console.log("statusCode: ", res.statusCode); // <======= Here's the status code
		//console.log("headers: ", res.headers);
		if(res.statusCode == 200) {

			  http.get('http://' + line + '/crossdomain.xml', function(response) {
			  //console.log("statusCode: ", res.statusCode); // <======= Here's the status code
			  //console.log("headers: ", res.headers);
			  if(response.statusCode == 200) {
					  console.log('http://' + line + "/crossdomain.xml\n");
			  }
			  else if(response.statusCode == 403 || response.statusCode == 401) {
					  //console.log('Forbidden http://' + line + "/crossdomain.xml\n");
			  }

			  }).on('error', function(e) {
			  //console.error(e);
			  });
		}
		else if((res.statusCode == 301 || res.statusCode == 302) && res.headers.location != "") {
			//console.log(res.headers.location);
			whatp = url.parse(res.headers.location).protocol;
			//console.log(whatp);
			if(whatp == "http:") {

				  http.get(res.headers.location + 'crossdomain.xml', function(response) {
					  //console.log("statusCode: ", res.statusCode); // <======= Here's the status code
					  //console.log("headers: ", res.headers);
					  if(response.statusCode == 200) {
						  console.log(res.headers.location + "crossdomain.xml\n");
					  }

					  else if(response.statusCode == 403 || response.statusCode == 401) {
						  //console.log('Forbidden ' + res.headers.location + "crossdomain.xml\n");
					  }

				  }).on('error', function(e) {
				    console.error(e);
				  });

			}
			else if(whatp == "https:"){

				  https.get(res.headers.location + 'crossdomain.xml', function(response) {
					  //console.log("statusCode: ", res.statusCode); // <======= Here's the status code
					  //console.log("headers: ", res.headers);
					  if(response.statusCode == 200) {
						  console.log(res.headers.location + "crossdomain.xml\n");
					  }

					  else if(response.statusCode == 403 || response.statusCode == 401) {
						  //console.log('Forbidden ' + res.headers.location + "crossdomain.xml\n");
					  }

				  }).on('error', function(e) {
				    console.error(e);
				  });

			}
		}
	}).on('error', function(e) {
		//console.error(e);
	});
});
