@echo off
REM set myDate=%date:~10,4%%date:~4,2%%date:~7,2%
REM set myDate=daily-%date:~0,3%
REM set myDate=daily-%date:~7,2%

for /F "tokens=1-4 delims=/ " %%i in ('date /t') do (
set myDOW=%%i
set myMonth=%%j
set myDay=%%k
set myYear=%%l
set /A myWeek=%myDay%/7
)
echo %myDOW% %myWeek% %myYear%/%myMonth%/%myDay%

REM set myDate=monthly-%date:~10,4%%date:~4,2%

REM set myDOW=%('date /t'):~0,3%

REM mysqldump -u root -pbrazil18781 erp > erp.sql


echo Running dump...
REM "C:\Program Files (x86)\Zend\MySQL51\bin\mysqldump" -u root -pbrazil18781 erp --result-file="C:\backup\erp-%myDate%.sql"
mysqldump -u root -pbrazil18781 erp --result-file="C:\backup\erp-%myDOW%.sql"
echo Done!


