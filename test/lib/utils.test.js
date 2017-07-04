const q = require('q');
const rewire = require('rewire');
const taabConst = require('../../lib/const');
const taabUtils = rewire('../../lib/utils');

const getSpy = sinon.spy();
const postSpy = sinon.spy();
const putSpy = sinon.spy();
const delSpy = sinon.spy();
const querySpy = sinon.spy();
const sendSpy = sinon.spy();
const endSpy = sinon.spy();

const happyEnding = (callback) => {
  endSpy();
  callback(null, {body: 'expected_body'});
};
const sadEnding = (callback) => {
  endSpy();
  callback('error', null);
};
const mockConfig = {
  key: 'key',
  token: 'token',
};
const mockRequest = {
  get: (url) => {
    getSpy(url);
    return mockRequest;
  },
  post: (url) => {
    postSpy(url);
    return mockRequest;
  },
  put: (url) => {
    putSpy(url);
    return mockRequest;
  },
  del: (url) => {
    delSpy(url);
    return mockRequest;
  },
  query: () => {
    querySpy();
    return mockRequest;
  },
  send: (data) => {
    sendSpy(data);
    return mockRequest;
  },
  end: happyEnding,
};

taabUtils.__set__({
  request: mockRequest,
});

console.log(taabUtils.__get__('request'));

describe('taab utils', () => {
  it('has the correct properties/methods', () => {
    expect(taabUtils).to.contain.keys([
      'createUrl',
      'createApiHandler',
    ]);
  });

  context('.createUrl()', () => {
    it('works as expected', () => {
      expect(taabUtils.createUrl('a')).to.equal(`${taabConst.urlStub}/a`);
      expect(taabUtils.createUrl('/a')).to.equal(`${taabConst.urlStub}/a`);
      expect(taabUtils.createUrl('/a/b')).to.equal(`${taabConst.urlStub}/a/b`);
    });
  });

  context('.createApiHandler()', () => {
    beforeEach(() => {
      getSpy.reset();
      postSpy.reset();
      putSpy.reset();
      delSpy.reset();
      querySpy.reset();
      sendSpy.reset();
      endSpy.reset();
    });

    it('returns a function', () => {
      expect(taabUtils.createApiHandler()).to.be.a('function');
    });

    it('returns a function that returns a promise if no arguments are provided', () => {
      const getHandler = taabUtils.createApiHandler('get', '/', {}, mockConfig);
      const getHandlerResponse = getHandler();
      expect(Object.getPrototypeOf(getHandlerResponse))
        .to.deep.equal(Object.getPrototypeOf(q.defer().promise));
    });

    it('returns a function that does a callback if callback is provided', (done) => {
      const getHandler = taabUtils.createApiHandler('get', '/', {}, mockConfig);
      getHandler((err, res) => { done(); });
    });

    it('includes the appropriate parameters', (done) => {
      const mockParameters = {params: {a: 1}, options: {b: 2}};
      const getHandler = taabUtils.createApiHandler('get', '/', mockParameters, mockConfig);
      getHandler((err, res) => {
        try {
          expect(sendSpy).to.have.been.calledWith(mockParameters);
        } catch(ex) { done(ex); }
        done();
      });
    });

    it('generates the correct url', (done) => {
      const mockUrl = '/expected_url';
      const getHandler = taabUtils.createApiHandler('get', mockUrl, {}, mockConfig);
      getHandler((err, res) => {
        try {
          expect(getSpy).to.have.been.calledWith(taabUtils.createUrl(mockUrl));
          done();
        } catch(ex) { done(ex); }
      });
    });

    it('executes as expected for happy HTTP GETs', (done) => {
      const getHandler = taabUtils.createApiHandler('get', '/', {}, mockConfig);
      getHandler().then((res) => {
          expect(res).to.deep.equal('expected_body');
          expect(getSpy).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('executes as expected for happy HTTP POSTs', (done) => {
      const postHandler = taabUtils.createApiHandler('post', '/', {}, mockConfig);
      postHandler().then((res) => {
          expect(res).to.deep.equal('expected_body');
          expect(postSpy).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('executes as expected for happy HTTP PUTs', (done) => {
      const putHandler = taabUtils.createApiHandler('put', '/', {}, mockConfig);
      putHandler().then((res) => {
          expect(res).to.deep.equal('expected_body');
          expect(putSpy).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('executes as expected for happy HTTP DELETEs', (done) => {
      const delHandler = taabUtils.createApiHandler('del', '/', {}, mockConfig);
      delHandler().then((res) => {
          expect(res).to.deep.equal('expected_body');
          expect(delSpy).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('executes as expected for sad HTTP GETs', (done) => {
      mockRequest.end = sadEnding;
      const getHandler = taabUtils.createApiHandler('get', '/', {}, mockConfig);
      getHandler().then(done)
        .catch((error) => {
          done();
        });
    });

    it('executes as expected for sad HTTP POSTs', (done) => {
      mockRequest.end = sadEnding;
      const postHandler = taabUtils.createApiHandler('post', '/', {}, mockConfig);
      postHandler().then(done)
        .catch((error) => {
          done();
        });
    });

    it('executes as expected for sad HTTP PUTs', (done) => {
      mockRequest.end = sadEnding;
      const putHandler = taabUtils.createApiHandler('put', '/', {}, mockConfig);
      putHandler().then(done)
        .catch((error) => {
          done();
        });
    });

    it('executes as expected for sad HTTP DELETEs', (done) => {
      mockRequest.end = sadEnding;
      const delHandler = taabUtils.createApiHandler('del', '/', {}, mockConfig);
      delHandler().then(done)
        .catch((error) => {
          done();
        });
    });
  });
});
