const { sheets, spreadsheetId, auth } = require('../services/spreadsheet');

exports.insertData = async (req, res) => {
  const { name, email, password, dateSignIn } = req.body;
  try {
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Página1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[name, email, password, dateSignIn, '', 0]],
      },
    });
    return res.status(201).json({ inserted: 'ok' });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
