const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { credentials } = require("../services/spreadsheet");

router.post("/", async (req, res) => {
  console.log('rota update')
  const { val1, val2, cellVall } = req.query;
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of google Sheets API
  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fO850ZLI6L-1yKVlAaM783VC9usIKg673c4mBuECGWo";

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
                startColumnIndex: val1, // 4
                startRowIndex: val2, // 2
                sheetId: 0,
              },
            },
            values: [[cellVall]],
          },
        ],
      },
    };
    const result = await sheets.spreadsheets.values.batchUpdateByDataFilter(request).data;
  } catch (err) {
    console.error(err);
  }
  console.log(val1, val2);
  res.send("RONALDO");
});

module.exports = router;
