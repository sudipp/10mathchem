@echo off
title Self Learning - Chemistry and Math sites
cd /d "%~dp0"
echo Building the chemistry site...
pushd ..\chemistry-self-learning
call npm run build >nul || (echo Chemistry build failed. & popd & pause & exit /b 1)
popd
echo Building the math site...
pushd ..\math-self-learning
call npm run build >nul || (echo Math build failed. & popd & pause & exit /b 1)
popd
echo.
node server.mjs
pause
