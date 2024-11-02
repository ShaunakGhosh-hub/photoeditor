// Select elements
const uploadImage = document.getElementById('uploadImage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const filterSelect = document.getElementById('filterSelect');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const downloadBtn = document.getElementById('downloadBtn');
const adjustmentButtons = document.querySelectorAll('.adjustment-button');
const sliderPanel = document.getElementById('sliderPanel');
const sliderLabel = document.getElementById('sliderLabel');
const adjustmentSlider = document.getElementById('adjustmentSlider');
const closeSliderPanel = document.getElementById('closeSliderPanel');

let image = new Image();
let currentFilter = 'none';

// Adjustments object to store each setting's value
let adjustments = {
    brightness: 100,
    contrast: 100,
    highlights: 100,
    shadows: 100,
};

// Function to load image on canvas
uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.src = e.target.result;
            image.onload = () => {
                drawImageWithAdjustments();
            };
        };
        reader.readAsDataURL(file);
    }
});

// Apply the selected filter from the dropdown
applyFilterBtn.addEventListener('click', () => {
    currentFilter = filterSelect.value;
    drawImageWithAdjustments();
});

// Function to draw the image with adjustments applied
function drawImageWithAdjustments() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `
        ${currentFilter}
        brightness(${adjustments.brightness}%)
        contrast(${adjustments.contrast}%)
    `;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Open the slider panel and set up the adjustment type
adjustmentButtons.forEach(button => {
    button.addEventListener('click', () => {
        const adjustmentType = button.getAttribute('data-adjustment');
        sliderLabel.textContent = adjustmentType.charAt(0).toUpperCase() + adjustmentType.slice(1);
        adjustmentSlider.value = adjustments[adjustmentType];
        adjustmentSlider.dataset.adjustmentType = adjustmentType;
        sliderPanel.classList.add('open');
    });
});

// Update the adjustment value based on slider input and redraw the image
adjustmentSlider.addEventListener('input', () => {
    const adjustmentType = adjustmentSlider.dataset.adjustmentType;
    adjustments[adjustmentType] = adjustmentSlider.value;
    drawImageWithAdjustments();
});

// Close the slider panel
closeSliderPanel.addEventListener('click', () => {
    sliderPanel.classList.remove('open');
});

// Download the canvas as an image
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'filtered-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
