
module.exports = (app, passport) => {
    app.get('/', function (req, res) {
        res.render('home');
    });


    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err || !user) {
                return res.redirect('/signup');
            }
            req.logIn(user, function(err) {
                if (err){
                    return res.redirect('/login');
                }
                return res.redirect('/profile');
            });
        })(req, res, next);
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-signin', function(err, user, info) {
            if (err || !user) {
                return res.redirect('/login');
            }

            req.logIn(user, function(err) {
                if (err){
                    return res.redirect('/login');
                }
                return res.redirect('/profile');
            });
        })(req, res, next);
    });

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.get('/signup', function (req, res) {
        res.render('signup');
    });


    app.get('/profile', function (req, res) {
        const user = req.user;
        res.render('profile', {
            user: user
        });
    });
}