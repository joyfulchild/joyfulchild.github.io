const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Define the directories
const viewsDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, '.');  // Root directory for GitHub Pages
const layoutsDir = path.join(viewsDir, 'layouts');
const partialsDir = path.join(viewsDir, 'partials');

// Load page metadata
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'), 'utf-8'));

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
            const pageName = path.basename(srcPath, '.hbs');
            const outputPath = pageName === 'index'
                ? path.join(destDir, 'index.html')
                : path.join(destDir, pageName, 'index.html');

            fs.stat(srcPath, (err, stat) => {
                if (err) throw err;

                if (stat.isDirectory()) {
                    // Create corresponding directory in the output
                    fs.mkdir(path.join(destDir, item), { recursive: true }, (err) => {
                        if (err) throw err;
                        compileTemplates(srcPath, path.join(destDir, item));
                    });
                } else if (path.extname(srcPath) === '.hbs') {
                    // Read and compile .hbs file
                    fs.readFile(srcPath, 'utf-8', (err, content) => {
                        if (err) throw err;

                        const template = handlebars.compile(content);
                        const pageData = pages[pageName] || {};

                        // Combine template content with layout
                        const result = layoutTemplate({
                            ...pageData,
                            body: template(pageData)
                        });

                        fs.mkdir(path.dirname(outputPath), { recursive: true }, (err) => {
                            if (err) throw err;
                            fs.writeFile(outputPath, result, (err) => {
                                if (err) throw err;
                                console.log(`Compiled ${srcPath} to ${outputPath}`);
                            });
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