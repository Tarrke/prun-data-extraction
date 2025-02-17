// Helper function
async function streamToString (stream): Promise<string> {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on("data", chunk => chunks.push(chunk))
    stream.on("error", reject)
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
  })
}


var browserify = require("browserify");
var uglifyEs = require("uglify-es");
var fs = require("fs");
var glob = require("glob");
var path = require("path");

glob("dist/extraction-modules/**/*.js", {}, async (er, files) => {
    var promises = files.map(async (file) => {
        var fileNoJs = file.replace(/(.*)\.js$/, '$1');
        var fileNoPath = path.basename(fileNoJs);

        console.log(`Bundling and minifying '${file}'`);
        var b = browserify();
        b.add(file);
        var bundledAsStream = b.bundle();
        var bundledAsString = await streamToString(bundledAsStream)

        console.log(`Writing bundled output to '${file}.bundled'`);
        fs.writeFileSync(`${file}.bundle`, bundledAsString);

        var uglified = uglifyEs.minify(bundledAsString, {});
        if (uglified.error) {
            console.log(`UglifiedJS Error: ${uglified.error}`);
        }

        console.log(`Writing minified output to '${file}.min'`);
        fs.writeFileSync(`${file}.min`, uglified.code);

        var b64 = Buffer.from(<string>uglified.code).toString("base64");
        var asEval = `eval(atob("${b64}"));`

        if (!fs.existsSync('extraction-evals')) {
            fs.mkdirSync('extraction-evals');
        }

        var evalFile = `extraction-evals/${fileNoPath}.eval`;
        console.log(`Writing eval output to '${evalFile}'`);
        fs.writeFileSync(evalFile, asEval);
    });

    await Promise.all(promises);

    console.log("All modules compiled");
});

