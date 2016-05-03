var fs = require('fs');
var _ = require('lodash');

fs.readFile('./pagespeed.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var row = JSON.parse(JSON.parse(data)[0].raw_result);
    console.log('row: ', getScore(row), ' numResources: ', getResourceCount(row));
    // _.forEach(JSON.parse(data), function (row) {
    //   console.log(row);
    // });
});


var getScore = function(row) {
  return row.ruleGroups.SPEED.score;
};

var getResourceCount = function(row) {
  return row.pageStats.numberResources;
};
