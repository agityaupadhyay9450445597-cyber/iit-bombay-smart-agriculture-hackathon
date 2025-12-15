@echo off
echo Deploying IIT Bombay Smart Agriculture Platform...
echo.

echo Step 1: Deploying Backend...
cd backend
call vercel --prod
echo.

echo Step 2: Deploying Frontend...
cd ../frontend
call vercel --prod
echo.

echo ✅ Deployment Complete!
echo Backend: https://iit-bombay-agriculture-backend.vercel.app
echo Frontend: https://iit-bombay-agriculture-frontend.vercel.app
echo.
pause