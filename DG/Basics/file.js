//const fs = require('fs');
const path = require('path')
const fsPromises = require('fs').promises;

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf-8')
        console.log(data);

        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt')) //delete the file
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you')
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'),'utf-8')
        console.log(newData);
    }catch (err){
        console.error(err);
    }

    
}

fileOps()

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf-8', (err, data)=>{
//     if(err) throw err;
//     console.log(data);
//     console.log(data.toString());
// })

// console.log("Hello............");

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),"Nice to meet you", (err)=>{
//     if(err) throw err;
//     console.log("Write complete");
// })

// fs.appendFile(path.join(__dirname, 'files', 'test.txt'),"Testing Text", (err)=>{
//     if(err) throw err;
//     console.log("Append complete");
//     fs.rename(path.join(__dirname, 'files', 'test.txt'), path.join(__dirname, 'files', 'testRenamed.txt'), (err)=>{
//         if(err) throw err;
//         console.log("Rename complete");
//     })
// })

// fs.writeFile(path.join(__dirname,'files','nested.txt'),"This is an example for nested callback",err=>{
//     if (err) throw err;
//     console.log("Write process completed");
//     fs.appendFile(path.join(__dirname,'files','nested.txt'), "\t nested text added",err=>{
//         if (err) throw err;
//         console.log("Append process completed");
//         fs.rename(path.join(__dirname, 'files', 'nested.txt'), path.join(__dirname, 'files', 'renamedNested.txt'), err=>{
//             if (err) throw err;
//             console.log("Rename Process Completed");
//         })
//     })
// })

//exit on uncaught errors
process.on('uncaughtException',err=>{
    console.log(`There was an uncaught error : ${err}`);
    process.exit(1);
})

