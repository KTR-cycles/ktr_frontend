/**
 * Converts Google Drive sharing URLs to direct image URLs
 * @param driveUrl - Google Drive sharing URL
 * @returns Direct image URL that can be used in img src
 * 
 * @example
 * convertGoogleDriveUrl("https://drive.google.com/file/d/1wZk5OF9SyYiLOz8yDtCCas8L5vx8PQ7M/view?usp=drivesdk")
 * // Returns: "https://drive.usercontent.google.com/download?id=1wZk5OF9SyYiLOz8yDtCCas8L5vx8PQ7M&export=view"
 */
export function convertGoogleDriveUrl(driveUrl: string): string {
  if (!driveUrl || typeof driveUrl !== 'string') {
    return '';
  }

  try {
    // Check if it's a Google Drive URL - support multiple formats
    const driveRegexes = [
      /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/,
      /^https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9-_]+)/,
      /^https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9-_]+)/,
    ];
    
    for (const regex of driveRegexes) {
      const match = driveUrl.match(regex);
      if (match) {
        const fileId = match[1];
        // Use the working Google Drive direct image URL format
        const convertedUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=view`;
        return convertedUrl;
      }
    }
    
    // If it's already a direct URL or not a Google Drive URL, return as is
    return driveUrl;
  } catch (error) {
    console.warn('Error converting Google Drive URL:', error);
    return driveUrl;
  }
}

/**
 * Processes multiple image URLs (comma-separated) and converts Google Drive URLs
 * @param imagesString - Comma-separated string of image URLs
 * @returns Array of processed image URLs
 */
export function processImageUrls(imagesString: string): string[] {
  if (!imagesString || typeof imagesString !== 'string') {
    return [];
  }

  try {
    return imagesString
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0)
      .map(convertGoogleDriveUrl)
      .filter(url => url.length > 0);
  } catch (error) {
    console.warn('Error processing image URLs:', error);
    return [];
  }
}

/**
 * Gets the first valid image URL from a comma-separated string
 * @param imagesString - Comma-separated string of image URLs
 * @returns First processed image URL or empty string
 */
export function getFirstImageUrl(imagesString: string): string {
  try {
    const urls = processImageUrls(imagesString);
    return urls.length > 0 ? urls[0] : '';
  } catch (error) {
    console.warn('Error getting first image URL:', error);
    return '';
  }
}

/**
 * Checks if a URL is a Google Drive URL
 * @param url - URL to check
 * @returns True if it's a Google Drive URL
 */
export function isGoogleDriveUrl(url: string): boolean {
  try {
    return /^https:\/\/drive\.google\.com\/file\/d\//.test(url);
  } catch (error) {
    console.warn('Error checking Google Drive URL:', error);
    return false;
  }
}

