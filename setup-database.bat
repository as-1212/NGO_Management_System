@echo off
echo Setting up NGO Management Database...
echo.

echo Please enter your MySQL root password:
mysql -u root -p < database\schema.sql

if %errorlevel% neq 0 (
    echo Error: Schema import failed. Please check your MySQL password.
    pause
    exit /b 1
)

echo Schema imported successfully!

echo.
echo Importing sample data...
mysql -u root -p ngo_management < database\sample_data.sql

if %errorlevel% neq 0 (
    echo Warning: Sample data import failed, but schema is ready.
) else (
    echo Sample data imported successfully!
)

echo.
echo Database setup complete!
echo You can now login with:
echo Username: admin
echo Password: admin123
echo.
pause
