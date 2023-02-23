/* Here is the explanation for the code above:
1. The first line is the most important line in the code. It imports the mongoose module that we need to have to connect to the MongoDB database. 
2. The second line imports the schema constructor from the mongoose module. */
const mongoose = require('mongoose');

/* Here is the explanation for the code above:
1. The mongooseOptions object has all the options that we will use to connect to the database.
2. The first option is useNewUrlParser. This option is used to parse the MongoDB connection string.
3. The second option is useCreateIndex. This option is used to create a MongoDB index.
4. The third option is useFindAndModify. This option is used to find a document and modify it.
5. The fourth option is useUnifiedTopology. This option is used to use the new Server Discover and Monitoring engine.
6. The fifth option is poolSize. This option is used to specify the number of connections in the connection pool.
7. The sixth option is keepAlive. This option is used to keep the connection alive.
8. The seventh option is keepAliveInitialDelay. This option is used to specify the number of milliseconds to wait before initiating keepAlive on the TCP socket.
9. The mongodbUri variable contains the MongoDB URI string.
10. The mongodbUri variable is set to the MONGODB_URI environment variable. */
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  poolSize: 100,
  keepAlive: true,
  keepAliveInitialDelay: 300000
};
const mongodbUri = process.env.MONGODB_URI;
  
/* Here is the explanation for the code above:
1. We’re using the mongoose.connect() method to connect to MongoDB. It takes two arguments: the first is the MongoDB URI string, and the second is the mongoose options object.
2. We’re importing the mongoose module and the mongodbUri and mongooseOptions variables from the config/database.js file.
3. We’re using the catch() method to handle any errors that might occur during the connection. This is a good practice because unhandled errors can cause your app to crash.
4. We’re disabling ESLint in this line because we’re using console.error() to display the error. There’s nothing wrong with this but ESLint doesn’t know that. */
module.exports = () => {
  // eslint-disable-next-line no-console
  mongoose.connect(mongodbUri, mongooseOptions).catch(console.error);
};
