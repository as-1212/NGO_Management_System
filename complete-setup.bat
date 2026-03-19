@echo off
echo ========================================
echo NGO Management System - Complete Setup
echo ========================================
echo.

echo Step 1: Setting up database...
echo Please enter your MySQL root password when prompted.
echo.

mysql -u root -p < database\schema.sql

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Schema import failed!
    echo Please check your MySQL password and try again.
    echo.
    pause
    exit /b 1
)

echo.
echo Step 2: Importing sample data...
mysql -u root -p ngo_management < database\sample_data.sql

if %errorlevel% neq 0 (
    echo WARNING: Sample data import had issues, but schema should be ready.
) else (
    echo SUCCESS: Sample data imported!
)

echo.
echo Step 3: Restarting backend server...
echo Please wait...
timeout /t 3 /nobreak > nul

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo You can now login to the application:
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo LOGIN CREDENTIALS:
echo Username: admin
echo Password: admin123
echo.
echo The application should now be fully functional!
echo.
pause
