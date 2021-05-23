const { sheets, spreadsheetId, auth } = require('../services/spreadsheet');
const { userInfo } = require('./helpers/userInfoDTO');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: 'Página1',
    });
    const users = getRows.data.values.map((item) => userInfo(item));
    const user = users.find(
      (item) => item.email === email && item.password === password
    );
    if (user === {}) throw new Error('User not found');
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
