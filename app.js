const fs = require('fs');

const content = 'This is boring exercise 7.';

fs.writeFile('output.txt', content, (err) => {
  if (err) {
    console.error('An error occurred while writing the file:', err);
    return;
  }
  console.log('File successfully written!');
});
