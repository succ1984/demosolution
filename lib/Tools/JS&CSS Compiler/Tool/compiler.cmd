@echo off
if "%~x1" NEQ ".js" (
    if "%~x1" NEQ ".css" (
        echo 0
        goto End
    )
)

if "%~x1" EQU ".js" (
	goto JS
)
if "%~x1" EQU ".css" (
	goto CSS
)

:JS
set RESULT_FILE=%~n1-min%~x1
set RESULT_FILE_SIZE=%~z1

cd "%~dp1"
%~d1

"%~dp0compiler.jar" --js "%~nx1" --js_output_file "%RESULT_FILE%"
if %ERRORLEVEL% == 0 (
	echo 1
	for %%a in ("%RESULT_FILE%") do (
		set RESULT_FILE_SIZE=%%~za
	)
) else (
	echo 0
	goto End
)

"%~dp0packer.exe" "%RESULT_FILE%"
if %ERRORLEVEL% == 0 (
	echo 1
	for %%a in ("%RESULT_FILE%") do (
		if %RESULT_FILE_SIZE% LSS %%~za ( goto GG )
	)
) else (
	echo 0
	goto End
)

goto End

:CSS

cd "%~dp1"
%~d1

set RESULT_FILE=%~n1-min%~x1
"%~dp0yuicompressor-2.4.2.jar" --charset UTF-8 "%~nx1" -o "%RESULT_FILE%"
if %ERRORLEVEL% == 0 (
	echo 1
) else (
	echo 0
	goto End
)
goto End

:GG
"%~dp0compiler.jar" --js "%~nx1" --js_output_file "%RESULT_FILE%"
if %ERRORLEVEL% == 0 (
	echo 1	
) else (
	echo 0
	goto End
)
goto End

:End
ENDLOCAL
