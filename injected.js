(function() {
    'use strict';
    console.log('Canva Image Extractor injected script loaded');
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string' && (url.includes('media') || url.includes('image'))) {
            console.log('Image fetch detected:', url);
        }
        return originalFetch.apply(this, args);
    };
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (typeof url === 'string' && (url.includes('media') || url.includes('image'))) {
            console.log('Image XHR detected:', url);
        }
        return originalXHROpen.call(this, method, url, ...rest);
    };
    const imageObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    if (node.tagName === 'IMG') {
                        if (node.src && (node.src.includes('media') || node.src.includes('canva'))) {
                            console.log('New image detected:', node.src);
                            window.postMessage({
                                type: 'CANVA_IMAGE_DETECTED',
                                url: node.src,
                                element: node.outerHTML
                            }, '*');
                        }
                    }
                    const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
                    images.forEach(img => {
                        if (img.src && (img.src.includes('media') || img.src.includes('canva'))) {
                            console.log('New child image detected:', img.src);
                            window.postMessage({
                                type: 'CANVA_IMAGE_DETECTED',
                                url: img.src,
                                element: img.outerHTML
                            }, '*');
                        }
                    });
                }
            });
        });
    });
    if (document.body) {
        imageObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            imageObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    window.extractAllCanvaImages = function() {
        const images = [];
        const foundUrls = new Set();
        const pageContainers = document.querySelectorAll('[data-page-id]');
        if (pageContainers.length > 0) {
            console.log(`Found ${pageContainers.length} page containers`);
            pageContainers.forEach(container => {
                const pageId = container.getAttribute('data-page-id');
                console.log(`Processing page container: ${pageId}`);
                let pageTitle = `Página ${pageId}`;
                let currentElement = container;
                while (currentElement && currentElement.parentElement) {
                    const parentSection = currentElement.parentElement;
                    const titleInput = parentSection.querySelector('input[aria-label*="página"], input[aria-label*="Título"]');
                    if (titleInput && titleInput.value) {
                        pageTitle = titleInput.value;
                        break;
                    }
                    const titleDiv = parentSection.querySelector('.dzYeTg input, .GZPi5g');
                    if (titleDiv && (titleDiv.value || titleDiv.textContent)) {
                        pageTitle = titleDiv.value || titleDiv.textContent.trim();
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }
                const selectors = [
                    'img[src*="media-public.canva.com"]',
                    'img[src*="media.canva.com"]',
                    'img[src*="media-private.canva.com"]',
                    'img[src*="canva-media"]',
                    'img[src*="canva.cn"]',
                    'canvas',
                    'svg image',
                    '[style*="background-image"]',
                    '[data-src*="media"]',
                    '[data-url*="media"]',
                    'div[class*="_mXnjA"] img', 
                    'div[class*="_6t4CHA"] img',
                    'div[class*="DF_utQ"] img'
                ];
                selectors.forEach(selector => {
                    try {
                        container.querySelectorAll(selector).forEach(element => {
                            let url = null;
                            let type = 'unknown';
                            if (element.tagName === 'IMG') {
                                url = element.src || element.getAttribute('data-src') || element.getAttribute('data-original');
                                type = 'img';
                            } else if (element.tagName === 'CANVAS') {
                                try {
                                    url = element.toDataURL('image/png', 1.0);
                                    type = 'canvas';
                                } catch (e) {
                                    console.log('Cannot extract canvas:', e.message);
                                }
                            } else {
                                const style = window.getComputedStyle(element);
                                const backgroundImage = style.backgroundImage;
                                if (backgroundImage && backgroundImage !== 'none') {
                                    const match = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
                                    if (match) {
                                        url = match[1];
                                        type = 'background';
                                    }
                                }
                                url = url || element.getAttribute('data-src') ||
                                    element.getAttribute('data-url') ||
                                    element.getAttribute('data-original');
                                if (url) type = 'data-attribute';
                            }
                            if (url && !foundUrls.has(url)) {
                                const isCanvaUrl = url.includes('media-public.canva.com') ||
                                    url.includes('media.canva.com') ||
                                    url.includes('media-private.canva.com') ||
                                    url.includes('canva-media') ||
                                    url.includes('canva.cn') ||
                                    url.startsWith('data:image/') ||
                                    url.includes('uri:ifs');
                                if (isCanvaUrl) {
                                    foundUrls.add(url);
                                    images.push({
                                        url: url,
                                        alt: element.alt || '',
                                        className: element.className,
                                        width: element.naturalWidth || element.width || 0,
                                        height: element.naturalHeight || element.height || 0,
                                        pageId: pageId,
                                        pageTitle: pageTitle,
                                        type: `page-container-${type}`,
                                        selector: selector
                                    });
                                }
                            }
                        });
                    } catch (error) {
                        console.warn(`Error with selector ${selector}:`, error);
                    }
                });
            });
        } else {
            console.log('No page containers found, scanning entire document');
            const selectors = [
                'img[src*="media"]',
                'canvas',
                'svg image',
                '[style*="background-image"]',
                '[data-src]',
                '[data-url]',
                '[data-original]'
            ];
            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    let url = null;
                    if (element.tagName === 'IMG') {
                        url = element.src;
                    } else if (element.tagName === 'CANVAS') {
                        try {
                            url = element.toDataURL();
                        } catch (e) {
                            console.log('Cannot extract canvas:', e);
                        }
                    } else {
                        const style = window.getComputedStyle(element);
                        const backgroundImage = style.backgroundImage;
                        if (backgroundImage && backgroundImage !== 'none') {
                            const match = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
                            if (match) {
                                url = match[1];
                            }
                        }
                        url = url || element.getAttribute('data-src') ||
                            element.getAttribute('data-url') ||
                            element.getAttribute('data-original');
                    }
                    if (url && !foundUrls.has(url)) {
                        foundUrls.add(url);
                        images.push({
                            url: url,
                            alt: element.alt || '',
                            className: element.className,
                            width: element.naturalWidth || element.width || 0,
                            height: element.naturalHeight || element.height || 0,
                            type: 'general-image',
                            selector: selector
                        });
                    }
                });
            });
        }
        console.log(`Total images found: ${images.length}`);
        return images;
    };    
    window.addEventListener('message', (event) => {
        if (event.source !== window) return;
        if (event.data.type === 'EXTRACT_IMAGES') {
            const images = window.extractAllCanvaImages();
            window.postMessage({
                type: 'IMAGES_EXTRACTED',
                images: images
            }, '*');
        }
    });
})();
