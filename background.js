let storedImages = [];
chrome.runtime.onInstalled.addListener(() => {
    console.log('🎨 Canva Image Extractor installed!');
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Background received message:', request.action);
    switch (request.action) {
        case 'extractImages':
            handleImageExtraction(sender, sendResponse);
            break;
        case 'getStoredImages':
            sendResponse({ success: true, images: storedImages });
            break;
        case 'clearImages':
            clearAllImages(sendResponse);
            break;
        default:
            sendResponse({ success: false, error: 'Unknown action' });
    }
    return true;
});
async function handleImageExtraction(sender, sendResponse) {
    try {
        console.log('🔍 Starting image extraction...');
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const canvaTab = tabs[0];
        if (!canvaTab || !canvaTab.url.includes('canva.com')) {
            throw new Error('Please open a Canva design page');
        }
        const results = await chrome.scripting.executeScript({
            target: { tabId: canvaTab.id },
            func: extractCanvaImages
        });
        const extractedImages = results[0]?.result || [];
        console.log('✅ Extracted images:', extractedImages.length);
        storedImages = [...new Set([...storedImages, ...extractedImages])];
        sendResponse({
            success: true,
            images: storedImages,
            count: extractedImages.length
        });
    } catch (error) {
        console.error('❌ Extraction error:', error);
        sendResponse({
            success: false,
            error: error.message
        });
    }
}
async function extractCanvaImages() {
    const images = [];
    const seenImageIds = new Set();
    const pageContainers = document.querySelectorAll('div[data-page-id]');
    console.log('🔍 Found page containers:', pageContainers.length);
    function validateImageUrl(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                console.log('✅ Image loads successfully:', url);
                resolve(true);
            };
            img.onerror = () => {
                console.log('❌ Image failed to load:', url);
                resolve(false);
            };
            img.src = url;
            setTimeout(() => {
                console.log('⏰ Image load timeout:', url);
                resolve(false);
            }, 5000);
        });
    }
    async function processImageUrl(imageUrl) {
        if (!imageUrl ||
            !imageUrl.startsWith('http') ||
            imageUrl.includes('icon') ||
            imageUrl.includes('logo') ||
            imageUrl.includes('avatar') ||
            imageUrl.includes('button')) {
            return null;
        }
        const idMatch = imageUrl.match(/\/([^\/]+\/[^\/]+\/[^\/]+)\//);
        if (!idMatch) return null;
        const imageId = idMatch[1];
        if (seenImageIds.has(imageId)) {
            console.log('⚠️ Skipping duplicate image:', imageId);
            return null;
        }
        const modifiedUrl = imageUrl.replace(/\/[^\/]+\.(png|jpg|jpeg|webp|gif)(\?.*)?$/, '/tl.png');
        const isValid = await validateImageUrl(modifiedUrl);
        if (!isValid) {
            console.log('❌ Skipping invalid image:', modifiedUrl);
            return null;
        }
        seenImageIds.add(imageId);
        console.log('✅ Found valid and loadable image:', modifiedUrl);
        return modifiedUrl;
    }
    for (let pageIndex = 0; pageIndex < pageContainers.length; pageIndex++) {
        const pageContainer = pageContainers[pageIndex];
        const pageId = pageContainer.getAttribute('data-page-id');
        console.log(`📄 Scanning page ${pageIndex + 1} (ID: ${pageId})`);
        const imgElements = pageContainer.querySelectorAll('img[src]');
        for (const img of imgElements) {
            const processedUrl = await processImageUrl(img.src);
            if (processedUrl) {
                images.push(processedUrl);
            }
        }
        const bgElements = pageContainer.querySelectorAll('[style*="background-image"]');
        for (const element of bgElements) {
            const bgImage = getComputedStyle(element).backgroundImage;
            const urlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/);
            if (urlMatch) {
                const processedUrl = await processImageUrl(urlMatch[1]);
                if (processedUrl) {
                    images.push(processedUrl);
                }
            }
        }
    }
    console.log('🔍 Total unique and loadable images found:', images.length);
    return images;
}
function clearAllImages(sendResponse) {
    storedImages = [];
    console.log('🗑️ All images cleared');
    sendResponse({ success: true });
}
