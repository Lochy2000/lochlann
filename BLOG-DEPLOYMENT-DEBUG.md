# Blog Deployment Troubleshooting Guide

This document explains the changes made to diagnose and fix the blog deployment issues on Vercel.

## Changes Made

1. **Enhanced Logging in Build Scripts**:
   - Added detailed logging in `scripts/deployment/build.js`
   - Added error handling to continue the build process even if parts fail
   - Added diagnostic information to help identify where issues occur

2. **Improved Blog Build Process**:
   - Enhanced `blog/build-no-ts.js` with better error reporting
   - Added environment variable checks to verify Firebase config
   - Added diagnostic output files to track build status

3. **Added Path Fixing Robustness**:
   - Improved `scripts/fix-blog-paths.js` to handle missing files
   - Added recovery logic to copy files from original locations if needed
   - Enhanced directory structure validation

4. **Added Build Verification**:
   - Created `scripts/verify-build.js` to validate build output
   - Checks for critical files and directories
   - Analyzes index.html files for proper asset paths

5. **Added Debug Marker**:
   - Added `debug.json` to blog/public to track when builds are updated

## How to Use the New Features

### Verifying a Failed Build
After a failed build on Vercel, check the logs for these marker lines:
- `==== BUILD SCRIPT STARTED ====`
- `==== STARTING CV BUILD ====`
- `==== CV BUILD COMPLETED SUCCESSFULLY ====`
- `==== STARTING BLOG BUILD ====`
- `==== BLOG BUILD COMPLETED SUCCESSFULLY ====`
- `==== COPYING MAIN SITE BUILD ====`
- `==== COPYING BLOG BUILD ====`
- `==== FIXING ASSET PATHS ====`
- `==== CREATING ROOT REDIRECT ====`
- `==== BUILD PROCESS COMPLETED ====`

If any of these markers are missing or show errors, it indicates where the build is failing.

### Checking Blog Updates
After deployment, you can check if your blog has been updated by accessing:
`https://lochlann.vercel.app/blog/debug.json`

This file contains version information that indicates when it was last built.

### Running a Local Verification
You can check your build locally with:
```
npm run build:all
npm run verify-build
```

This will help identify any issues with the build structure.

## Possible Issues and Solutions

1. **Blog Not Building**: 
   - Check the Vercel logs for `==== BLOG BUILD FAILED ====`
   - Look for error details in the logs
   - Verify your Firebase environment variables in Vercel

2. **Blog Not Being Copied**:
   - Check logs for `Blog dist directory not found` or similar errors
   - Verify the build structure with `verify-build.js`

3. **Asset Path Issues**:
   - Check logs from the `fix-blog-paths.js` script
   - Verify asset paths in the `index.html` files for proper prefixing

## Next Steps

If the blog is still not updating after these changes:

1. Try a manual rebuild in Vercel by clicking "Redeploy" in the deployment dashboard
2. Update the `debug.json` file with the current date/time and push to trigger a new build
3. Check that your Vercel environment variables match your local `.env` file
4. Consider checking the Vercel dashboard for specific build settings or caching issues
