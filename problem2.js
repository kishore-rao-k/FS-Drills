/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs");
const path = require("path");

function getReadFile(callback) {
  fs.readFile("lipsum.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    callback(data);
  });
}

function createFile(content, callback) {
  let filePath = path.join(__dirname, `uppercase.txt`);
  let uppercaseContent = content.toUpperCase();
  fs.writeFile(filePath, uppercaseContent, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("uppercase.txt is created");
    callback("uppercase.txt");
  });
}

function toStoreFileName(filename) {
  let filePath = path.join(__dirname, "filenames.txt");
  fs.writeFile(filePath, filename + "\n", (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("file name is stored in filename.txt");
  });
}

function readUpperCase(callBack) {
  fs.readFile("uppercase.txt", "utf-8", (err, upperCaseFile) => {
    if (err) {
      console.log(err.message);
      return;
    }
    let lowercase = upperCaseFile.toLowerCase().split(".").join(".\n");
    callBack(lowercase);
  });
}

function createFileForLowerCase(lowercaseFile, callback) {
  let filePath = path.join(__dirname, `lowercase.txt`);
  fs.writeFile(filePath, lowercaseFile, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("lowercase.txt is created");
    callback("lowercase.txt");
  });
}
function StoreFileName(filename) {
  let filePath = path.join(__dirname, "filenames.txt");
  fs.appendFile(filePath, filename + "\n", (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("file name is stored in filename.txt");
  });
}

function readNewFile(callBack) {
  fs.readFile("lowercase.txt", "utf-8", (err, filename) => {
    if (err) {
      console.log(err.message);
      return;
    }
    let sortedContent = filename
      .trim()
      .split(/\s+/)
      .filter((word) => word.length)
      .sort()
      .join(" ");
    callBack(sortedContent);
  });
}

function createFileForSortedText(content, callback) {
  let filePath = path.join(__dirname, `sortedText.txt`);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("sortedText.txt is created");
    callback("sortedText.txt");
  });
}
function StoreFileName(filename) {
  let filePath = path.join(__dirname, "filenames.txt");
  fs.appendFile(filePath, filename + "\n", (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("file name is stored in filename.txt");
  });
}

function extractFileName(callback) {
  fs.readFile("filenames.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }

    let fileNameArray = data
      .trim()
      .split("\n")
      .map((name) => name.trim())
      .filter((fName) => fName.length > 0);
    callback(fileNameArray);
  });
}
function deleteFile(fileNameArray) {
  for (let i = 0; i < fileNameArray.length; i++) {
    let filename = fileNameArray[i];
    let filePath = path.join(__dirname, filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err.message);
        return;
      } else {
        console.log("File is deleted");
      }
    });
  }
}

// getReadFile((data) => {
//   createFile(data, toStoreFileName);
// });

// readUpperCase((data) => {
//   createFileForLowerCase(data, StoreFileName);
// });

// readNewFile((sortedData) => {
//   createFileForSortedText(sortedData, StoreFileName);
// });

extractFileName((data) => {
  deleteFile(data);
});
