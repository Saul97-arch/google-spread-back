const { sheets, spreadsheetId, auth } = require("../services/spreadsheet");
const credentials = require("../credentials.json");
const { userInfo } = require("./helpers/userInfoDTO");

exports.updateByParam = async (req, res) => {
  const { startColumnIndex, startRowIndex, cellVall } = req.query;
  try {
    const request = {
      auth,
      spreadsheetId: spreadsheetId,
      includeValuesInResponse: true,
      resource: {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            dataFilter: {
              gridRange: {
                startColumnIndex: startColumnIndex, // 4
                startRowIndex: startRowIndex, // 2
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
  } catch (err) {
    console.error(err);
  }
  res.send("RONALDO");
};
