/**
 * Alternative Google Drive image URL conversion utilities
 */

/**
 * Converts Google Drive URL to multiple possible direct image URLs
 * @param driveUrl - Google Drive sharing URL
 * @returns Array of possible direct image URLs to try
 */
export function getGoogleDriveImageUrls(driveUrl: string): string[] {
  if (!driveUrl || typeof driveUrl !== 'string') {
    return [];
  }

  try {
    // Extract file ID from various Google Drive URL formats
    const fileIdMatch = driveUrl.match(/(?:drive\.google\.com\/file\/d\/|open\?id=|docs\.google\.com\/document\/d\/)([a-zA-Z0-9-_]+)/);
    
    if (!fileIdMatch) {
      return [driveUrl]; // Return original URL if not a Google Drive URL
    }

    const fileId = fileIdMatch[1];
    
    // Return multiple possible direct image URLs - using the working format
    return [
      `https://drive.usercontent.google.com/download?id=${fileId}&export=view`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      `https://drive.google.com/uc?id=${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      `https://lh3.googleusercontent.com/d/${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`,
      `https://drive.google.com/thumbnail?id=${fileId}`,
      `https://docs.google.com/uc?export=view&id=${fileId}`,
      `https://drive.google.com/file/d/${fileId}/preview`,
      driveUrl, // Fallback to original URL
    ];
  } catch (error) {
    console.warn('Error generating Google Drive image URLs:', error);
    return [driveUrl];
  }
}

/**
 * Creates a proxy URL for Google Drive images (if needed)
 * @param driveUrl - Google Drive URL
 * @returns Proxy URL
 */
export function createProxyUrl(driveUrl: string): string {
  if (!driveUrl || typeof driveUrl !== 'string') {
    return '';
  }
  
  // You can implement a proxy service here if needed
  // For now, return the original URL
  return driveUrl;
}

/**
 * Checks if a URL is accessible by creating a test image
 * @param url - URL to test
 * @returns Promise that resolves to true if accessible
 */
export function testImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Try to handle CORS
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    
    // Timeout after 10 seconds (increased for slower connections)
    setTimeout(() => resolve(false), 10000);
  });
}

/**
 * Finds the first accessible image URL from a list
 * @param urls - Array of URLs to test
 * @returns Promise that resolves to the first accessible URL or empty string
 */
export async function findAccessibleImageUrl(urls: string[]): Promise<string> {
  for (const url of urls) {
    try {
      const isAccessible = await testImageUrl(url);
      if (isAccessible) {
        return url;
      }
    } catch (error) {
      // Continue to next URL
    }
  }
  
  return '';
}
