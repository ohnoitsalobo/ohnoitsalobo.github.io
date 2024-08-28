& ([scriptblock]::Create((irm "https://win11debloat.raphi.re/")))

Get-AppxPackage *Microsoft.Xbox* | Remove-AppxPackage
Get-AppxPackage *Microsoft.XboxGamingOverlay* | Remove-AppxPackage
Get-AppxPackage *Microsoft.Zune* | Remove-AppxPackage

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

choco install -y cmder everything reaper musescore firefox notepadplusplus inkscape irfanview wiztree 7zip gnucash sumatrapdf avidemux vlc paint.net handbrake bonjour teracopy googledrive dropbox git gh
