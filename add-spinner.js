const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const htmlDir = __dirname;

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

// Check if page-transitions.js exists, if not, create it
const jsFilePath = path.join(htmlDir, 'js', 'page-transitions.js');
if (!fs.existsSync(jsFilePath)) {
    console.error('Error: page-transitions.js not found. Please make sure it exists in the js/ directory.');
    process.exit(1);
}

// Function to add script to HTML file
function addSpinnerToFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if already contains the spinner script
        if (content.includes('page-transitions.js')) {
            console.log(`Skipping ${filePath} - already has spinner`);
            return;
        }
        
        // Add the script before the closing body tag
        if (content.includes('</body>')) {
            const spinnerHtml = `
    <!-- Loading Spinner Script -->
    <script src="js/page-transitions.js"></script>
`;
            content = content.replace('</body>', spinnerHtml + '</body>');
            
            // Save the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Added spinner to ${filePath}`);
        } else {
            console.warn(`Could not find </body> tag in ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(htmlDir, file);
    addSpinnerToFile(filePath);
});

console.log('Finished adding loading spinners to all HTML files.');
