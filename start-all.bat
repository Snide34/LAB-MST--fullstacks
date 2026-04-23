@echo off
echo ========================================
echo Starting Orders Management System
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo Both servers are starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to run integration tests...
pause > nul

timeout /t 5 /nobreak > nul
node test-integration.js

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Open http://localhost:3000 in your browser
echo.
pause
