const { MongoClient } = require('mongodb')

let dbConnection
const connectToDb = async (cb)=>{
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017/bookstore')
        dbConnection = client.db() 
        return cb(null)
    } catch(err){
        console.log(err);
        return cb(err)
    }
}

const getDb = () => dbConnection

module.exports = {
    connectToDb,
    getDb
}