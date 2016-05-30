'use strict';

// Note: My new understanding of the techniques page is that the basics should be provided to them,
// and then they should be able to add additional/advanced skills later 
var skillList = require('./resources/skills'); 

var profile = {
  getSkills: function(req, res, next) {
  	var query = { userId: req.params.id };
  	req.app.db.models.Skills.findOne(query, function(err, found) {
  		console.log(found);

  		if (err) 
  			next(err);
  		if (!found)
  			found = skillList;

  		res.status(200).json({ "skills": found });
  	});
  },
  saveSkills: function(req, res, next) {
  	var query = {
  		userId: req.params.id,
  	};
  	var fieldsToSet= {
  		divisions: req.body
  	};
  	var options = {
  		new: true,
  		upsert: true
  	};
  	console.log(fieldsToSet);
  	console.log(query);
  	req.app.db.models.Skills.findOneAndUpdate(query, fieldsToSet, options, function(err, doc){
  		console.log(doc);
  		if (err) {
  			console.log("ERROR!" + err);
  			next(err);
  		}
      
      res.sendStatus(doc ? 200 : 400);
  	});
  
}


};

module.exports = profile;