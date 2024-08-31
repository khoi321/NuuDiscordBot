import { google } from 'googleapis';
import fs from 'fs/promises'; 
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const credentialsPath = path.join(__dirname, '../config/credentials.json');


const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));


const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });


const spreadsheetId = 'your-google-sheet-id'; //replace your-google-sheet-id
const range = 'sheetname!A:B'; //replace sheet name with your sheet


export const getNsfwMode = async (serverId) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows) {
      const row = rows.find(row => row[0] === serverId);
      if (row) {
        return row[1] === 'true';
      }
    }
    return false;
  } catch (error) {
    console.error('Error getting nsfwMode from Google Sheets:', error);
    return false;
  }
};


export const setNsfwMode = async (serverId, mode) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === serverId);

    if (rowIndex > -1) {
      rows[rowIndex][1] = mode.toString();
    } else {
      rows.push([serverId, mode.toString()]);
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: rows,
      },
    });

    console.log('NSFW mode updated successfully:', {
      spreadsheetId,
      range,
      values: rows,
    });
  } catch (error) {
    console.error('Error updating nsfwMode in Google Sheets:', error);
  }
};

export const addServer = async (serverId) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === serverId);

    if (rowIndex === -1) {
      rows.push([serverId, 'false']);
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values: rows,
        },
      });

      console.log('Server added successfully:', {
        spreadsheetId,
        range,
        values: rows,
      });
    }
  } catch (error) {
    console.error('Error adding server to Google Sheets:', error);
  }
};
