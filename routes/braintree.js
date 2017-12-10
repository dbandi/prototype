module.exports = function (app, braintree) {

  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: '52qpyjy54zkrrvhb',
    publicKey: 'z73yffmk9rtcd9kn',
    privateKey: 'cc4ac13fd0f7e4805f851f2bb9e1b625'
  });

  app.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
      res.send(response.clientToken);
    });
  });

  app.post("/checkout", function (req, res, next) {
    console.log(req.body);
    gateway.customer.create({
        firstName: req.body.payment.senderFirstName,
        lastName: req.body.payment.senderLastName,
        email: req.body.payment.senderEmail,
        phone: req.body.payment.senderPhone
    }, function (err, result) {

        let creditCardParams = {
            customerId: result.customer.id,
            number: req.body.payment.cardNumber,
            expirationDate: req.body.payment.expirationDate,
            cvv: req.body.payment.cvv
        };

        gateway.creditCard.create(creditCardParams, function (err, response) {
            gateway.paymentMethodNonce.create(response.creditCard.token, function(nounceErr, nounceResponse) {
                gateway.transaction.sale({
                  amount: req.body.payment.amount,
                  paymentMethodNonce: nounceResponse.paymentMethodNonce.nonce,
                  options: {
                    submitForSettlement: true
                  }
                }, function (transactionErr, transactionResult) {
                    res.send(transactionResult);
                });
            });
        });
    });



    /*gateway.paymentMethodNonce.create("A_PAYMENT_METHOD_TOKEN", function(err, response) {
      console.log(response);
      var nonce = response.paymentMethodNonce.nonce;
      console.log(nonce);
      gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          console.log(result);
          res.send(200);
      });
    });*/


  });
}
