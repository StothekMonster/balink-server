const fs = require('fs');

let users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

const lower = (user) => {
  const usercopy = JSON.parse(JSON.stringify(user));
  if (usercopy.first_name) {
    usercopy.first_name = usercopy.first_name.toLowerCase();
  }
  if (usercopy.last_name) {
    usercopy.last_name = usercopy.last_name.toLowerCase();
  }
  return usercopy;
};

exports.getAllUsers = (req, res) => {
  const newUsers = users.map((user) => lower(user));
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: users.length,
    data: { users: newUsers },
  });
};

exports.getUser = (req, res) => {
  const id = +req.params.id;
  const user = users.find((userObj) => userObj.id === id);

  res.status(200).json({ status: 'success', data: { user } });
};

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const user = users.find((userObj) => userObj.id === id);
  user.first_name = req.body[0].first_name;
  user.last_name = req.body[0].last_name;
  user.age = +req.body[0].age;
  user.phone = +req.body[0].phone;

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), () => {
    res.status(201).json({
      status: 'success',
      data: { user },
    });
  });
};

exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  users = users.filter((userObj) => userObj.id !== id);

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), () => {
    res.status(201).json({
      status: 'success',
      data: users,
    });
  });
};

exports.createUser = (req, res) => {
  const newId = users.length === 0 ? 0 : users[users.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newUser = { id: newId, ...req.body[0] };
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
