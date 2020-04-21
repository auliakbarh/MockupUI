import Database from '../database/database';
const db = new Database();

export default async rows => {
  console.log('Masuk ke function show data')
  db.deleteTable()
  .then(result => {
    console.log("Result => ", result)
    console.log(result);
  }).catch((err) => {
    console.log(err);
  })
};
