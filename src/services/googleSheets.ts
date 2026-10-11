import { getAccessToken } from './auth';
import { RegistrationData } from '../types';

const SHEET_TITLE = 'Birthday Live Chat 2.0 - Registrations';
const SPREADSHEET_ID_KEY = 'wl_sheets_spreadsheet_id';

export interface SheetSyncResult {
  success: boolean;
  spreadsheetId?: string;
  spreadsheetUrl?: string;
  error?: string;
}

/**
 * Ensures a Google Sheet exists for attendee registrations, creating one with headers if needed.
 */
export async function getOrCreateRegistrationSheet(token: string): Promise<string> {
  const cachedId = localStorage.getItem(SPREADSHEET_ID_KEY);
  if (cachedId) {
    try {
      // Verify sheet is accessible
      const checkRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${cachedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (checkRes.ok) {
        return cachedId;
      }
    } catch {
      // Continue to search or create
    }
  }

  // Search Google Drive for existing sheet by name
  try {
    const driveQuery = encodeURIComponent(`name = '${SHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
    const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${driveQuery}&fields=files(id,name)`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        const foundId = searchData.files[0].id;
        localStorage.setItem(SPREADSHEET_ID_KEY, foundId);
        return foundId;
      }
    }
  } catch (err) {
    console.warn('Drive search fallback to creation', err);
  }

  // Create new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: 'Attendees',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create Google Sheet: ${errText}`);
  }

  const createData = await createRes.json();
  const spreadsheetId = createData.spreadsheetId;
  localStorage.setItem(SPREADSHEET_ID_KEY, spreadsheetId);

  // Add Header Row
  const headerRow = [
    'Registration Date & Time',
    'Pass ID',
    'Full Name',
    'Email Address',
    'Phone Number',
    'Referral Source',
    'Access Pass Code',
  ];

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Attendees!A1:G1:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [headerRow],
    }),
  });

  return spreadsheetId;
}

/**
 * Appends a new attendee registration as a row to Google Sheets.
 */
export async function appendRegistrationToGoogleSheet(
  data: RegistrationData,
  explicitToken?: string
): Promise<SheetSyncResult> {
  const token = explicitToken || (await getAccessToken());

  if (!token) {
    return {
      success: false,
      error: 'Google authentication required to sync with Google Sheets.',
    };
  }

  try {
    const spreadsheetId = await getOrCreateRegistrationSheet(token);

    // Format registration row
    const rowValues = [
      new Date(data.registeredAt || Date.now()).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      data.id,
      data.fullName,
      data.email,
      data.phone,
      data.referralSource || 'Direct Registration',
      data.accessPassCode,
    ];

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Attendees!A:G:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      }
    );

    if (!appendRes.ok) {
      const errText = await appendRes.text();
      throw new Error(`Failed to append row to Google Sheets: ${errText}`);
    }

    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
    return {
      success: true,
      spreadsheetId,
      spreadsheetUrl,
    };
  } catch (error: any) {
    console.error('Error syncing registration to Google Sheets:', error);
    return {
      success: false,
      error: error?.message || 'Failed to sync row to Google Sheets.',
    };
  }
}
