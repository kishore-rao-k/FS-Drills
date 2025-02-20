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

module.exports = callBackHell;

function callBackHell() {
  createDirectory(() => {
    createFile(() => {
      setTimeout(() => {
        deleteFile();
      }, 10000);
    });
  });
}

function createDirectory(callBack) {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Directory is created");
    callBack();
  });
}
function createFile(callBack) {
  let count = 5;
  for (let i = 1; i <= count; i++) {
    let string = "please Enter the data here";
    let filePath = path.join(dirPath, `file-${i}.json`);
    fs.writeFile(filePath, JSON.stringify(string), (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("file is been created");
      if (i === count) {
        callBack();
      }
    });
  }
}

function deleteFile() {
  let count = 5;
  for (let i = 1; i <= count; i++) {
    let filePath = path.join(dirPath, `file-${i}.json`);
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

// console.log(__dirname);
// fs.mkdir(dirPath, { recursive: true }, (err) => {
//   //file-5.txt
//   if (err) {
//     console.log("Directory is not creted");
//   } else {
//     console.log("Directory is creted");
//     let count = 5;
//     for (let i = 1; i <= count; i++) {
//       let filePath = path.join(dirPath, `file-${i}.txt`);
//       // console.log(filePath);
//       fs.writeFile(filePath, "please enter data here", (err) => {
//         if (err) {
//           console.log("File is not created");
//         } else {
//           console.log("File is created");
//            fs.unlink(filePath,(err)=>{
//             if(err){
//                 console.log("file is not deleted")
//             }else{
//                 console.log("file is deleted");
//             }
//            });

//         }
//       });
//     }

//     fs.rmdir(dirPath, (err) => {
//       if (err) {
//         console.log("Directory is not deleted");
//       } else {
//         console.log("Directory is deleted");
//       }
//     });
//   }
// });
