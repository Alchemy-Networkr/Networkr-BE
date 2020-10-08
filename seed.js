const seed = require('./lib/data/seed');

seed()
  .then(data => console.log('done'));
