const fs = require('fs');
const { sync: globSync } = require('glob');
const filesize = require('filesize');
const Terser = require('terser');
const options = require(process.env.TERSER_CONFIG || './terserrc.json');

const getSize = file => {
    const { size } = fs.statSync(file);
    return filesize(size);
};

const files = globSync(`${process.env.TERSER_DIST_PATH || './dist'}/**/*.js`);
files.map(file => {
    console.log(`Minifying ${file} (${getSize(file)})`);
    const terserResult = Terser.minify(fs.readFileSync(file, 'utf8'), options);
    if (terserResult.error) {
        console.log(`Minifying ${file} error.`, terserResult.error);
    } else {
        fs.writeFileSync(file, terserResult.code, 'utf8');
        console.log(`Minifying ${file} (${getSize(file)}) success.`);
    }
});
