Downloads Clone Hero drum charts from your favorite artists.

# Usage

First, make sure you have the latest [Node.js](https://nodejs.dev) installed, and have set up the [gdrive](https://github.com/prasmussen/gdrive) CLI.

Create an `artists.txt` file in the directory, for example (choose any bands you want, just make sure none of them include commas):

```
animals as Leaders
archspire
beyond creation
```

Then run the update script (no dependencies, so no need to npm install):

```
node update-csv.js
```

You should now see a `folders.csv` that looks something like this:

```
11whCwOu_28yOsKI3MopE-q1wcYjdgvy2,Animals as Leaders,Onyxite
1SWp47BgB0EA0fZYSpFMCjqZKAMp25VX_,Animals As Leaders,Xane60
1SSEetI5pVFPsCnbGN-Fy6sl6ju2ltV6-,Archspire,Xane60
1DIkoZEKsQyqUyTZRKmLWxgEVB7bs9FAd,Between the Buried and Me,Onyxite
1TcrEQR-efGZNqWAgj4tRDR6R0e42EcKf,Between The Buried And Me,Xane60
```

Then, to download all of the folders:

```
node download-files.js
```
