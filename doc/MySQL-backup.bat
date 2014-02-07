REM MySQL backup program
REM
REM required C:\backup\
REM required mysqldump
REM
REM MySQL-backup db frequency
REM
REM MySQL-backup erp daily
REM MySQL-backup erp weekly
REM MySQL-backup erp monthly
REM MySQL-backup erp yearly

@echo off
REM set myDate=%date:~10,4%%date:~4,2%%date:~7,2%
REM set myDate=daily-%date:~0,3%
REM set myDate=daily-%date:~7,2%

for /F "tokens=1-4 delims=/ " %%i in ('date /t') do (
set myDOW=%%i
set myMonth=%%j
set myDay=%%k
set myYear=%%l
)

set /A myWeek=%myDay%/7
echo %myDOW% %myWeek% %myYear%/%myMonth%/%myDay%

IF "%~2"=="daily"	SET myBackup=daily-%myDOW%
IF "%~2"=="weekly"	SET myBackup=weekly-%myWeek%
IF "%~2"=="monthly"	SET myBackup=monthly-%myMonth%
IF "%~2"=="yearly"	SET myBackup=yearly-%myYear%

REM set myDate=monthly-%date:~10,4%%date:~4,2%
REM set myDOW=%('date /t'):~0,3%

echo start mysqldump
mysqldump -u root -pbrazil18781 %~1 --result-file="C:\backup\%~1-%myBackup%.sql"
echo end mysqldump
