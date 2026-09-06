@echo off
echo Installing Vercel CLI globally...
npm install -g vercel --loglevel error
if %errorlevel% equ 0 (
    echo Vercel CLI installed successfully!
    vercel --version
) else (
    echo Installation failed. Trying with npm...
    npm install -g vercel@latest
)
echo Done.
