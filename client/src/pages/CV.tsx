import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaDownload } from 'react-icons/fa';

const CV = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Use the correct path to the CV file
    const cvFilePath = '/attached_assets/files/Lochlann_OHiggins_CV.pdf';
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = cvFilePath;
    link.download = 'Lochlann_OHiggins_CV.pdf';
    document.body.appendChild(link);
    
    // This timeout allows the redirect to happen after the component mounts
    const timer = setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      
      // Redirect back to resume page after a short delay
      setTimeout(() => {
        navigate('/resume');
      }, 1000);
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  
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
          <a
            href="/attached_assets/files/Lochlann_OHiggins_CV.pdf"
            download="Lochlann_OHiggins_CV.pdf"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <FaDownload className="mr-2" /> Download CV
          </a>
        </div>
      </div>
    </>
  );
};

export default CV;
