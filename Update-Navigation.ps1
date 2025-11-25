# PowerShell script to update navigation menu across all HTML files

# Define the navigation menu template with placeholders for active states
$navTemplate = @'
                <div class="navbar-nav ms-auto py-0 me-n3">
                    <a href="index.html" class="nav-item nav-link {0}">Home</a>
                    <a href="about.html" class="nav-item nav-link {1}">About Us</a>
                    <a href="service.html" class="nav-item nav-link {2}">Services</a>
                    <a href="feature.html" class="nav-item nav-link {3}">Why Choose Us</a>
                    <a href="team.html" class="nav-item nav-link {4}">Our Team</a>
                    <a href="testimonial.html" class="nav-item nav-link {5}">Testimonials</a>
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle {6}" data-bs-toggle="dropdown">Blog</a>
                        <div class="dropdown-menu m-0">
                            <a href="blog.html" class="dropdown-item">Blog Grid</a>
                            <a href="detail.html" class="dropdown-item">Blog Detail</a>
                        </div>
                    </div>
                    <a href="quote.html" class="nav-item nav-link {7}">Get a Quote</a>
                    <a href="faqs.html" class="nav-item nav-link {8}">FAQs</a>
                    <a href="contact.html" class="nav-item nav-link {9}">Contact</a>
                </div>
'@

# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -File

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Determine which page is active
    $activeIndex = ""
    $activeAbout = ""
    $activeService = ""
    $activeFeature = ""
    $activeTeam = ""
    $activeTestimonial = ""
    $activeBlog = ""
    $activeQuote = ""
    $activeFaq = ""
    $activeContact = ""
    
    switch -Wildcard ($file.Name) {
        "index.html" { $activeIndex = "active" }
        "about*" { $activeAbout = "active" }
        "service*" { $activeService = "active" }
        "feature*" { $activeFeature = "active" }
        "team*" { $activeTeam = "active" }
        "testimonial*" { $activeTestimonial = "active" }
        "blog*" { $activeBlog = "active" }
        "detail*" { $activeBlog = "active" }
        "quote*" { $activeQuote = "active" }
        "faq*" { $activeFaq = "active" }
        "contact*" { $activeContact = "active" }
    }
    
    # Format the navigation with active states
    $newNav = $navTemplate -f $activeIndex, $activeAbout, $activeService, $activeFeature, `
                            $activeTeam, $activeTestimonial, $activeBlog, $activeQuote, `
                            $activeFaq, $activeContact
    
    # Replace the navigation section using regex
    $pattern = '(?s)<div class="navbar-nav ms-auto py-0 me-n3">.*?<\/div>'
    $updatedContent = $content -replace $pattern, $newNav
    
    # Save the updated content
    [System.IO.File]::WriteAllText($file.FullName, $updatedContent, [System.Text.Encoding]::UTF8)
    
    Write-Host "Updated navigation in $($file.Name)"
}

Write-Host "Navigation update complete!"
