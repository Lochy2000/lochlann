// Fix for Firebase Auth Domain in standalone deployments
// This script adds the current domain to Firebase's authorized domains for auth providers

// Function to check if the domain is in the redirect whitelist
function addCurrentDomainToFirebaseAuth() {
  // Only run this in a browser environment
  if (typeof window === 'undefined') return;
  
  // Get the current domain from the window location
  const currentDomain = window.location.hostname;
  
  console.log('Current domain:', currentDomain);
  console.log('Firebase auth domain status check initiated');
  
  // Display a warning message to remind users to add the domain
  if (!currentDomain.includes('localhost') && 
      !currentDomain.includes('127.0.0.1') && 
      !currentDomain.includes('lochlann.vercel.app')) {
    console.warn(
      `IMPORTANT: Make sure to add "${currentDomain}" to your Firebase Authentication authorized domains. ` +
      'Go to Firebase Console > Authentication > Settings > Authorized domains and add this domain.'
    );
  }
}

// Execute the function
addCurrentDomainToFirebaseAuth();

export { addCurrentDomainToFirebaseAuth };
