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

  app.get("/checkout", function (req, res) {
    //var nonceFromTheClient = req.body.payment_method_nonce;
    gateway.transaction.sale({
      amount: "10.00",
      paymentMethodNonce: 'fake-valid-nonce',
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
        console.log(result);
        res.send(200);
    });
  });
}
