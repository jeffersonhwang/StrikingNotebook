'use strict';
// public api
var translateToActionVerb = function(verb) {
	var translatedVerb = null;
	switch(verb) {
		case 'PUT':
			translatedVerb = 'Update';
			break;
		case 'POST':
			translatedVerb = 'Added';
			break;
		case 'DELETE':
			translateVerb = 'Removed';
			break;
  	}

  	return translatedVerb;
};

var activity = {
  intercept: function(req, res, next) {
  	var method = req.originalMethod;
  	var actionVerb = translateToActionVerb(method);

  	if (actionVerb !== null) {
  		console.log("Intercepted " + actionVerb + "!");

	  	var Activity = req.app.db.models.Activity;
	  	var interception = new Activity({
	  		userId: req.user.id,
		    action: {
		      verb: actionVerb,
		      actionItem: req.originalUrl
		    }
	    });
	    interception.save(function(err){
	    	console.log("Intercepted activity saved!");
	    	if (err) {
	    		console.log(err);
	    	}
	    });
  		console.log(req);
  	}
    next();
  }
};
module.exports = activity;