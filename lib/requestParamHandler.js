'use strict';

var contentProviderFactory = require('../lib/contentProviderFactory'),
    oauth = require('./oauth');

var createProviderFromRequest = function (req) {
  if (req.params.githubUser !== undefined &&
      req.params.githubRepository !== undefined) {
    var provider = contentProviderFactory.create('github',
                                          req.params.githubUser,
                                          req.params.githubRepository);
    if (oauth.hasSession(req)) {
      provider.oauth = oauth.getOAuthToken(req);
    }

    return provider;
  }

  return null;
};

module.exports.createProviderFromRequest = createProviderFromRequest;
