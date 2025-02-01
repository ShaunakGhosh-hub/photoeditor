// script.js

// Get DOM elements
const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const filterSelect = document.getElementById('filterSelect');
const brightnessRange = document.getElementById('brightnessRange');
const contrastRange = document.getElementById('contrastRange');
const shadowsRange = document.getElementById('shadowsRange');
const highlightsRange = document.getElementById('highlightsRange');
const saturationRange = document.getElementById('saturationRange');
const applyFilterButton = document.getElementById('applyFilter');
const applyAdjustmentsButton = document.getElementById('applyAdjustments');
const downloadButton = document.getElementById('download');

let image = new Image();
let currentFilter = 'none';
let brightness = 100;
let contrast = 100;
let shadows = 100;
let highlights = 100;
let saturation = 100;

// Load image onto canvas
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.src = e.target.result;
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Apply selected filter
applyFilterButton.addEventListener('click', () => {
    currentFilter = filterSelect.value;
    applyFiltersAndAdjustments();
});

// Apply brightness, contrast, shadows, highlights, and saturation adjustments
applyAdjustmentsButton.addEventListener('click', () => {
    brightness = brightnessRange.value;
    contrast = contrastRange.value;
    shadows = shadowsRange.value;
    highlights = highlightsRange.value;
    saturation = saturationRange.value;
    applyFiltersAndAdjustments();
});

// Function to apply filters and adjustments
function applyFiltersAndAdjustments() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    
    // Apply shadows and highlights using a workaround
    ctx.globalCompositeOperation = 'multiply'; // For shadows
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = 'screen'; // For highlights
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = 'source-over'; // Reset to default

    switch (currentFilter) {
        case 'grayscale':
            ctx.filter += ' grayscale(100%)';
            break;
        case 'sepia':
            ctx.filter += ' sepia(100%)';
            break;
        case 'invert':
            ctx.filter += ' invert(100%)';
            break;
        case 'brightness':
            ctx.filter += ' brightness(150%)'; // Example for brightness filter
            break;
        case 'contrast':
            ctx.filter += ' contrast(150%)'; // Example for contrast filter
            break;
        default:
            break;
    }
    
    ctx.drawImage(image, 0, 0);
    ctx.filter = 'none'; // Reset filter for future drawings
}

// Download the edited image
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
