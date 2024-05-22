const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
    const isCancer = confidenceScore > 0.5;

    const label = isCancer ? 'Cancer' : 'Non-cancer';
    const suggestion = isCancer ? 'Segera periksa ke dokter!' : 'Rebahan dulu aja, gpp kok :)';

    return { isCancer, label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
