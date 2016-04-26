Fiber = Npm.require('fibers')

// server
Npm.require('net').createServer(function (socket) {
    console.log("connected");

    socket.on('data', function (data) {

      socket.write("hello!");

      var o = JSON.parse(data.toString());
      console.log(o);


      Fiber(function () {
        console.log('Meteor code is executing');
        //=> Meteor code
      }).run();
      //console.log(data.toString());
      //socket.close();
    });
  })

  .listen(3003);
