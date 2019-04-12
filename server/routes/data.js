var express = require('express');
var router = express.Router();
const fs = require('fs');
var _ = require('lodash');
const InfluxDb = require('influxdb-nodejs');
const client = new InfluxDb(
  'http://admin:admin@influx.omaha.edge.kontena.works/fault_from_okc_kafka_db_test'
);

router.get('/', function(req, res, next) {
  res.send('Root');
});

router.get('/getDatabaseNames', function(req, res, next) {
  client
    .showDatabases()
    .then(names => {
      res.send(names);
    })
    .catch(console.error);
});

router.get('/getMinData', function(req, res, next) {
  client
    .queryRaw(
      'select TOP_DVIC_LAT_NBR,TOP_DVIC_LON_NBR,STATUS from fault_from_okc_kafka_db_test.autogen.kafka_consumer'
    )
    .then(resdata => {
      let markerArray = [];
      let results = resdata.results[0].series[0].values;
      _.forEach(results, function(element, i) {
        let imageValue = '';
        if (element[3] == 'active') {
          imageValue = '../../../assets/images/icons8-circle-16-green.png';
        } else if (element[3] == 'inactive') {
          imageValue = '../../../assets/images/icons8-circle-16-red.png';
        }
        markerArray.push({
          animation: 'DROP',
          lat: element[1],
          lng: element[2],
          img: imageValue,
          time: element[0]
        });
      });
      res.json(markerArray);
    })
    .catch(console.error);
});

router.get('/getDataForLocation', function(req, res, next) {
  client
    .queryRaw(
      `select TOP_DVIC_LAT_NBR,TOP_DVIC_LON_NBR,STATUS, ADDRESSES_LIST from fault_from_okc_kafka_db_test.autogen.kafka_consumer where FACLT_NAME = '${
        req.query.location
      }'`
    )
    .then(resdata => {
      let markerArray = [];
      let results = resdata.results[0].series[0].values;
      _.forEach(results, function(element, i) {
        let imageValue = '';
        if (element[3] == 'active') {
          imageValue = '../../../assets/images/icons8-circle-16-green.png';
        } else if (element[3] == 'inactive') {
          imageValue = '../../../assets/images/icons8-circle-16-red.png';
        }
        markerArray.push({
          animation: 'DROP',
          lat: element[1],
          lng: element[2],
          img: imageValue,
          time: element[0],
          status: element[3],
          address: element[4]
        });
      });
      res.json(markerArray);
    })
    .catch(console.error);
});

router.get('/getInfo', function(req, res, next) {
  let query = `select * from fault_from_okc_kafka_db_test.autogen.kafka_consumer where time= '${
    req.query.time
  }'`;
  client
    .queryRaw(query)
    .then(results => {
      res.json(results.results[0].series[0].values);
    })
    .catch(console.error);
});

router.get('/getCounts', function(req, res, next) {
  let query = `select count(STATUS) from fault_from_okc_kafka_db_test.autogen.kafka_consumer;select count(STATUS) from fault_from_okc_kafka_db_test.autogen.kafka_consumer where STATUS = 'active';select count(STATUS)  from fault_from_okc_kafka_db_test.autogen.kafka_consumer where STATUS = 'inactive';select count(STATUS)  from fault_from_okc_kafka_db_test.autogen.kafka_consumer where STATUS = 'null'`;
  client
    .queryRaw(query)
    .then(results => {
      let data = {
        total: results.results[0].series[0].values[0][1],
        active: results.results[1].series[0].values[0][1],
        inactive: results.results[2].series[0].values[0][1]
      };
      res.json(data);
    })
    .catch(console.error);
});

router.get('/getLocations', function(req, res, next) {
  let query = `select DISTINCT(FACLT_NAME) from fault_from_okc_kafka_db_test.autogen.kafka_consumer `;
  client
    .queryRaw(query)
    .then(results => {
      let locationArray = [];
      _.forEach(results.results[0].series[0].values, function(element, i) {
        locationArray.push({ location: element[1] });
      });
      res.json(locationArray);
    })
    .catch(console.error);
});

module.exports = router;
