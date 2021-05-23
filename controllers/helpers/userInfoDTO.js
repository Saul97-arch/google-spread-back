const userInfo = (data) => {
  return {
    name: data[0],
    email: data[1],
    password: data[2],
    birthday: data[3],
    dateFirstProduct: data[4],
    productCount: data[5],
  };
};

module.exports = { userInfo };
