const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const client =  auth.getClient();

const sheets = google.sheets({ version: "v4", auth: client });
const spreadsheetId = "1fO850ZLI6L-1yKVlAaM783VC9usIKg673c4mBuECGWo";

module.exports = { sheets, spreadsheetId, client, auth }