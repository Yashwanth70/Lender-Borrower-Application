'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SignUpSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter your name'
  },
  email: {
    type: String,
    required: 'Kindly enter your email'
  },
  password: {
  	type: String,
  	required: 'Kindly input the password'
  },
  role: {
        type: [{
            type: String,
            enum: ['borrower', 'lender']
        }],
        default: 'borrower'
    },
   creditlimit: {
   		type: Number,
   		default : '100000'
   },
   creditRequest: [{
   	amount :{
   		type: Number,
   		default: 0
   	},
   	repaymentdate: {
   		type: Date,
   		default: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
   	},
   	isRepaymentDone: {
   		type: [{
      type: String,
      enum: ['Yes', 'No']
    }],
    default: 'No'
   	}
   }]
});

module.exports = mongoose.model('SignUp', SignUpSchema);