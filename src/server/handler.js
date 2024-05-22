const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const {storeData, getAllData} = require('../services/storeData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const {label, suggestion, confidenceScore } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }

  await storeData(id,data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 0.5 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data
  });

  response.code(201);
  return response;
}

async function getAllHistories(request, h) {
  const {isSuccess, data} = await getAllData();
  let response;
  if(isSuccess){
    response = h.response({
      status: 'success',
      data
    });
  } else {
    response = h.response({
      status: 'failed',
      data: null
    })
  }

  response.code(201);
  return response;
}

module.exports = {postPredictHandler, getAllHistories};
