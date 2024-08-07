const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Define the directories
const viewsDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname);
const layoutsDir = path.join(viewsDir, 'layouts');
const partialsDir = path.join(viewsDir, 'partials');

// Load page metadata
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'), 'utf-8'));

// Register partials (including those in subdirectories)
function registerPartials(dir, base = '') {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const partialName = path.join(base, path.basename(file, '.hbs')).replace(/\\/g, '/');
        if (fs.statSync(fullPath).isDirectory()) {
            registerPartials(fullPath, partialName);
        } else if (path.extname(file) === '.hbs') {
            const partialContent = fs.readFileSync(fullPath, 'utf-8');
            handlebars.registerPartial(partialName, partialContent);
        }
    });
}

registerPartials(partialsDir);

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
                    compileTemplates(srcPath, destDir); // Flatten structure
                } else if (path.extname(srcPath) === '.hbs' && !srcPath.includes('layouts') && !srcPath.includes('partials')) {
                    fs.readFile(srcPath, 'utf-8', (err, content) => {
                        if (err) throw err;

                        const template = handlebars.compile(content);
                        const pageData = pages[pageName] || {};

                        const result = layoutTemplate({
                            ...pageData,
                            body: template(pageData)
                        });

                        // Create directory for each page and write index.html inside it
                        const dirPath = pageName === 'index' ? destDir : path.join(destDir, pageName);
                        fs.mkdir(dirPath, { recursive: true }, (err) => {
                            if (err) throw err;
                            fs.writeFile(path.join(dirPath, 'index.html'), result, (err) => {
                                if (err) throw err;
                                console.log(`Compiled ${srcPath} to ${path.join(dirPath, 'index.html')}`);
                            });
                        });
                    });
                }
            });
        });
    });
}

// Ensure the output directory exists and compile templates
fs.mkdir(outputDir, { recursive: true }, (err) => {
    if (err) throw err;
    compileTemplates(viewsDir, outputDir);
});