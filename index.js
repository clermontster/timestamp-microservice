const express = require('express');
const moment = require('moment');
const app = express();
const bodyparser = require('body-parser');
const { get } = require('lodash'); 

function getUnixTime(date) {
  const unixTime = new Date(date);
  console.log('unixTime',Date.parse(unixTime));
  return Date.parse(unixTime)/1000;
}

function getNaturalTime(timestamp) {
  var options = {
    'month': 'long',
    'day': '2-digit',
    'year': 'numeric',
    'timeZone': 'UTC',
  };
  console.log('timestamp',timestamp);
  return new Date(timestamp * 1000).toLocaleDateString('US-EN',options);
}

app.get('/:date', (req, res) => {
  const param = get(req.params, 'date');
  const re = /[A-Z][a-z]/g;
  const isString = re.test(param);
  console.log(isString);
  if ( param && !isString) {
    // console.log('return timestamp');
    res.json({
      unix: parseInt(param,10),
      natural: getNaturalTime(param),
    });
    return;
  } else if (param && isString) {
    // console.log('return date');
    res.json({
      unix: getUnixTime(param),
      natural: param,
    });
    return;
  } else {
    res.json({
      unix: null,
      natural: null,
    });
    return;   
  }
})

app.listen(3000, () => console.log('Listening on port 3000'));