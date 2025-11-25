/**
 * Professional Page Loading Spinner
 * Features:
 * - Smooth animations with hardware acceleration
 * - Reduced motion support
 * - Dark mode support
 * - Memory efficient
 * - Handles browser navigation
 * - Graceful degradation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create spinner HTML if it doesn't exist
    if (!document.querySelector('.page-loading')) {
        const spinnerHTML = `
            <div class="page-loading" role="status" aria-live="polite" aria-label="Loading">
                <div class="spinner">
                    <span class="spinner-text">C</span>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', spinnerHTML);
    }

    const spinner = document.querySelector('.page-loading');

    // Show spinner with animation
    function showSpinner() {
        if (spinner) {
            spinner.style.display = 'flex';
            // Force reflow
            void spinner.offsetWidth;
            spinner.style.opacity = '1';
            spinner.style.visibility = 'visible';
        }
    }

    // Hide spinner with animation
    function hideSpinner() {
        if (spinner) {
            spinner.style.opacity = '0';
            spinner.addEventListener('transitionend', function onTransitionEnd() {
                spinner.style.visibility = 'hidden';
                spinner.removeEventListener('transitionend', onTransitionEnd);
            }, { once: true });
        }
    }
    
    // Show spinner immediately when script loads
    showSpinner();
    
    // Hide spinner when page is fully loaded
    function hideOnLoad() {
        // Small delay to ensure smooth transition
        setTimeout(() => {
            hideSpinner();
            // Clean up event listeners
            window.removeEventListener('load', hideOnLoad);
            document.removeEventListener('DOMContentLoaded', hideOnLoad);
        }, 100);
    }
    
    // Check if page is already loaded
    if (document.readyState === 'complete') {
        hideOnLoad();
    } else {
        window.addEventListener('load', hideOnLoad);
        document.addEventListener('DOMContentLoaded', hideOnLoad);
    }

    // Show spinner when navigating away
    window.addEventListener('beforeunload', showSpinner);

    // Handle browser back/forward navigation
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            showSpinner();
            // Hide spinner after a short delay to ensure smooth transition
            setTimeout(hideSpinner, 100);
        }
    });

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && spinner) {
        spinner.style.animation = 'none';
        const spinnerElements = spinner.querySelectorAll('*');
        spinnerElements.forEach(el => {
            el.style.animation = 'none';
        });
    }

    // Clean up event listeners when page is being unloaded
    window.addEventListener('unload', function() {
        window.removeEventListener('beforeunload', showSpinner);
        window.removeEventListener('pageshow', arguments.callee);
    });
});
