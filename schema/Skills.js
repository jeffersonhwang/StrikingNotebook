'use strict';

exports = module.exports = function(app, mongoose) {
  var skillsSchema = new mongoose.Schema({
    userId: Number,
    lastModified: { type: Date, default: Date.now },
    division: [{ 
      name: String,
      categories: [{
        name: String,
        types: [{
          name: String,
          count: Number,
          notes: String
        }]
      }]
    }]
    // the other schemas have "search: [String]", what's the purpose of that?
  });

  skillsSchema.index({userId: 1});
  app.db.model('Skills', skillsSchema);
};
