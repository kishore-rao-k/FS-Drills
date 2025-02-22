const fs = require("fs");
const path = require("path");

const filePaths = {
  lipsumFilePath: path.join(__dirname, "lipsum.txt"),
  uppercaseFilePath: path.join(__dirname, "uppercase.txt"),
  lowercaseFilePath: path.join(__dirname, "lowercase.txt"),
  sortedTextFilePath: path.join(__dirname, "sortedText.txt"),
  filenamesPath: path.join(__dirname, "filename.txt"),
};

processFiles();

function processFiles() {
  readFileContent("lipsumFilePath")
    .then(function (fileContent) {
      console.log(fileContent);
      return writeFileContent("uppercaseFilePath", fileContent.toUpperCase());
    })
    .then(function (resultMessage) {
      console.log(resultMessage);
      return writeFileContent("filenamesPath", "uppercase.txt\n");
    })
    .then(function (resultMessage) {
      console.log(resultMessage);
      return readFileContent("uppercaseFilePath");
    })
    .then(function (uppercaseContent) {
      let lowercaseContent = uppercaseContent
        .toLowerCase()
        .split(".")
        .join(".\n");
      return writeFileContent("lowercaseFilePath", lowercaseContent);
    })
    .then(function (resultMessage) {
      console.log(resultMessage);
      return appendFileName("filenamesPath", "lowercase.txt");
    })
    .then(function (resultMessage) {
      console.log(resultMessage);
      return readFileContent("lowercaseFilePath");
    })
    .then(function (lowerCaseData) {
      let sortedWordsContent = lowerCaseData
        .trim()
        .split(/\s+/)
        .filter((word) => word.length)
        .sort()
        .join(" ");
      return writeFileContent("sortedTextFilePath", sortedWordsContent);
    })
    .then(function (resultMessage) {
      console.log(resultMessage);
      return appendFileName("filenamesPath", "sortedText.txt");
    })
    .then(function (resultMessage) {
      console.log(resultMessage);
      return readFileContent("filenamesPath");
    })
    .then(function (filenamesContent) {
      let fileNameArray = filenamesContent
        .trim()
        .split("\n")
        .map((name) => name.trim())
        .filter((fName) => fName.length > 0);

      return deleteFile(fileNameArray);
    })
    .then(function (resultMessage) {
      for (let file of resultMessage) {
        console.log(file);
      }
    })
    .catch(function (resultMessage) {
      console.log(resultMessage);
    });
}

function readFileContent(fileKey) {
  const filePath = filePaths[fileKey];
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(data);
    });
  });
}

function writeFileContent(fileKey, content) {
  const filePath = filePaths[fileKey];
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err.message);
        return;
      }

      resolve(`${fileKey} is created`);
    });
  });
}

function appendFileName(fileKey, content) {
  const filePath = filePaths[fileKey];
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, content + "\n", (err) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(`${fileKey} is updated`);
    });
  });
}

function deleteFile(fileNameArray) {
  let arrayFile = [];
  fileNameArray.map((fileName) => {
    let filePath = path.join(__dirname, fileName);
    let message = new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(`File ${fileName} is deleted`);
      });
    });
    arrayFile.push(message);
  });
  return Promise.all(arrayFile);
}
