import Database from '../database/database';
const db = new Database();

export default async rows => {
  console.log('Masuk ke function insert data')
  const listData = await fetch(
    `https://test-buma.herokuapp.com/generate/${rows}`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.status === 200) {
        return data.data;
      } else {
        return [];
      }
    })
    .catch(e => {
      return [];
    });
    
  db.batchAdd(listData)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};
