const { sheets, spreadsheetId, auth } = require("../services/spreadsheet");
const credentials = require("../credentials.json");
const { userInfo } = require("./helpers/userInfoDTO");

exports.getCell = async (req, res) => {
  const { startRowIndex, endRowIndex } = req.query;
  try {
    const request = {
      spreadsheetId: spreadsheetId,
      auth,
      dateTimeRenderOption: "FORMATTED_STRING",

      resource: {
        valueRenderOption: "FORMATTED_VALUE",
        dataFilters: [
          {
            gridRange: {
              startRowIndex: startRowIndex,
              startColumnIndex: 5,
              endRowIndex: endRowIndex,
            },
          },
        ],
      },
    };

    const reqToAPI = await sheets.spreadsheets.values.batchGetByDataFilter(
      request
    );
    const response = reqToAPI.data.valueRanges[0].valueRange.values[0][0];
    console.log("RESPONSE", response);
    res.send({ res: response });
  } catch (err) {
    console.error(err);
  }
};
