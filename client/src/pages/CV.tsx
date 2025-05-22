import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaDownload } from 'react-icons/fa';
import { downloadCV, getCVUrl } from '@/utils/downloadUtils';

const CV = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Use the utility function to handle the download
    const timer = setTimeout(() => {
      downloadCV();
      setIsLoading(false);
      
      // Redirect back to resume page after a short delay
      setTimeout(() => {
        navigate('/resume');
      }, 1000);
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  
  const handleManualDownload = () => {
    downloadCV();
  };
  
  return (
    <>
      <Helmet>
        <title>Downloading CV | Lochlann O'Higgins</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="text-center">
          <FaDownload className="mx-auto text-6xl mb-6 text-blue-400" />
          <h1 className="text-3xl font-bold mb-4">Your CV is downloading...</h1>
          <p className="mb-6 text-slate-300">If the download doesn't start automatically, please click the button below.</p>
          <button
            onClick={handleManualDownload}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <FaDownload className="mr-2" /> Download CV
          </button>
          
          {/* Fallback link */}
          <div className="mt-4">
            <a
              href={getCVUrl()}
              download="Lochlann_OHiggins_CV.pdf"
              className="text-blue-300 hover:text-blue-200 text-sm underline"
            >
              Direct download link
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CV;
