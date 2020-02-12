const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = express();

app.use(async (req, res, next) => {
  next();

  const body = await getBodyString(req, res);

  if (body) {
    const $ = cheerio.load(body);
    console.log($('#ctl00_ContentPlaceHolder1_ctl30_lblDescricao02').text())
  }
});

app.use((req, res, next) => {
  req
    .pipe(request("http://pedidos.tupperware.com.br" + req.originalUrl))
    .pipe(res);
});

app.use((req, res, next) => {
  console.log("AI", res);
});

app.listen(3000);


async function getBodyString(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST" &&
      req.originalUrl === "/cav/Pedidos.aspx") {
      var oldWrite = res.write, oldEnd = res.end;
      var chunks = [];

      res.write = function (chunk) {
        chunks.push(chunk);
        oldWrite.apply(res, arguments);
      };

      res.end = function (chunk) {
        if (chunk)
          chunks.push(chunk);
        var body = Buffer.concat(chunks).toString("utf8");
        if (body.includes('2504|updatePanel|ctl00_msgMaster_updMsgBox|')) {
          resolve(body);
        } else {
          resolve(null);
        }
        oldEnd.apply(res, arguments);
      };
    } else {
      resolve(null);
    }
  });

  
}
// res.on("response", function(response) {
//   if (
//     req.method === "POST" &&
//     req.originalUrl === "/cav/Pedidos.aspx" &&
//     response.headers["content-type"] === "text/plain; charset=utf-8"
//   ) {
//     response.on('data', function(data) {
//       if (data.includes('2504|updatePanel|ctl00_msgMaster_updMsgBox|')) {
//         // const $ = cheerio.load(data);
//         // console.log($('#ctl00_ContentPlaceHolder1_ctl42_lblAux02'))
//         console.log('AQUIIII');
//         console.log(data.toString().length)

//         // const dom = new JSDOM(data.toString().split('ctl00_ContentPlaceHolder1_lblTitleD')[1]);
//         // console.log(dom
//         //   .window
//         //   .document
//         //   .body
//         //   // .querySelector('#ctl00_ContentPlaceHolder1_ctl30_divProduto03')
//         //   .outerHTML
//         // )
//       }
//     })
//   }
// })
