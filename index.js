var http = require("http");
var url = require("url");
var querystring = require("querystring");

// Create a server object
http
  .createServer(function (req, res) {
    var parsedUrl = url.parse(req.url);
    var query = querystring.parse(parsedUrl.query);

    // Extract status code from URL path; default to 200 if not provided
    var statusCode = parseInt(parsedUrl.pathname.slice(1)) || 200;

    // Extract sleep time from query string; default to 0 if not provided
    var sleepTime = parseInt(query.sleep) || 0;

    // Check if the status code is a valid HTTP status code
    if (isValidStatusCode(statusCode)) {
      // Sleep for the specified time
      setTimeout(function () {
        res.statusCode = statusCode;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            Message: `Responded with status code ${statusCode} after ${sleepTime} seconds`,
            Status: statusCode,
          }),
        );
      }, sleepTime * 1000); // Convert seconds to milliseconds
    } else {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          Message: "Invalid status code",
          Status: 400,
        }),
      );
    }
  })
  .listen(8080); // The server object listens on port 8080

// Function to check if the status code is a valid HTTP status code
function isValidStatusCode(code) {
  return (
    code >= 100 && code < 600 // Check if code is within the range of standard HTTP status codes
  );
}

console.log("Server listening on port 8080");
