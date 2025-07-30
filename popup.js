class CanvaExtractor {
    constructor() {
        this.images = [];
        this.isScanning = false;
        this.init();
    }
    init() {
        this.initializeElements();
        this.attachEventListeners();
        this.autoScanOnOpen();
    }
    initializeElements() {
        this.elements = {
            statusText: document.getElementById('status-text'),
            imageCount: document.getElementById('image-count'),
            mainContent: document.getElementById('main-content'),
            loadingState: document.getElementById('loading-state'),
            refreshBtn: document.getElementById('refresh-btn'),
            clearBtn: document.getElementById('clear-btn')
        };
    }
    attachEventListeners() {
        this.elements.refreshBtn.addEventListener('click', () => this.scanImages());
        this.elements.clearBtn.addEventListener('click', () => this.clearImages());
    }
    async autoScanOnOpen() {
        this.updateStatus('Checking for Canva tab...');
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            const currentTab = tabs[0];
            if (currentTab.url.includes('canva.com')) {
                this.updateStatus('Canva detected! Scanning images...');
                await this.scanImages();
            } else {
                this.showNotCanvaPage();
            }
        } catch (error) {
            console.error('Error during auto-scan:', error);
            this.updateStatus('Error detecting page');
        }
    }
    async scanImages() {
        if (this.isScanning) return;
        this.isScanning = true;
        this.showLoading();
        this.updateStatus('Scanning for images...');
        try {
            const response = await chrome.runtime.sendMessage({
                action: 'extractImages'
            });
            if (response.success) {
                this.images = response.images || [];
                this.updateStatus(`Found ${this.images.length} images`);
                this.renderImages();
                this.updateImageCount();
            } else {
                throw new Error(response.error || 'Failed to extract images');
            }
        } catch (error) {
            console.error('Scan error:', error);
            this.updateStatus('Scan failed');
            this.showError('Could not scan images. Make sure you are on a Canva page.');
        } finally {
            this.isScanning = false;
            this.hideLoading();
        }
    }
    renderImages() {
        if (this.images.length === 0) {
            this.showEmptyState();
            return;
        }
        const imagesGrid = document.createElement('div');
        imagesGrid.className = 'images-grid';
        this.images.forEach((imageUrl, index) => {
            const imageItem = this.createImageItem(imageUrl, index);
            imagesGrid.appendChild(imageItem);
        });
        this.elements.mainContent.innerHTML = '';
        this.elements.mainContent.appendChild(imagesGrid);
    }
    createImageItem(imageUrl, index) {
        const item = document.createElement('div');
        item.className = 'image-item';
        item.draggable = true;
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Image ${index + 1}`;
        const dragHint = document.createElement('div');
        dragHint.className = 'drag-hint';
        dragHint.textContent = '⋮⋮';
        item.appendChild(img);
        item.appendChild(dragHint);
        this.setupDragEvents(item, imageUrl);
        return item;
    }
    setupDragEvents(element, imageUrl) {
        element.addEventListener('dragstart', (e) => {
            console.log('🎯 Drag started for:', imageUrl);
            e.dataTransfer.setData('text/uri-list', imageUrl);
            e.dataTransfer.setData('text/plain', imageUrl);
            e.dataTransfer.setData('text/html', '<img src="' + imageUrl + '" alt="tl.png">');
            e.dataTransfer.setData('application/json', JSON.stringify({
                type: 'image',
                url: imageUrl,
                name: 'tl.png'
            }));
            e.dataTransfer.effectAllowed = 'copy';
            const dragImage = this.createDragImage(element);
            e.dataTransfer.setDragImage(dragImage, 40, 40);
            element.style.opacity = '0.5';
        });
        element.addEventListener('dragend', (e) => {
            element.style.opacity = '1';
        });
        element.addEventListener('click', () => {
            this.copyImageToClipboard(imageUrl);
        });
    }
    createDragImage(element) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 80;
        canvas.height = 80;
        ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.fillRect(0, 0, 80, 80);
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 80, 80);
        return canvas;
    }
    async copyImageToClipboard(imageUrl) {
        try {
            await navigator.clipboard.writeText(imageUrl);
            this.showNotification('Image URL copied to clipboard');
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            this.showNotification('Could not copy to clipboard', 'error');
        }
    }
    async clearImages() {
        try {
            await chrome.runtime.sendMessage({
                action: 'clearImages'
            });
            this.images = [];
            this.renderImages();
            this.updateImageCount();
            this.updateStatus('Images cleared');
            this.showNotification('All images cleared');
        } catch (error) {
            console.error('Error clearing images:', error);
        }
    }
    showLoading() {
        this.elements.loadingState.style.display = 'block';
        this.elements.refreshBtn.disabled = true;
    }
    hideLoading() {
        this.elements.loadingState.style.display = 'none';
        this.elements.refreshBtn.disabled = false;
    }
    showEmptyState() {
        this.elements.mainContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🖼️</div>
                <h3>No images found</h3>
                <p>Make sure you're on a Canva design page with images</p>
            </div>
        `;
    }
    showNotCanvaPage() {
        this.elements.mainContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎨</div>
                <h3>Open a Canva design</h3>
                <p>This extension works on canva.com design pages</p>
            </div>
        `;
        this.updateStatus('Not on Canva');
    }
    showError(message) {
        this.elements.mainContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
    updateStatus(text) {
        this.elements.statusText.textContent = text;
    }
    updateImageCount() {
        const count = this.images.length;
        this.elements.imageCount.textContent = `${count} image${count !== 1 ? 's' : ''}`;
    }
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new CanvaExtractor();
});
