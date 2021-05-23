const { sheets, spreadsheetId, auth } = require('../services/spreadsheet');

exports.getCell = async (req, res) => {
  const { startRowIndex, endRowIndex } = req.query;
  try {
    const request = {
      spreadsheetId,
      auth,
      dateTimeRenderOption: 'FORMATTED_STRING',

      resource: {
        valueRenderOption: 'FORMATTED_VALUE',
        dataFilters: [
          {
            gridRange: {
              startRowIndex,
              startColumnIndex: 5,
              endRowIndex,
            },
          },
        ],
      },
    };

    const reqToAPI = await sheets.spreadsheets.values.batchGetByDataFilter(
      request
    );
    const response = reqToAPI.data.valueRanges[0].valueRange.values[0][0];
    res.status(200).json({ res: response });
  } catch (err) {
    console.error(err);
    return res.status(400);
  }
};
