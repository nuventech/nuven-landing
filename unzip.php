<?php
$zipFile = 'deploy.zip';
$extractPath = __DIR__;
//To connect with DonWeb
// Clean current directory (except this script and the zip file)
$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($extractPath, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::CHILD_FIRST
);

foreach ($files as $fileinfo) {
    // Skip deleting the zip file and the script itself during cleanup
    if ($fileinfo->getFilename() === 'deploy.zip' || $fileinfo->getFilename() === 'unzip.php' || $fileinfo->getFilename() === '.htaccess') {
        continue;
    }

    $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
    @$todo($fileinfo->getRealPath());
}

if (!file_exists($zipFile)) {
    die("Error: $zipFile not found.");
}

$zip = new ZipArchive;
$res = $zip->open($zipFile);

if ($res === TRUE) {
    $zip->extractTo($extractPath);
    $zip->close();
    
    // Delete the zip file after successful extraction
    unlink($zipFile);
    
    echo "Success: Unzipped and deleted $zipFile.";
} else {
    echo "Error: Could not open zip file.";
}
?>
