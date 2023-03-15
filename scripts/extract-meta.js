const fs = require('fs');
const path = require('path')
const glob = require('glob');
const matter = require('gray-matter');

console.log('Extracting front matter from Markdown files...');
console.log(process.cwd());
// find all the Markdown files in the directory and its subdirectories
glob(`public/sources/**/*.md`, (err, files) => {
  if (err) throw err;
  console.log("Processing " + files.length)
  // loop through each file
  files.forEach(file => {
    // read in the file contents as a string
    console.log(file)
    const fileContents = fs.readFileSync(file, 'utf8');

    // extract the front matter and content using gray-matter
    const { data, content } = matter(fileContents);
    data.id = file.split('/').slice(2).join('/');
    data.Collection = path.basename(path.dirname(path.dirname(file)));
    data.abbrev = path.basename(path.dirname(file));
    // do something with the front matter and content
    console.log(data);
    //console.log(content);
  });
});
