'use strict';
module.exports = function(app) {
  var signup = require('../controllers/apiController');
  var UIview = require('../controllers/Controller');

   app.route('/api/signup')
   	.post(signup.create_new_user);

   app.route('/api/login')
   	.post(signup.login_email_password);

   app.route('/api/welcome/:user_email')
   	.get(signup.welcome_page);

   	//APIs required for Borrower
   	app.route('/api/borrower/:user_email')
   	  .post(signup.new_credit_request)
   	  .get(signup.all_credit_requests);

   	 //APIs required for Lender
   	 app.route('/api/lender/')
   	 	.get(signup.all_user_info_requests);
   	 app.route('/lender/:user_email/:id')
   	 	.put(signup.change_repayment);


  // app.route('/signup')
  //   .get(UIview.get_signup_page)

  // app.route('/login')
  //   .get(UIview.get_login_page);  
  };