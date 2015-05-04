var app = require('http').createServer(handler), 
    io = require('socket.io').listen(app),
    fs = require('fs'),
    // setting up plotly authentication
    plotly = require('plotly')("saba_offline", "gjiukkw7dh");

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/client/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

//   Using Plotly Chart API to Make a chart
//   After running this code, a http link will show up in your console.
//   Related chart is accessible through that link.

      var trace1 = {
       x: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"], 
       y: [8, 2, 10, 11, 9, 5, 16, 17, 18, 10], 
        name: "Correct Answers", 
        type: "bar"
      };
      var trace2 = {
        x: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"],   
        y: [12, 18, 10, 9, 11, 15, 4, 3, 2, 10], 
        name: "Wrong Answers", 
        type: "bar"
      };
      var data = [trace1, trace2];
      var layout = {barmode: "group"};
      var graphOptions = {layout: layout, filename: "grouped-bar", fileopt: "overwrite"};
      plotly.plot(data, graphOptions, function (err, msg) {
         console.log(msg);
      });  
//


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

