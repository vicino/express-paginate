exports = module.exports;

exports.middleware = function (limit, maxLimit) {

  const _limit = (typeof limit === 'number') ? parseInt(limit, 10) : 10;

  const _maxLimit = (typeof maxLimit === 'number') ? parseInt(maxLimit, 10) : 50;

  return (req, res, next) => {

    req.query.page = (typeof req.query.page === 'string') ? parseInt(req.query.page, 10) || 1 : 1;

    req.query.limit = (typeof req.query.limit === 'string') ? parseInt(req.query.limit, 10) || 0 : _limit;

    if (req.query.limit > _maxLimit)
      req.query.limit = _maxLimit;

    if (req.query.page < 1)
      req.query.page = 1;

    if (req.query.limit < 0)
      req.query.limit = 0;

    req.skip = req.offset = (req.query.page * req.query.limit) - req.query.limit;

    next();
  };
};
