const { spawn } = require('child_process');
const fs = require('fs');

const downloadPath = process.argv[3];
if(!downloadPath) {
  console.error('You must supply a download path with the --path flag');
  process.exit(1);
}

const gdriveDownloadCmd = (folderId) => ['download', '-r', folderId, '--path', downloadPath, '--skip'];

(async () => {
  const folders = fs.readFileSync('folders.csv').toString().split('\n').map(f => f.split(',')[0]);
  for await (const folder of folders) {
    const cmd = spawn('gdrive', gdriveDownloadCmd(folder));
    for await (const chunk of cmd.stdout) {
      console.log(chunk.toString());
    }
  }
})();
