Analyze page speed results to find the issues


```sql
select
  raw_result
from
  site_pagespeedresult
where
  batch_id = 15
and
  score < 90
```

then take those results and dump them in: `pagespeed.json`


then run `node program.js` and see output.
