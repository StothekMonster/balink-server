const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid id' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name)
    return res.status(400).json({ status: 'fail', message: 'no name' });
  if (!req.body.price)
    return res.status(400).json({ status: 'fail', message: 'no price' });
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tourObj) => tourObj.id === id);

  res.status(200).json({ status: 'success', data: { tour } });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'tup',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
