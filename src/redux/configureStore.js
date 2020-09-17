if (process.env.NODE_ENV === 'pruduction') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
