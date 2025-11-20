import os
import re
from bs4 import BeautifulSoup

# Define the new navigation menu structure
NAV_HTML = '''
<div class="navbar-nav ms-auto py-0 me-n3">
    <a href="index.html" class="nav-item nav-link {index_active}">Home</a>
    <a href="about.html" class="nav-item nav-link {about_active}">About Us</a>
    <a href="service.html" class="nav-item nav-link {service_active}">Services</a>
    <a href="feature.html" class="nav-item nav-link {feature_active}">Why Choose Us</a>
    <a href="team.html" class="nav-item nav-link {team_active}">Our Team</a>
    <a href="testimonial.html" class="nav-item nav-link {testimonial_active}">Testimonials</a>
    <div class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle {blog_active}" data-bs-toggle="dropdown">Blog</a>
        <div class="dropdown-menu m-0">
            <a href="blog.html" class="dropdown-item">Blog Grid</a>
            <a href="detail.html" class="dropdown-item">Blog Detail</a>
        </div>
    </div>
    <a href="quote.html" class="nav-item nav-link {quote_active}">Get a Quote</a>
    <a href="faqs.html" class="nav-item nav-link {faq_active}">FAQs</a>
    <a href="contact.html" class="nav-item nav-link {contact_active}">Contact</a>
</div>
'''

def update_navigation(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Parse the HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Get the current page name
    current_page = os.path.basename(file_path)
    
    # Determine active states based on current page
    active_states = {
        'index_active': 'active' if current_page == 'index.html' else '',
        'about_active': 'active' if current_page == 'about.html' else '',
        'service_active': 'active' if current_page == 'service.html' else '',
        'feature_active': 'active' if current_page == 'feature.html' else '',
        'team_active': 'active' if current_page == 'team.html' else '',
        'testimonial_active': 'active' if current_page == 'testimonial.html' else '',
        'blog_active': 'active' if current_page in ['blog.html', 'detail.html'] else '',
        'quote_active': 'active' if current_page == 'quote.html' else '',
        'faq_active': 'active' if current_page == 'faqs.html' else '',
        'contact_active': 'active' if current_page == 'contact.html' else ''
    }
    
    # Format the navigation HTML with active states
    new_nav = NAV_HTML.format(**active_states)
    
    # Find and replace the navigation
    nav_div = soup.find('div', class_='navbar-nav')
    if nav_div:
        new_nav_soup = BeautifulSoup(new_nav, 'html.parser')
        nav_div.replace_with(new_nav_soup)
    
    # Write the updated content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

def main():
    # Get all HTML files in the current directory
    html_files = [f for f in os.listdir() if f.endswith('.html')]
    
    # Update navigation for each file
    for file in html_files:
        print(f"Updating navigation in {file}...")
        update_navigation(file)
    
    print("Navigation update complete!")

if __name__ == "__main__":
    main()
