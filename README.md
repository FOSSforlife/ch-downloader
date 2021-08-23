Downloads Clone Hero drum charts from my favorite artists.

# Usage

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

```

Then, to download all of the folders:

```
node download-files.js
```
