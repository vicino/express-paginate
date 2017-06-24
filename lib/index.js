function getDefaultLimit(_limit) {
  return parseInt(_limit, 10) || 10;
}

function getMaxLimit(max) {
  return parseInt(max, 10) || 50;
}

/**
 * @param _limit {Number} The default limit to use.
 * @param _maxLimit {Number} The maxLimit to use.
 */

function middleware(_limit, _maxLimit) {
  const defaultLimit = getDefaultLimit(_limit);
  const maxLimit = getMaxLimit(_maxLimit);

  return (req, res, next) => {
    req.query.page = parseInt(req.query.page, 10) || 1;
    req.query.limit = parseInt(req.query.limit, 10) || defaultLimit;

    if (req.query.limit > maxLimit) {
      req.query.limit = maxLimit;
    }

    if (req.query.page < 1) {
      req.query.page = 1;
    }

    if (req.query.limit < 0) {
      req.query.limit = defaultLimit;
    }

    req.skip = (req.query.page * req.query.limit) - req.query.limit;

    next();
  };
}

module.exports = middleware;
