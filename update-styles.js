const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const htmlDir = __dirname;

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

// Function to add stylesheet to HTML file
function addStylesheetToFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if already contains the enhancements stylesheet
        if (content.includes('enhancements.css')) {
            console.log(`Skipping ${filePath} - already has enhancements`);
            return;
        }
        
        // Add the stylesheet before the closing head tag
        if (content.includes('</head>')) {
            const styleLink = `
    <!-- Enhanced Styles -->
    <link href="css/enhancements.css" rel="stylesheet">
`;
            content = content.replace('</head>', styleLink + '    </head>');
            
            // Save the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Added enhancements to ${filePath}`);
        } else {
            console.warn(`Could not find </head> tag in ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(htmlDir, file);
    addStylesheetToFile(filePath);
});

console.log('Finished adding enhancements to all HTML files.');
