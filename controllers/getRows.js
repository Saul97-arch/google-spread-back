const { sheets, spreadsheetId, auth } = require("../services/spreadsheet");
const credentials = require("../credentials.json");
const { userInfo } = require("./helpers/userInfoDTO");

exports.getRows = async (req, res) => {
  try {
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: spreadsheetId,
      // range: "Página1!A:A", pegaria a primeira coluna apenas
      range: "Página1",
    });
    res.send(getRows.data.values);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
