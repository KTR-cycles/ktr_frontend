import { useState, useEffect } from 'react';
import { getGoogleDriveImageUrls, testImageUrl } from '@/utils/googleDriveUtils';

interface ImageDebugProps {
  originalUrl: string;
  productName: string;
}

export default function ImageDebug({ originalUrl, productName }: ImageDebugProps) {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (!originalUrl) return;

    const runDebug = async () => {
      setTesting(true);
      const urls = getGoogleDriveImageUrls(originalUrl);
      const results = [];

      for (const url of urls) {
        try {
          const isAccessible = await testImageUrl(url);
          results.push({ url, accessible: isAccessible });
        } catch (error) {
          results.push({ url, accessible: false, error: error instanceof Error ? error.message : 'Unknown error' });
        }
      }

      setDebugInfo({
        originalUrl,
        productName,
        urls: results,
        timestamp: new Date().toISOString()
      });
      setTesting(false);
    };

    runDebug();
  }, [originalUrl, productName]);

  if (!originalUrl) {
    return <div className="text-xs text-gray-500">No URL provided</div>;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-md text-xs z-50">
      <div className="font-bold mb-2">Image Debug Info</div>
      <div><strong>Product:</strong> {productName}</div>
      <div><strong>Original URL:</strong></div>
      <div className="break-all mb-2">{originalUrl}</div>
      
      {testing ? (
        <div>Testing URLs...</div>
      ) : (
        <div>
          <div className="font-bold mb-1">URL Test Results:</div>
          {debugInfo.urls?.map((result: any, index: number) => (
            <div key={index} className="mb-1">
              <span className={result.accessible ? 'text-green-400' : 'text-red-400'}>
                {result.accessible ? '✅' : '❌'}
              </span>
              <span className="ml-1 break-all">{result.url}</span>
              {result.error && <div className="text-red-300 ml-4">{result.error}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
