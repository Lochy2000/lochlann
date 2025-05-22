/**
 * Utility functions for handling file downloads
 */

export const downloadCV = () => {
  // Try multiple potential paths for cv.pdf
  const cvPaths = [
    '/attached_assets/files/cv.pdf',
    '/public/attached_assets/files/cv.pdf',
    '/assets/files/cv.pdf'
  ];

  const tryDownload = async (path: string): Promise<boolean> => {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      if (response.ok) {
        // File exists, trigger download
        const link = document.createElement('a');
        link.href = path;
        link.download = 'Lochlann_OHiggins_CV.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
      }
    } catch (error) {
      console.log(`Failed to download from ${path}:`, error);
    }
    return false;
  };

  // Try each path until one works
  const attemptDownload = async () => {
    for (const path of cvPaths) {
      const success = await tryDownload(path);
      if (success) {
        console.log(`Successfully downloaded CV from: ${path}`);
        return;
      }
    }
    
    // If all paths fail, show error message
    alert('Sorry, the CV file could not be found. Please contact Lochlann directly at Lochlann_oht@hotmail.com');
    console.error('All CV download paths failed');
  };

  attemptDownload();
};

export const getCVUrl = (): string => {
  // Return the primary CV URL
  return '/attached_assets/files/cv.pdf';
};
