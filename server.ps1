$port = 8080
$root = "c:\Users\ntkha\Documents\friends furnitures"

$endpoint = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any, $port)
$tcpListener = New-Object System.Net.Sockets.TcpListener($endpoint)

try {
    $tcpListener.Start()
} catch {
    Write-Host "Error starting TCP listener: $_"
    exit 1
}

Write-Host "👑 FRIENDS FURNITURE Fast Non-Blocking Server on port $port"

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".webp" = "image/webp"
    ".ico"  = "image/x-icon"
}

while ($true) {
    try {
        $client = $tcpListener.AcceptTcpClient()
        $stream = $client.GetStream()
        $stream.ReadTimeout = 2000
        $stream.WriteTimeout = 2000

        $buffer = New-Object byte[] 8192
        $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        if ($bytesRead -le 0) {
            $client.Close()
            continue
        }

        $requestText = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
        $firstLine = $requestText.Split("`n")[0].Trim()
        $parts = $firstLine.Split(" ")
        $method = $parts[0]
        $rawUrl = if ($parts.Length -gt 1) { $parts[1] } else { "/" }

        $cleanPath = $rawUrl.Split("?")[0].TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($cleanPath)) {
            $cleanPath = "index.html"
        }
        $relPath = $cleanPath.Replace('/', '\')
        $filePath = Join-Path $root $relPath

        if (-not (Test-Path $filePath -PathType Leaf)) {
            $filePath = Join-Path $root "index.html"
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }
            $contentBytes = [System.IO.File]::ReadAllBytes($filePath)

            $header = "HTTP/1.1 200 OK`r`n" +
                      "Content-Type: $contentType`r`n" +
                      "Content-Length: $($contentBytes.Length)`r`n" +
                      "Access-Control-Allow-Origin: *`r`n" +
                      "Connection: close`r`n`r`n"
            
            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            if ($method -ne "HEAD") {
                $stream.Write($contentBytes, 0, $contentBytes.Length)
            }
        } else {
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $header = "HTTP/1.1 404 Not Found`r`nContent-Length: $($notFound.Length)`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($notFound, 0, $notFound.Length)
        }

        $stream.Flush()
        $client.Close()
    } catch {
        # ignore & continue
    }
}
