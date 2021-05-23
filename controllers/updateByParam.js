const { sheets, spreadsheetId, auth } = require('../services/spreadsheet');

exports.updateByParam = async (req, res) => {
  const { startColumnIndex, startRowIndex, cellVall } = req.query;
  try {
    const request = {
      auth,
      spreadsheetId,
      includeValuesInResponse: true,
      resource: {
        valueInputOption: 'USER_ENTERED',
        data: [
          {
            dataFilter: {
              gridRange: {
                startColumnIndex, // 4
                startRowIndex, // 2
                sheetId: 0,
              },
            },
            values: [[cellVall]],
          },
        ],
      },
    };
    const result = await sheets.spreadsheets.values.batchUpdateByDataFilter(
      request
    ).data;
    return res.status(201).json({ update: 'ok', result });
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
};
