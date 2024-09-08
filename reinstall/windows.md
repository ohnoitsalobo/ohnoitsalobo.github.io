shutdown /r /fw /t 1
# Super God Mode - ThioJoe
Set-ExecutionPolicy Bypass -Scope Process -Force; irm "https://github.com/ThioJoe/Windows-Super-God-Mode/releases/latest/download/Super_God_Mode.ps1" | iex

# activate windows - Massgravel
irm https://get.activated.win | iex

# WinUtil - Chris Titus
irm "https://christitus.com/win" | iex

# win11 de-blaot
& ([scriptblock]::Create((irm "https://win11debloat.raphi.re/")))

# further de-bloat
Get-AppxPackage *Microsoft.Xbox* | Remove-AppxPackage
Get-AppxPackage *Microsoft.XboxGamingOverlay* | Remove-AppxPackage
Get-AppxPackage *Microsoft.Zune* | Remove-AppxPackage

# install choco
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
# install programs
choco install -y cmder everything reaper musescore firefox notepadplusplus inkscape irfanview wiztree 7zip gnucash sumatrapdf avidemux vlc paint.net handbrake bonjour teracopy googledrive dropbox git gh
