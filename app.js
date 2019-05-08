const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk')

const app = express();
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
app.listen(1234, res => {
  console.log(chalk.yellow('Start Service On 1234'));
});
