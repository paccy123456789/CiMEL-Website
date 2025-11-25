# Navigation menu template with consistent styling
$navMenu = @"
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0 me-n3">
                <a href="index.html" class="nav-item nav-link">Home</a>
                <a href="about.html" class="nav-item nav-link">About Us</a>
                <a href="service.html" class="nav-item nav-link">Services</a>
                <a href="feature.html" class="nav-item nav-link">Why Choose Us</a>
                <a href="team.html" class="nav-item nav-link">Our Team</a>
                <a href="testimonial.html" class="nav-item nav-link">Testimonials</a>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Blog</a>
                    <div class="dropdown-menu m-0">
                        <a href="blog.html" class="dropdown-item">Blog Grid</a>
                        <a href="detail.html" class="dropdown-item">Blog Detail</a>
                    </div>
                </div>
                <a href="quote.html" class="nav-item nav-link">Get a Quote</a>
                <a href="faqs.html" class="nav-item nav-link">FAQs</a>
                <a href="contact.html" class="nav-item nav-link">Contact</a>
            </div>
        </div>
"@

# Enhanced CSS for navigation
$navCss = @"
/* =====================
   ENHANCED NAVIGATION STYLES
   ===================== */
.navbar {
    background: #ffffff !important;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08) !important;
    padding: 10px 0 !important;
    transition: all 0.3s ease !important;
}

.navbar.sticky-top {
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) !important;
    padding: 8px 0 !important;
}

.navbar-light .navbar-nav {
    gap: 2px !important;
}

.navbar-light .navbar-nav .nav-link {
    font-family: 'Barlow', sans-serif !important;
    padding: 12px 16px !important;
    margin: 0 2px !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    color: #2d3436 !important;
    border-radius: 6px !important;
    transition: all 0.3s ease !important;
    position: relative !important;
    text-transform: capitalize !important;
}

.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link:focus {
    color: var(--primary) !important;
    background: rgba(51, 122, 131, 0.08) !important;
}

.navbar-light .navbar-nav .nav-link.active {
    color: var(--primary) !important;
    font-weight: 600 !important;
    position: relative !important;
}

.navbar-light .navbar-nav .nav-link.active::after {
    content: '' !important;
    position: absolute !important;
    bottom: 8px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 20px !important;
    height: 2px !important;
    background: var(--primary) !important;
    border-radius: 2px !important;
}

/* Dropdown Menu */
.navbar-light .navbar-nav .dropdown-menu {
    border: none !important;
    border-radius: 8px !important;
    padding: 8px 0 !important;
    margin-top: 8px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
    border-top: 3px solid var(--primary) !important;
}

.navbar-light .navbar-nav .dropdown-item {
    padding: 8px 20px !important;
    font-size: 14px !important;
    color: #4a4a4a !important;
    transition: all 0.2s ease !important;
}

.navbar-light .navbar-nav .dropdown-item:hover,
.navbar-light .navbar-nav .dropdown-item:focus {
    background: rgba(51, 122, 131, 0.05) !important;
    color: var(--primary) !important;
    padding-left: 25px !important;
}

/* Mobile Menu */
@media (max-width: 991.98px) {
    .navbar-collapse {
        background: #fff !important;
        border-radius: 8px !important;
        padding: 10px !important;
        margin-top: 10px !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
    }
    
    .navbar-light .navbar-nav .nav-link {
        padding: 10px 15px !important;
        margin: 2px 0 !important;
    }
    
    .navbar-light .dropdown-menu {
        border: none !important;
        box-shadow: none !important;
        padding-left: 15px !important;
        margin: 5px 0 !important;
    }
}
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
    
    # Add or update CSS in the head section
    if ($updatedContent -match '<style\s*[^>]*>') {
        # If style tag exists, update it
        $updatedContent = $updatedContent -replace '(?s)<style\s*[^>]*>.*?<\/style>', "<style>$navCss</style>"
    } else {
        # Add style tag before closing head
        $updatedContent = $updatedContent -replace '<\/head>', "<style>$navCss</style></head>"
    }
    
    # Save the updated content
    $updatedContent | Set-Content -Path $file.FullName -NoNewline
    
    Write-Host "Updated navigation and styles in $($file.Name)"
}

Write-Host "Navigation and styling update complete!" -ForegroundColor Green
