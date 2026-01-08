# Status Dashboard for MERN project
# Ejecutar: powershell -ExecutionPolicy Bypass -File .\status-dashboard.ps1

$services = @(
    @{ Name='Client'; Type='http'; Url='http://localhost:3000' },
    @{ Name='Server'; Type='http'; Url='http://localhost:5000' },
    @{ Name='Mongo';  Type='tcp';  Host='localhost'; Port=27017 }
)

function Check-Http($url) {
    try {
        # Intentar HEAD primero (más rápido); si falla, hacer GET
        try {
            $resp = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 5 -UseBasicParsing
        } catch {
            $resp = Invoke-WebRequest -Uri $url -Method Get -TimeoutSec 5 -UseBasicParsing
        }
        return @{ Ok = $true; Status = $resp.StatusCode }
    } catch {
        return @{ Ok = $false; Error = $_.Exception.Message }
    }
}

function Check-Tcp($hostname, $port) {
    try {
        $res = Test-NetConnection -ComputerName $hostname -Port $port -WarningAction SilentlyContinue
        return @{ Ok = $res.TcpTestSucceeded; Info = $res }
    } catch {
        return @{ Ok = $false; Error = $_.Exception.Message }
    }
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " MERN Project Status Dashboard" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$okCount = 0
$failCount = 0

foreach ($s in $services) {
    if ($s.Type -eq 'http') {
        $result = Check-Http $s.Url
        if ($result.Ok) {
            Write-Host ("- {0,-8} : [OK]   {1} (HTTP {2})" -f $s.Name, $s.Url, $result.Status) -ForegroundColor Green
            $okCount++
        } else {
            Write-Host ("- {0,-8} : [FAIL] {1}" -f $s.Name, $s.Url) -ForegroundColor Red
            Write-Host ("    Reason: {0}" -f $result.Error) -ForegroundColor Yellow
            $failCount++
        }
    } else {
        $result = Check-Tcp $s.Host $s.Port
        if ($result.Ok) {
            Write-Host ("- {0,-8} : [OK]   {1}:{2}" -f $s.Name, $s.Host, $s.Port) -ForegroundColor Green
            $okCount++
        } else {
            Write-Host ("- {0,-8} : [FAIL] {1}:{2}" -f $s.Name, $s.Host, $s.Port) -ForegroundColor Red
            $failCount++
        }
    }
}

Write-Host "`nSummary: $okCount OK, $failCount FAIL`n" -ForegroundColor Cyan
Write-Host "Abrir en navegador:" -ForegroundColor Cyan
Write-Host "- Cliente: http://localhost:3000" -ForegroundColor White
Write-Host "- API:     http://localhost:5000" -ForegroundColor White

if ($failCount -gt 0) { exit 1 } else { exit 0 }
