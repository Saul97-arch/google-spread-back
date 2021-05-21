const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { credentials } = require('../services/spreadsheet');

router.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of google Sheets API
  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fO850ZLI6L-1yKVlAaM783VC9usIKg673c4mBuECGWo";
  // Get metadata about spreadsheet
  const metaData = await sheets.spreadsheets.get({
    auth,
    spreadsheetId: spreadsheetId,
  });

  try {
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: spreadsheetId,
      // range: "Página1!A:A", pegaria a primeira coluna apenas
      range: "Página1",
    });
    console.log(getRows.data.values);
    res.send(getRows.data.values);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
