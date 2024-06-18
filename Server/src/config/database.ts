const mongoose = require("mongoose");

const connectDatabaseMongo = () => {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      console.log(`DB is connected!`);
    })
    .catch((err: Error) => console.log(err));
};

module.exports = connectDatabaseMongo;
