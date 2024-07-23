const mongoose = require('mongoose')

const MONGO_URI = 'mongodb+srv://alijavedofficial0007:chenithori@backenddb.d5pyjuz.mongodb.net/?retryWrites=true&w=majority';


const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if(connectionState === 1) {
    console.log('ALready Connected');
    return;
  }

  if(connectionState === 2) {
    console.log('Connecting');
    return;
  }

  try {
    mongoose.connect(MONGO_URI, {
        dbName: 'UrlShortner', 
        bufferCommands: true,
        useNewUrlParser: true,
    })
    console.log('connected')
  } catch (error) {
     console.log('Error', error);
  }
}

module.exports = connect