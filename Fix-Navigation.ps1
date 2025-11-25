# Navigation menu template with correct structure
$navMenu = @"
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0 me-n3">
                <a href="index.html" class="nav-item nav-link">Home</a>
                <a href="about.html" class="nav-item nav-link">About Us</a>
                <a href="service.html" class="nav-item nav-link">Services</a>
                <a href="feature.html" class="nav-item nav-link">Why Choose Us</a>
                <a href="team.html" class="nav-item nav-link">Our Team</a>
                <a href="testimonial.html" class="nav-item nav-link">Testimonials</a>
                <a href="blog.html" class="nav-item nav-link">Blog</a>
                <a href="quote.html" class="nav-item nav-link">Get a Quote</a>
                <a href="faqs.html" class="nav-item nav-link">FAQs</a>
                <a href="contact.html" class="nav-item nav-link">Contact</a>
            </div>
        </div>
"@

# Get all HTML files in the current directory
$files = Get-ChildItem -Path . -Filter "*.html" -File

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update the navigation menu
    $updatedContent = $content -replace '(?s)<div class="collapse navbar-collapse" id="navbarCollapse">.*?<\/div>\s*<\/div>', $navMenu
    
    # Update active class based on current page
    $pageName = $file.Name
    $activePattern = 'href="' + $pageName + '" class="nav-item nav-link(.*?)"'
    $replacement = 'href="' + $pageName + '" class="nav-item nav-link active"'
    $updatedContent = $updatedContent -replace $activePattern, $replacement
    
    # Remove any duplicate navigation items
    $updatedContent = $updatedContent -replace '(?s)<a href="[^"]+" class="nav-item nav-link[^"]*">[^<]+<\/a>\s*<\/div>\s*<\/div>\s*<a href="[^"]+" class="nav-item nav-link[^"]*">[^<]+<\/a>', '$&'
    
    # Remove duplicate navigation items that are outside the main menu
    $updatedContent = $updatedContent -replace '(?s)<div class="collapse navbar-collapse" id="navbarCollapse">.*?<\/div>\s*<\/div>\s*<a href="[^"]+" class="nav-item nav-link[^"]*">[^<]+<\/a>', $navMenu
    
    # Save the updated content
    $updatedContent | Set-Content -Path $file.FullName -NoNewline
    
    Write-Host "Fixed navigation in $($file.Name)"
}

Write-Host "Navigation fix complete!" -ForegroundColor Green
