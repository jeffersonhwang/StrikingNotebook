'use strict';

exports = module.exports = function(app, mongoose) {
  var skillsSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, ref: 'Account'},
    lastModified: { type: Date, default: Date.now },
    divisions: [{ 
      name: String,
      categories: [{
        name: String,
        types: [{
          name: String,
          mastery: String,
          notes: String
        }]
      }]
    }]
    // the other schemas have "search: [String]", what's the purpose of that?
  });

  skillsSchema.index({userId: 1});
  app.db.model('Skills', skillsSchema);
};
