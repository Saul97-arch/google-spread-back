const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

/* router.get("/", (req, res) => {
  res.send("FELIPE VEIO DO BACK END CARALHO!");
});
 */
router.post("/", async (req, res) => {
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

  // Read rows from spreadsheet
  const getRows = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: spreadsheetId,
    // range: "Página1!A:A", pegaria a primeira coluna apenas
    range: "Página1",
  });

  // Write row(s) to spreadsheet
  // Nesse formato Paê, faz uma função pra passar esses valores dinâmicamente
  console.log("OLHA O BODY!");
  console.log(req.body);

  try {
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: spreadsheetId,
      range: "Página1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[name, email, password, dateSignIn, "", 0]],
      },
    });
  } catch (err) {
    console.log(err);
  }

  // res.send(getRows.data);

  res.send("Enviou com sucesso!");
  console.log(req.body);
});

module.exports = router;
