const { google } = require("googleapis");
const sheets = google.sheets("v4");

async function main() {
  const authClient = await authorize();
  const request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: "my-spreadsheet-id", // TODO: Update placeholder value.

    resource: {
      // How the input data should be interpreted.
      valueInputOption: "USER_ENTERED", // TODO: Update placeholder value.

      // The new values to apply to the spreadsheet.  If more than one range is
      // matched by the specified DataFilter the specified values are applied to
      // all of those ranges.
      data: [
        {
          dataFilter: {
            a1Range: "Página1!E2:E2",
          },
          majorDimension: "DIMENSION_UNSPECIFIED",
          values: [[42]],
        },
      ], 
      include
    },

    auth: authClient,
  };

  try {
    const response = (
      await sheets.spreadsheets.values.batchUpdateByDataFilter(request)
    ).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}
