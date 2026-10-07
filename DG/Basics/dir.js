const fs = require('fs')
if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err)=>{
        if (err) throw err
        console.log('Directory created');
    })
}
else console.log("Already Created");

if(fs.existsSync('./new')){
    fs.rmdir('./new',(err)=>{
        if (err) throw err
        console.log('Directory deleted');
    })
}
else console.log("No Such Directory");
