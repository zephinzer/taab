const path = require('path');
const q = require('q');
let request = require('superagent');

const taabConst = require('./const');

const taabUtils = {
  createApiHandler: function(method, uri, parameters) {
    const {config} = this;
    if(typeof config.key === 'undefined' && typeof config.token === 'undefined') {
      throw new Error('key and token not defined');
    }
    return function(callback) {
      const deferred = (typeof callback === 'function') ? {} : q.defer();
      const url = taabUtils.createUrl(uri);
      const {key, token} = config;
      const data = {};
      for(const paramKey in parameters) {
        if(paramKey.indexOf('_') !== 0) {
          data[paramKey] = parameters[paramKey];
        }
      }
      request[method](url)
        .query({key, token})
        .send(data)
        .end((err, res) => {
          if(err) {
            if(deferred.reject) {
              deferred.reject(err);
            } else { callback(err, null); }
          } else {
            if(deferred.resolve) {
              deferred.resolve(res.body);
            } else { callback(null, res.body); }
          }
        });
      return deferred.promise;
    };
  },
  createMissingArgumentMessage: function(missingVariables) {
    return new Error(missingVariables.concat(
      ' are required parameters that were not found.'
    ));
  },
  createUrl: function(uri) {
    return path.join(taabConst.urlStub, uri)
      .replace(/\/\//gi, '/')
      .replace(/:\//, '://');
  },
};

module.exports = taabUtils;
