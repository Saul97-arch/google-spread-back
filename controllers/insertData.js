const { sheets, spreadsheetId, auth } = require("../services/spreadsheet");
const credentials = require("../credentials.json");
const { userInfo } = require("./helpers/userInfoDTO");

exports.insertData = async (req, res) => {
  const { name, email, password, dateSignIn } = req.body;
  try {
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: spreadsheetId,
      range: "Página1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[name, email, password, dateSignIn, "", 0]],
      },
    });
  } catch (err) {
    console.log(err);
  }
};
