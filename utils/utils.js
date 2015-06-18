var getRequestData = function(httpRes, callback) {
  // Collect the data from an http response
  var data = '';
  httpRes.setEncoding('utf8');

  httpRes.on('data', function(chunk) {
    data += chunk;
  });

  httpRes.on('end', function() {
    callback(data);
  });
};

module.exports = {
  getRequestData: getRequestData
}
