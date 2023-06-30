const figlet = require('figlet');

figlet('Hello, Emre!', function(err, data) {
  if (err) {
    console.log('Something wentwrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});
