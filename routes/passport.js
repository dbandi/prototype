module.exports = function (app, passport, GoogleStrategy, dynamodb, uuidv1) {

    passport.use(new GoogleStrategy({
      clientID: '1050835058852-cmniek05f0tdotj4ikp54s8qvvgbd9j4.apps.googleusercontent.com',
      clientSecret: 'LjnSZOwA95bL6hvKMYjWPc_Q',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      profileFields: ['id', 'email', 'gender', 'displayName', 'name', 'provider']
    },
    function(accessToken, refreshToken, profile, cb) {
        if (profile) {
            user = profile;
            passport.serializeUser(function(user, done) {
                done(null, user);
            });
            passport.deserializeUser(function(user, done) {
                done(null, user);
            });
            return cb(null, user);
        }
        else {
            return cb(null, false);
        }
    }
  ));

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
    function(req, res) {
      console.log(req.user.id);
      dynamodb
        .table('users')
        .select('userId')
        .where('userId').eq(req.user.id)
        .get(function( err, data ) {
            console.log(data);
            if(Object.keys(data).length === 0 && data.constructor === Object){
              dynamodb
                .table('users')
                .insert({
                  id: uuidv1(),
                  userId: req.user.id,
                  email: req.user.emails[0].value,
                  firstname: req.user.name.givenName,
                  lastname: req.user.name.familyName,
                  displayName : req.user.displayName,
                  provider: req.user.provider,
                  created_at: new Date().getTime(),
                  updated_at: null
                }, function(err,data) {
                  res.redirect('/account');
                })
            }
            else{
                res.redirect('/account');
            }
      })

  });

  app.get("/getuser", function (req, res) {
      if(typeof req.user!='undefined'){
          res.send(req.user);
      }
      else {
          res.send("");
      }
  });

  app.get('/logout', function(req, res) {
      req.session.destroy(function(e){
          req.logout();
          res.redirect('/');
      });
  });

}
