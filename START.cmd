@echo off
cd /d "%~dp0"
where pnpm >nul 2>nul
if errorlevel 1 (
 echo Install Node.js 22+ and pnpm 11.22.0. See README.md.
 pause
 exit /b 1
)
if not exist node_modules (
 call pnpm install --frozen-lockfile
 if errorlevel 1 exit /b 1
)
call pnpm dev -- --open
pause
