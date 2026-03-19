Write-Host "Setting up NGO Management Database..." -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Importing database schema..." -ForegroundColor Yellow
try {
    $schema = Get-Content "database\schema.sql" -Raw
    # You'll need to run this manually with your password
    Write-Host "Please run this command manually:" -ForegroundColor Red
    Write-Host "mysql -u root -p < database\schema.sql" -ForegroundColor Cyan
} catch {
    Write-Host "Error reading schema file" -ForegroundColor Red
}

Write-Host ""
Write-Host "Step 2: After schema is imported, run:" -ForegroundColor Yellow
Write-Host "mysql -u root -p ngo_management < database\sample_data.sql" -ForegroundColor Cyan

Write-Host ""
Write-Host "Or use the setup-database.bat file for easier setup" -ForegroundColor Green
Write-Host ""
Write-Host "Login credentials after setup:" -ForegroundColor Green
Write-Host "Username: admin" -ForegroundColor White
Write-Host "Password: admin123" -ForegroundColor White
