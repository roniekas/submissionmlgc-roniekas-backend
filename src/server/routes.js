const {postPredictHandler} = require('../server/handler');
const {getAllHistories} = require("./handler");

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getAllHistories,
  }
]

module.exports = routes;