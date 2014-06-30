var request = require('request')
  , _ = require('underscore')
  , fs = require('fs')
  , hat = require('hat');

var rack = hat.rack();
var prefix = 'result/'

request('http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/phresh-server/items?dev_test_user_id=JzaM1V8Elx&limit=10', function(error,response,body){
  var dict = JSON.parse(body);
  _.each(dict.items,function(item){
    var id = rack();
    fs.writeFileSync(prefix + id + '.jpg', new Buffer(item.image, 'base64'));
    delete item.image;
    item.imageID = id;
  });
  fs.writeFileSync(prefix + 'items.json',JSON.stringify(dict.items, null, 4));
});