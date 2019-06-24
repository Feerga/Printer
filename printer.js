const path = require('path');
const Hummus = require('hummus-recipe');
const fs = require('fs');
const commander = require('commander');

const outputFile = 'output.pdf';

commander
  .version('1.0.0')
  .option('-d, --directory <string>', 'Set working directory')
  .option('-p, --page <number>', 'How many pages to add to output file', parseInt)
  .parse(process.argv);
 
const isDirSet = commander.directory !== undefined;
const workingDir = isDirSet ? commander.directory : '.';
const isPagesSet = commander.page !== undefined;
const pageCount = isPagesSet ? commander.page : 1;
let pages = [];
for(let i = 1; i <= pageCount; i++) {
    pages.push(i);
}

try {
    fs.unlinkSync(outputFile);
} catch(err) {}

const doc = new Hummus('new', outputFile);
const files = fs.readdirSync(workingDir);

files.forEach(function (file) {
    if (path.extname(file) !== '.pdf') return;
    if (file === outputFile) return;
    
    console.log('We check', file)    
    doc.appendPage(file, pages);
});    

doc.endPDF();