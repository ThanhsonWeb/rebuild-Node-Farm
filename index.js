// using module from core Node.js
const fs = require("fs");
const http = require("http");
const url = require("url");
// create web server using Nodejs
const server = http.createServer((req, res) => {
	const pathname = req.url;

	if (pathname === "/" || pathname === "/overview") {
		res.end("Overview Page");
	} else if (pathname === "/product") {
		res.end("Product Page");
	} else if (pathname === "/api") {
		console.log("api");
	}else {
      
   }
});

server.listen(9000, "127.0.0.1", () => {
	console.log("Listened to requests on  port 9000");
});
