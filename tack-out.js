const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk')

const tackOut = express();
tackOut.use(express.static(path.resolve(__dirname, './dist')))

tackOut.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
tackOut.listen(1234, res => {
  console.log(chalk.yellow('Start Service On 1234'));
});
