module.exports = function (app, nodemailer) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deepak@plumtreegroup.net',
      pass: '@iam2Reddy'
    }
  });

  app.post("/sendmail", function (req, res, next) {
      console.log(req.body);

      var mailOptions = {
        from: 'deepak@plumtreegroup.net',
        to: req.body.senderEmail,
        subject: 'Thanks for sending the gift',
        text: req.body.id
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  });
}
