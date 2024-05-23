const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection('predictions ');
  return predictCollection.doc(id).set(data);
}

async function getAllData() {
  const db = new Firestore();
  try {
    const snapshot = await db.collection('predictions ').get(); // Get all documents in the collection
    const data = [];

    snapshot.forEach((doc) => {
      data.push(doc.data()); // Add each document's data to the array
    });

    return {
      "isSuccess": true,
      data
    };
  } catch (error) {
    return {
      "isSuccess": false,
      "data": error
    }
  }
}

module.exports = {storeData, getAllData};
