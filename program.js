var fs = require('fs');
var _ = require('lodash');

fs.readFile('./pagespeed.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var rows = _.map(JSON.parse(data), function(row) {
      return JSON.parse(row.raw_result);
    });
    var rows = _.reduce(rows, function(results, row) {
      return results.concat(_.map(getImpactResults(row), getNameAndValue));
    }, []);
    var byName = _.groupBy(rows, function(row) {
        return row.name;
    });
    _.map(byName, function(issues, name) {
        console.log([
            name,
            issues.length,
            totalValues(issues),
            avgValues(issues)
        ].join(','));
    });
});

var totalValues = function(issues) {
  return _.round(_.sumBy(issues, 'value'), 2);
};

var avgValues = function(issues) {
  return _.round(_.meanBy(issues, 'value'), 2);
};

var getScore = function(row) {
  return row.ruleGroups.SPEED.score;
};

var getId = function(row) {
  return row.id;
};

var getResourceCount = function(row) {
  return row.pageStats.numberResources;
};

var getImpactResults = function(row) {
  return _.filter(row.formattedResults.ruleResults, function(result) {
    return result.ruleImpact > 0;
  });
};

var getNameAndValue = function(result) {
  return {
    name: result.localizedRuleName,
    value: result.ruleImpact
  };
};

var transform = function(row) {
  return {
    score: getScore(row),
    resourceCount: getResourceCount(row),
    issues: _.map(getImpactResults(row), getNameAndValue)
  };
};
