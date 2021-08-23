const { spawn } = require('child_process');
const fs = require('fs');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const BRADY_FOLDER = '1ItnEXKv0E0ds1-X_f7qh8c1OZxAJByDX';
const GDRIVE_MAX_FILES = 200;
const GDRIVE_API_TIMEOUT = 2000;

const gdriveListCmd = (folderId) => ['list', '--query', `'${folderId}' in parents`, '-m', `${GDRIVE_MAX_FILES}`];

const folderFilter = ({id, name}) => {
  return typeof id === 'string' && id.length > 0 && typeof name === 'string' && name.length > 0 && !name.startsWith('.sync')
}

const getFoldersFromResponse = (chunk) => chunk.toString().split('\n').map(line => ({id: line.split('   ')[0], name: line.split('   ')[1]})).filter(folderFilter);

const sortByFolderName = (folderA, folderB) => folderA.name.toUpperCase() > folderB.name.toUpperCase();

(async () => {
  const artists = fs.readFileSync('artists.txt').toString().split('\n').map(a => a.toUpperCase());

  // Get main list
  let cmd = spawn('gdrive', gdriveListCmd(BRADY_FOLDER));

  const authors = [];
  const folders = [];
  for await (const chunk of cmd.stdout) {
    authors.push(...getFoldersFromResponse(chunk));
  }

  // Get folders
  // console.log(authors.filter(authorFilter))
  for await (const {id, name} of authors) {
    console.log(name);
    let cmd = spawn('gdrive', gdriveListCmd(id));
    for await (const chunk of cmd.stdout) {
      const foldersFromResponse = getFoldersFromResponse(chunk);
      const foldersToAdd = foldersFromResponse.filter(({name}) => artists.includes(name.toUpperCase())).map(f => ({...f, author: name}));
      console.log(foldersToAdd);
      folders.push(...foldersToAdd);
    }
    await sleep(GDRIVE_API_TIMEOUT);
  }

  fs.writeFileSync('folders.csv', folders.sort(sortByFolderName).map(({id, name, author}) => `${id},${name},${author}`).join('\n'));
})();
