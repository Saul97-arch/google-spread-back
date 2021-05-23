const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { credentials } = require("../services/spreadsheet");

router.post("/", async (req, res) => {
  console.log("rota getCell");
  const { startRowIndex, endRowIndex } = req.query;
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of google Sheets API
  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fO850ZLI6L-1yKVlAaM783VC9usIKg673c4mBuECGWo";
  //const endRowIndex = startRowIndex + 1;
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

    const reqToAPI = 
      await sheets.spreadsheets.values.batchGetByDataFilter(request)
    ;

    const response = reqToAPI.data.valueRanges[0].valueRange.values[0][0];
    console.log("RESPONSE", response);
    res.send({res: response});
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
