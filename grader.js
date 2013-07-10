#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var util = require('util');
var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT = "http://murmuring-peak-9571.herokuapp.com";

var isUrl = function (htmlfile) {
    return htmlfile && htmlfile.match(/^https?\:\/\//);
}

var assertWebFile = function (infile) {
    var htmlfile = infile.toString();
    if (!isUrl(htmlfile)) {
        console.log("%s wrong url. Exiting.", htmlfile);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return htmlfile;
}

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr) && !isUrl(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }

    return instr;
};

var cheerioHtmlFile = function(htmlfile, onTextReady) {
    if (isUrl(htmlfile)) {
	console.log(htmlfile);
	rest.get(htmlfile).on('complete', function(result, response) {
            if (result instanceof Error) {
		console.error('Error: ' + util.format(result.message));
            } else {
		//console.error("Html loaded from web ");
		onTextReady(cheerio.load(result));
            }
	});
    } else {
	onTextReady(cheerio.load(fs.readFileSync(htmlfile)));
    }
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile, onResult) {
    cheerioHtmlFile(htmlfile, function ($) {
	var checks = loadChecks(checksfile).sort();
	var out = {};
	for(var ii in checks) {
            var present = $(checks[ii]).length > 0;
            out[checks[ii]] = present;
	}
	onResult(out);
    });
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
    program
        .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
        .option('-u, --url <url>', 'url', clone(assertWebFile), URL_DEFAULT)
        .parse(process.argv);
    //console.log("program.url="+program.url);
    //console.log("program.url.toString()="+program.url.toString());
    var filename = program.url.toString() != URL_DEFAULT ? program.url.toString() : program.file;
    checkHtmlFile(filename, program.checks, function (checkJson) {
        var outJson = JSON.stringify(checkJson, null, 4);
        console.log(outJson);
    });
} else {
    exports.checkHtmlFile = checkHtmlFile;
}
