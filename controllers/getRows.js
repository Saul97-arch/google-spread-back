const { sheets, spreadsheetId, auth } = require('../services/spreadsheet');

exports.getRows = async (req, res) => {
  try {
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      // range: "Página1!A:A", pegaria a primeira coluna apenas
      range: 'Página1',
    });
    res.status(200).send(getRows.data.values);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
