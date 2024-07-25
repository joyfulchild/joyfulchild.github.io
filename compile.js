const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Define the directories
const viewsDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'public');
const layoutsDir = path.join(viewsDir, 'layouts');
const partialsDir = path.join(viewsDir, 'partials');

// Register partials
fs.readdirSync(partialsDir).forEach(file => {
    const partialPath = path.join(partialsDir, file);
    const partialName = path.basename(file, '.hbs');
    const partialContent = fs.readFileSync(partialPath, 'utf-8');
    handlebars.registerPartial(partialName, partialContent);
});

// Compile the main layout template
const layoutPath = path.join(layoutsDir, 'main.hbs');
const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
const layoutTemplate = handlebars.compile(layoutContent);

// Function to recursively traverse directories and compile .hbs files
function compileTemplates(srcDir, destDir) {
    fs.readdir(srcDir, (err, items) => {
        if (err) throw err;

        items.forEach(item => {
            const srcPath = path.join(srcDir, item);

            // Modify the destination path for the root level index file
            let destPath;
            if (path.basename(srcPath) === 'index.hbs') {
                destPath = path.join(__dirname, 'index.html');
            } else {
                destPath = path.join(destDir, item.replace('.hbs', '.html'));
            }

            fs.stat(srcPath, (err, stat) => {
                if (err) throw err;

                if (stat.isDirectory()) {
                    // Create corresponding directory in the output
                    fs.mkdir(destPath, { recursive: true }, (err) => {
                        if (err) throw err;
                        compileTemplates(srcPath, destPath);
                    });
                } else if (path.extname(srcPath) === '.hbs') {
                    // Read and compile .hbs file
                    fs.readFile(srcPath, 'utf-8', (err, content) => {
                        if (err) throw err;

                        const template = handlebars.compile(content);
                        const result = layoutTemplate({
                            body: template({}) // Pass your data here
                        });

                        fs.writeFile(destPath, result, (err) => {
                            if (err) throw err;
                            console.log(`Compiled ${srcPath} to ${destPath}`);
                        });
                    });
                }
            });
        });
    });
}

// Ensure the output directory exists
fs.mkdir(outputDir, { recursive: true }, (err) => {
    if (err) throw err;
    compileTemplates(viewsDir, outputDir);
});