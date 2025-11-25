const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const htmlDir = __dirname;

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

// Function to add premium styles to HTML file
function addPremiumStyles(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if already contains the premium styles
        if (content.includes('premium.css')) {
            console.log(`Skipping ${filePath} - already has premium styles`);
            return;
        }
        
        // Add Google Fonts and premium.css before the closing head tag
        const premiumStyles = `
    <!-- Premium Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
    <link href="css/premium.css" rel="stylesheet">
`;
        
        // Add the styles before the closing head tag
        if (content.includes('</head>')) {
            content = content.replace('</head>', premiumStyles + '    </head>');
            
            // Save the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Added premium styles to ${filePath}`);
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
    addPremiumStyles(filePath);
});

console.log('Finished adding premium styles to all HTML files.');
