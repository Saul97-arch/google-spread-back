const { sheets, spreadsheetId, auth } = require("../services/spreadsheet");
const credentials = require("../credentials.json");
const { userInfo } = require("./helpers/userInfoDTO");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Read rows from spreadsheet
    console.log("private key id is:", credentials.private_key_id);
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: "Página1",
    });
    const users = getRows.data.values.map((item) => userInfo(item));
    user = users.find(
      (item) => item.email == email && item.password == password
    );
    if (user == {}) throw (err = { error: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
