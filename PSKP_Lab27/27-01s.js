const { ServerDH, cipherFile } = require("./DH");
const fs = require("fs");
const app = require("express")();
const bodyParser = require("body-parser");
let serverDH;
let serverSecret;
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  serverDH = new ServerDH(1024, 3);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(serverDH.getContext()));
});

app.get("/resource", (req, res, next) => {
  if (serverSecret !== undefined) {
    res.statusCode = 200;
    let readStream = fs.createReadStream("./encrypted.txt");
    readStream.pipe(res);
    readStream.on("close", () => {
      console.log(readStream.bytesRead);
      res.end();
    });
  } else {
    res.statusCode = 409;
    res.end("Set key");
  }
});

app.post("/key", (req, res, next) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const clientContext = JSON.parse(body);
    if (clientContext.key_hex !== undefined) {
      serverSecret = serverDH.getSecret(clientContext);
      console.log("serverSecret:", serverSecret);
      res.writeHead(200, { "Content-Type": "text/plain" });
      const key = Buffer.alloc(32);
      serverSecret.copy(key, 0, 0, 32);

      const rs = fs.createReadStream("./file.txt");
      const ws = fs.createWriteStream("./encrypted.txt");
      cipherFile(rs, ws, key);
      res.end("Success");
    } else {
      res.statusCode = 409;
      res.end("Failure");
    }
  });
});

app.listen(3000, () => {
  console.log("localhost:3000");
});
