'use strict';

exports = module.exports = function(app, mongoose) {
  var activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: {
      verb: String,
      actionItem: String
    },
    lastModified: { type: Date, default: Date.now }
  });
  activitySchema.index({ user: 1, lastModified: -1});
  app.db.model('Activity', activitySchema);
};
