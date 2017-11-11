'use strict';

exports.get_signup_page = function(req, res) {
  res.render('signup', { title: 'Hello, World!' });
};

exports.get_login_page = function(req, res) {
  res.render('login', { title: 'Hello, World!' });
};