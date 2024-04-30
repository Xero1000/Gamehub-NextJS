
// Function to generate a cropped version of an image url
const getCroppedImageUrl = (url?: string) => {
  // If no URL, return a placeholder image
  if (!url) return "/no-image-placeholder-6f3882e0.webp";

  // Return the url for the cropped image
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
