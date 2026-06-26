// using module from core Node.js
const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = (temp, el) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, el.productName);
	output = output.replace(/{%IMAGE%}/g, el.image);
	output = output.replace(/{%PRICE%}/g, el.price);
	output = output.replace(/{%FROM%}/g, el.from);
	output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
	output = output.replace(/{%QUANTITY%}/g, el.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, el.description);
	output = output.replace(/{%ID%}/g, el.id);
	return output;
};
// read file synchronous
const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	"utf-8",
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	"utf-8",
);
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	"utf-8",
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

// ------------------ server------------------
const server = http.createServer((req, res) => {
	const pathname = req.url;

	if (pathname === "/" || pathname === "/overview") {
		const cardsContent = dataObject.map((el) => replaceTemplate(tempCard, el));
		const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsContent);
		res.end(output);
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
