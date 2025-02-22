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

const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "random_json_files");

processFiles();

function processFiles() {
  createDirectory()
    .then(function (directoryPath) {
      console.log(directoryPath);
      return createFile();
    })
    .then(function (createdFiles) {
      for (let file of createdFiles) {
        console.log(file);
      }
      return deleteFile();
    })
    .then(function (deletedFiles) {
      for (let file of deletedFiles) {
        console.log(file);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function createDirectory() {
  return new Promise(function (resolve, reject) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        return reject(err.message);
      }

      resolve("Directory is created: " + dirPath);
    });
  });
}

function createFile() {
  let count = 5;
  let promises = [];
  for (let i = 1; i <= count; i++) {
    let string = "please Enter the data here";
    let filePath = path.join(dirPath, `file-${i}.json`);
    let promise = new Promise(function (resolve, reject) {
      fs.writeFile(filePath, JSON.stringify(string), (err) => {
        if (err) {
          return reject(err.message);
        }
        resolve(`File-${i}.json is created`);
      });
    });
    promises.push(promise);
  }
  return Promise.all(promises);
}

function deleteFile() {
  let count = 5;
  let promises = [];
  for (let i = 1; i <= count; i++) {
    let filePath = path.join(dirPath, `file-${i}.json`);
    let promise = new Promise(function (resolve, reject) {
      fs.unlink(filePath, (err) => {
        if (err) {
          return reject(err.message);
        }

        resolve(`File-${i}.json deleted`);
      });
    });
    promises.push(promise);
  }
  return Promise.all(promises);
}
