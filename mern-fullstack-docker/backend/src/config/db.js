const mongoose = require('mongoose')
let mongodInstance = null

module.exports = async function connectDB(){
  let uri = process.env.MONGO_URI

  // fallback to in-memory mongod when no MONGO_URI is provided (useful cuando Docker no está disponible)
  if(!uri && process.env.NODE_ENV !== 'production'){
    const { MongoMemoryServer } = require('mongodb-memory-server')
    mongodInstance = await MongoMemoryServer.create()
    uri = mongodInstance.getUri()
    console.log('Using in-memory MongoDB for development')
  }

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Connected to MongoDB')
}

module.exports.close = async function closeDB(){
  await mongoose.disconnect()
  if(mongodInstance){
    try{ await mongodInstance.stop() }catch(e){ /* ignore */ }
    mongodInstance = null
  }
}
