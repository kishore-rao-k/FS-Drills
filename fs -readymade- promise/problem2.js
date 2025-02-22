const fs = require("fs/promises");
const path = require("path");

const lipsumFilePath = path.join(__dirname, "lipsum.txt");
const filenamesPath = path.join(__dirname, "filename.txt");
const uppercaseFilePath = path.join(__dirname, `uppercase.txt`);
const lowercaseFilePath = path.join(__dirname, `lowercase.txt`);
const sortedTextFilePath = path.join(__dirname, `sortedText.txt`);

consumePromise();

function consumePromise() {
  getReadFile()
    .then(function (fileContent) {
      return createFile(fileContent);
    })
    .then(function () {
      return readUpperCase();
    })
    .then(function (lowercaseFile) {
      return createFileForLowerCase(lowercaseFile);
    })
    .then(function () {
      return readSortedFile();
    })
    .then(function (fileContent) {
      return createFileForSortedText(fileContent);
    })
    .then(function () {
      return extractFileName();
    })
    .then(function (fileNameArray) {
      return deleteFile(fileNameArray);
    })
    .catch(function (err) {
      console.err(err.message);
    });
}

function getReadFile() {
  return fs
    .readFile(lipsumFilePath, "utf-8")
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function createFile(content) {
  let uppercaseContent = content.toUpperCase();
  return fs
    .writeFile(uppercaseFilePath, uppercaseContent)
    .then(() => {
      console.log("uppercase.txt is created");
      return toStoreFileName("uppercase.txt");
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function toStoreFileName(filename) {
  return fs
    .writeFile(filenamesPath, filename + "\n")
    .then(() => {
      console.log("file name is stored in filename.txt");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

function readUpperCase() {
  return fs
    .readFile(uppercaseFilePath, "utf-8")
    .then((upperCaseFile) => {
      let lowercase = upperCaseFile.toLowerCase().split(".").join(".\n");
      return lowercase;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function createFileForLowerCase(lowercaseFile) {
  return fs
    .writeFile(lowercaseFilePath, lowercaseFile)
    .then(() => {
      console.log("lowercase.txt is created");

      return appendFileName("lowercase.txt");
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}
function appendFileName(filename) {
  return fs
    .appendFile(filenamesPath, filename + "\n")
    .then(() => {
      console.log("file name is stored in filename.txt");
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function readSortedFile() {
  return fs
    .readFile(lowercaseFilePath, "utf-8")
    .then((filename) => {
      let sortedContent = filename
        .trim()
        .split(/\s+/)
        .filter((word) => word.length)
        .sort()
        .join(" ");
      return sortedContent;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function createFileForSortedText(content) {
  return fs
    .writeFile(sortedTextFilePath, content)
    .then(() => {
      console.log("sortedText.txt is created");
      appendFileName("sortedText.txt");
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function extractFileName() {
  return fs
    .readFile(filenamesPath, "utf8")
    .then((data) => {
      let fileNameArray = data
        .trim()
        .split("\n")
        .map((name) => name.trim())
        .filter((fName) => fName.length > 0);
      return fileNameArray;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}
function deleteFile(fileNameArray) {
  return Promise.all(
    fileNameArray.map((fileName) => {
      let filePath = path.join(__dirname, fileName);
      return fs
        .unlink(filePath)
        .then(() => {
          console.log("File is deleted");
        })
        .catch((err) => {
          console.log(err.message);
          throw err;
        });
    })
  );
}
