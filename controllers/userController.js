const fs = require('fs');

let users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: users.length,
    data: { users },
  });
};

exports.getUser = (req, res) => {
  const id = +req.params.id;
  const user = users.find((userObj) => userObj.id === id);

  res.status(200).json({ status: 'success', data: { user } });
};

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const firstName = req.params.first_name;
  const lastName = req.params.last_name;
  const age = +req.params.age;
  const phone = +req.params.phone;

  const user = users.find((userObj) => userObj.id === id);
  user.first_name = firstName;
  user.last_name = lastName;
  user.age = age;
  user.phone = phone;
  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), () => {
    res.status(201).json({
      status: 'success',
    });
  });
};

exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  users = users.filter((userObj) => userObj.id !== id);
  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), () => {
    res.status(201).json({
      status: 'success',
    });
  });
};

exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newUser = { id: newId, ...req.body };
  users.push(newUser);
  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), () => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  });
};
