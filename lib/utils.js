const path = require('path');
const q = require('q');
const request = require('superagent');
const taabConst = require('./const');

const taabUtils = {
  createUrl: function(uri) {
    return path.join(taabConst.urlStub, uri).replace(/:\//, '://');
  },
  /**
   * @returns {Promise}
   */
  createApiHandler: function(method, uri, parameters) {
    return function(callback) {
      const deferred = (typeof callback === 'function') ? {} : q.defer();
      const url = taabUtils.createUrl(uri);
      const {key, token} = this.config;
      const data = {};
      for(var paramKey in parameters) {
        data[paramKey] = parameters[paramKey];
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
        })
      return deferred.promise;
    }
  }
};

module.exports = taabUtils;
