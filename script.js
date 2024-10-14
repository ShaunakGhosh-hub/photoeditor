// Select DOM elements
const uploadImage = document.getElementById('uploadImage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const filterSelect = document.getElementById('filterSelect');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const downloadBtn = document.getElementById('downloadBtn'); // Add download button

let originalImage = new Image(); // Store the uploaded image

// Maximum canvas dimensions
const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

// Handle image upload and load it to the canvas
uploadImage.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      originalImage.src = event.target.result; // Set image source from the uploaded file
    }
    reader.readAsDataURL(file);
  }
});

// Draw the image on canvas once it's loaded
originalImage.onload = function () {
  const [newWidth, newHeight] = getScaledDimensions(originalImage, MAX_WIDTH, MAX_HEIGHT);

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.drawImage(originalImage, 0, 0, newWidth, newHeight); // Draw resized image
}

// Apply selected filter to the image
applyFilterBtn.addEventListener('click', function () {
  if (originalImage.src) {
    const selectedFilter = filterSelect.value;

    // Clear the canvas and apply the selected filter
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = selectedFilter;
    const [newWidth, newHeight] = getScaledDimensions(originalImage, MAX_WIDTH, MAX_HEIGHT);
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
  } else {
    alert('Please upload an image first!');
  }
});

// Add download functionality
downloadBtn.addEventListener('click', function () {
  if (originalImage.src) {
    const link = document.createElement('a');
    link.download = 'filtered_image.png';
    link.href = canvas.toDataURL();
    link.click();
  } else {
    alert('Please upload an image first!');
  }
});

// Function to calculate scaled dimensions while maintaining aspect ratio
function getScaledDimensions(img, maxWidth, maxHeight) {
  const widthRatio = maxWidth / img.width;
  const heightRatio = maxHeight / img.height;
  const scaleFactor = Math.min(widthRatio, heightRatio);

  const newWidth = img.width * scaleFactor;
  const newHeight = img.height * scaleFactor;

  return [newWidth, newHeight];
}

// Filters with labels
const filters = [
  { name: 'None', value: 'none' },
  { name: 'Blur', value: 'blur(5px)' },
  { name: 'Brighten', value: 'brightness(150%)' },
  { name: 'High Contrast', value: 'contrast(200%)' },
  { name: 'Grayscale', value: 'grayscale(100%)' },
  { name: 'Hue Rotate 90°', value: 'hue-rotate(90deg)' },
  { name: 'Invert Colors', value: 'invert(100%)' },
  { name: '50% Opacity', value: 'opacity(50%)' },
  { name: 'Saturate', value: 'saturate(200%)' },
  { name: 'Sepia', value: 'sepia(100%)' },
  { name: 'Drop Shadow', value: 'drop-shadow(16px 16px 20px black)' },
  { name: 'Low Contrast', value: 'contrast(50%)' },
  { name: 'Hue Rotate 180°', value: 'hue-rotate(180deg)' },
  { name: 'Light Blur', value: 'blur(2px)' },
  { name: 'Moderate Saturate', value: 'saturate(150%)' },
  { name: 'Dim Brightness', value: 'brightness(75%)' },
  { name: '50% Grayscale', value: 'grayscale(50%)' },
  { name: 'Invert 50%', value: 'invert(50%)' },
  { name: 'Sepia 50%', value: 'sepia(50%)' },
  { name: '70% Opacity', value: 'opacity(70%)' }
];

// Populate the filterSelect dropdown with user-friendly labels
filterSelect.innerHTML = filters.map(filter => `<option value="${filter.value}">${filter.name}</option>`).join('');
