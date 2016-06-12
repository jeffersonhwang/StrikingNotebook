'use strict';

// Note: My new understanding of the techniques page is that the basics should be provided to them,
// and then they should be able to add additional/advanced skills later 
var skillList = require('./resources/skills'); 

var profile = {
  getSkills: function(req, res, next) {
  	var query = { userId: req.params.id };
  	req.app.db.models.Skills.findOne(query, function(err, found) {
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

  	req.app.db.models.Skills.findOneAndUpdate(query, fieldsToSet, options, function(err, doc) {
  		if (err) {
  			console.log("ERROR!" + err);
  			next(err);
  		}
      
      res.sendStatus(doc ? 200 : 400);
  	});
  },
  getRecentActivity: function(req, res, next) {
    console.log(req.user.id);
    req.app.db.models.Activity.find({ userId: req.user.id })
      .sort({ lastModified: -1 })
      .limit(15)
      .exec(function(err, activity) {
        if (err) {
          next(err);
        }

        res.status(200).json({ "activity": activity });
      });
  }

};

module.exports = profile;