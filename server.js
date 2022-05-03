const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(
    `App running on port ${port}, running on ${process.env.NODE_ENV}`
  );
});
