// using module from core Node.js
const fs = require("fs");
const http = require("http");
const url = require("url");
// create web server using Nodejs

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
console.log(dataObject);

const server = http.createServer((req, res) => {
	const pathname = req.url;

	if (pathname === "/" || pathname === "/overview") {
		res.end("Overview Page");
	} else if (pathname === "/product") {
		res.end("Product Page");
	} else if (pathname === "/api") {
		res.writeHead(200, {
			"content-type": "application.json",
		});
		res.end(data); // send back data to browser
	} else {
		res.writeHead(404, {
			"content-type": "text/html",
			"my-own-header": "hello world",
		});
		res.end("<h1>Page not found</h1>");
	}
});
// listen request on this URL "http://127.0.0.1:9000/"
server.listen(9000, "127.0.0.1", () => {
	console.log("Listened to requests on  port 9000");
});
