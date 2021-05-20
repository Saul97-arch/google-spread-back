const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

router.post("/", async (req, res) => {
  // Lógica de procurar e achar no banco de dados(spreadsheet)
  // Mandar se funcionou ou não
  const { name, email, password, dateSignIn } = await req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
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

    for (let i = 1; i < getRows.data.values.length; i++) {
      if (
        getRows.data.values[i][1] === email &&
        getRows.data.values[i][2] === password
      ) {
        res.send({ data: getRows.data.values[i] });
        break;
      } 
    }

    // res.send("Nothing has been found!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
