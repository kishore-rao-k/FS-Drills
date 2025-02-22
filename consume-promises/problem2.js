const fs = require("fs/promises");
const path = require("path");

const filePaths = {
  lipsumFilePath: path.join(__dirname, "lipsum.txt"),
  uppercaseFilePath: path.join(__dirname, "uppercase.txt"),
  lowercaseFilePath: path.join(__dirname, "lowercase.txt"),
  sortedTextFilePath: path.join(__dirname, "sortedText.txt"),
  filenamesPath: path.join(__dirname, "filename.txt"),
};

promis();

function promis() {
  readFileContent("lipsumFilePath")
    .then(function (data) {
      console.log(data);
      return writeFileContent("uppercaseFilePath", data.toUpperCase());
    })
    .then(function () {
      return writeFileContent("filenamesPath", "uppercase.txt\n");
    })
    .then(function () {
      return readFileContent("uppercaseFilePath");
    })
    .then(function (upperCaseData) {
      let lowerCaseContent = upperCaseData.toLowerCase().split(".").join(".\n");
      return writeFileContent("lowercaseFilePath", lowerCaseContent);
    })
    .then(function () {
      return appendFileName("filenamesPath", "lowercase.txt");
    })
    .then(function () {
      return readFileContent("lowercaseFilePath");
    })
    .then(function (lowerCaseData) {
      let sortedContent = lowerCaseData
        .trim()
        .split(/\s+/)
        .filter((word) => word.length)
        .sort()
        .join(" ");
      return writeFileContent("sortedTextFilePath", sortedContent);
    })
    .then(function () {
      return appendFileName("filenamesPath", "sortedText.txt");
    })
    .then(function () {
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

    .catch(handleError);
}

function readFileContent(fileKey) {
  const filePath = filePaths[fileKey];
  return fs.readFile(filePath, "utf-8").catch(handleError);
}

function writeFileContent(fileKey, content) {
  const filePath = filePaths[fileKey];
  return fs
    .writeFile(filePath, content)
    .then(() => console.log(`${fileKey} is created`))
    .catch(handleError);
}

function appendFileName(fileKey, content) {
  const filePath = filePaths[fileKey];
  return fs
    .appendFile(filePath, content + "\n")
    .then(() => console.log(`${fileKey} is updated`))
    .catch(handleError);
}

function deleteFile(fileNameArray) {
  return Promise.all(
    fileNameArray.map((fileName) => {
      let filePath = path.join(__dirname, fileName);
      return fs
        .unlink(filePath)
        .then(() => {
          console.log(`File ${fileName} is deleted`);
        })
        .catch(handleError);
    })
  );
}

function handleError(err) {
  console.log(err.message);
  throw err;
}
