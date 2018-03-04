import getImagePalette from 'image-palette-core'

const img = new Image();
img.src = 'albumart.jpg';
img.onload = function() {
  // The image *must* be loaded before calling `getImagePalette`
  const palette = getImagePalette(img);
}
