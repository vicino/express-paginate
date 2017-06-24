const paginate = require('../lib/index');
const { assert } = require('chai');

describe('express-paginate', () => {
  let req;

  beforeEach(() => {
    req = {
      query: {
        page: '2',
        limit: '20',
      },
    };
  });

  it('should use default values of page=1 and limit=10', () => {
    delete req.query.page;
    delete req.query.limit;

    const middleware = paginate();
    middleware(req, {}, () => { });
    assert.equal(req.query.page, 1);
    assert.equal(req.query.limit, 10);
    assert.equal(req.skip, 0);
  });

  it('should enforce default maxLimit of 50', () => {
    req.query.limit = '100';
    const middleware = paginate();
    middleware(req, {}, () => { });
    assert.equal(req.query.limit, 50);
    assert.equal(req.skip, 50);
  });

  it('should enforce custom maxLimit', () => {
    req.query.limit = '100';
    const middleware = paginate('10', '75');
    middleware(req, {}, () => { });
    assert.equal(req.query.limit, 75);
    assert.equal(req.skip, 75);
  });

  it('should enforce page >= 1 and default to 1', () => {
    req.query.page = '-100';
    const middleware = paginate();
    middleware(req, {}, () => { });
    assert.equal(req.query.page, 1);
  });

  it('should enforce limit > 0 and default to 10', () => {
    req.query.limit = '-100';
    const middleware = paginate();
    middleware(req, {}, () => { });
    assert.equal(req.query.limit, 10);
    assert.equal(req.skip, 10);
  });

  it('should enforce limit > 0 and use custom limit', () => {
    req.query.limit = '-100';
    const middleware = paginate(75);
    middleware(req, {}, () => { });
    assert.equal(req.query.limit, 75);
    assert.equal(req.skip, 75);
  });

  it('should call next', (done) => {
    req.query.limit = '-100';
    const middleware = paginate(75);
    middleware(req, {}, done);
  });
});
