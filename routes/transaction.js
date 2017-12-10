module.exports = function (app, dynamodb, uuidv1) {

  app.get("/finduser", function (req, res) {
      dynamodb
        .table('users')
        .select('email','displayName','firstname','lastname','userId')
        .having('email').eq(req.param('friend'))
        .scan(function( err, data ) {
            res.send(data);
      });
  });

  app.get("/findlink", function (req, res) {
      dynamodb
        .table('users')
        .select('email','displayName','firstname','lastname','userId')
        .having('userId').eq(req.param('link'))
        .scan(function( err, data ) {
            res.send(data);
      });
  });

  app.post("/transaction", function (req, res, next) {
      dynamodb
      	.table('transactions')
      	.insert({
      		id: uuidv1(),
      		amount: req.body.amount,
      		transId: req.body.transId,
      		userId: req.body.userId,
          paymentType: req.body.paymentType,
          senderId: req.body.senderId,
          senderEmail: req.body.senderEmail,
          senderFirstName: req.body.firstName,
          senderLastName: req.body.lastName,
          senderPhone: req.body.phone,
          responseType: req.body.response
      	}, function(err,data) {
      		  console.log( err, data )
      	})
    });
}
