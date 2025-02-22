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

consumePromise();

function consumePromise() {
  createDirectory()
    .then(() => {
      return createFile();
    })
    .then(() => {
      deleteFile();
    })
    .catch((error) => {
      console.log(error);
    });
}

function createDirectory() {
  return fs
    .mkdir(dirPath, { recursive: true })
    .then(() => {
      console.log("Directory is created");
    })
    .catch((error) => {
      console.log(error);
    });
}
function createFile() {
  let count = 5;
  for (let i = 1; i <= count; i++) {
    let string = "please Enter the data here";
    let filePath = path.join(dirPath, `file-${i}.json`);
    fs.writeFile(filePath, JSON.stringify(string))
      .then(() => {
        // console.log("File is created");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("File is created");
  }
}

function deleteFile() {
  let count = 5;
  for (let i = 1; i <= count; i++) {
    let filePath = path.join(dirPath, `file-${i}.json`);
    fs.unlink(filePath)
      .then(() => {
        console.log("File is deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
