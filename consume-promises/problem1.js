/*
    Folder structure:
        ├── problem1.js
        ├── problem2.js
        └── test
            ├── testProblem1.js
            └── testProblem2.js
*/

/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs/promises");
const path = require("path");
const dirPath = path.join(__dirname, "random_json_files");

processFiles();
const n = 2;
function processFiles() {
  createDirectory()
    .then(function () {
      return createFile(n);
    })
    .then(function () {
      //If deleteFile(n) doesn't return Promise.all(deletedFileArray), the .catch(handleError) in processFiles() won't catch errors during the deletion process.
      return deleteFile(n);
    })
    .catch(handleError);
}

function createDirectory() {
  return fs
    .mkdir(dirPath, { recursive: true })
    .then(() => {
      console.log("Directory is created");
    })
    .catch(handleError);
}
function createFile(count) {
  let createdFilesArray = [];
  for (let i = 1; i <= count; i++) {
    let string = "please Enter the data here";
    let filePath = path.join(dirPath, `file-${i}.json`);
    createdFilesArray.push(
      fs
        .writeFile(filePath, JSON.stringify(string))
        .then(() => {
          console.log("File is created");
        })
        .catch(handleError)
    );
  }
  return Promise.all(createdFilesArray);
}

function deleteFile(count) {
  let deletedFileArray = [];
  for (let i = 1; i <= count; i++) {
    let filePath = path.join(dirPath, `file-${i}.json`);
    deletedFileArray.push(
      fs
        .unlink(filePath)
        .then(() => {
          console.log("File is deleted");
        })
        .catch(handleError)
    );
  }
  return Promise.all(deletedFileArray);
}

function handleError(error) {
  console.error(error.message);
}
