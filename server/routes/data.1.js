var express = require('express');
var router = express.Router();
const fs = require('fs');
const Influx = require('influx')
let rawdata = fs.readFileSync('/Users/nagarajm/Documents/projects/datahub/influd_data.json');
let student = JSON.parse(rawdata);
let mainArray = student.test;
//console.log(mainArray)
const influx = new Influx.InfluxDB({
  host: "127.0.0.1:8086",
  database: "udp",
  username: "admin",
  password: "admin",

  /*
  schema: [
    {
      measurement: "price_msft",
      fields: {
        country_code: Influx.FieldType.STRING,
        lat: Influx.FieldType.FLOAT,
        lon: Influx.FieldType.FLOAT,
        clouds: Influx.FieldType.STRING
      },
      tags: ["source"]
    }
  ]*/
});

router.get('/', function (req, res, next) {
  console.log("Here ")
  influx.query(
    `select * from cpu`
  )
    .catch(err => {
      console.log(err);
    })
    .then(results => {
      res.json(results);
    });
  //res.end(JSON.stringify(mainArray));
});

router.get('/seqdata', function (req, res, next) {

  console.log("init " + mainArray.length)
  res.end(JSON.stringify(mainArray[0]));
  mainArray.shift();
console.log(mainArray)
  res.json(mainArray);
  //console.log("after " + mainArray.length)
});

router.get('/getData', function (req, res, next) {

  influx.query(`select * from http`).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
});

module.exports = router;
