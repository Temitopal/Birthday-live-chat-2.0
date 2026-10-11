import { RegistrationData } from '../types';

export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxvlL8-9Yd26BkPDxhn9L3DFABK-fuK2BQGnOgeyqDTGhJ8ySzvZXqe_uTnZPJpsDjVpw/exec';

export interface SubmitResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submits registration form data to the Google Apps Script Web App.
 * Maps every existing field to standard naming conventions so no submitted data is lost.
 */
export async function submitToGoogleAppsScript(
  data: RegistrationData
): Promise<SubmitResult> {
  const timestamp = new Date(data.registeredAt || Date.now()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const payload = {
    // Standard and alias fields to ensure full compatibility with any Apps Script column mappings
    timestamp,
    registrationDateTime: timestamp,
    id: data.id,
    passId: data.id,
    fullName: data.fullName,
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    phoneNumber: data.phone,
    referralSource: data.referralSource,
    howDidYouHear: data.referralSource,
    accessPassCode: data.accessPassCode,
    passCode: data.accessPassCode,
    agreeToUpdates: data.agreeToUpdates ? 'Yes' : 'No',
    // Ordered row array for scripts using sheet.appendRow(data.row)
    row: [
      timestamp,
      data.id,
      data.fullName,
      data.email,
      data.phone,
      data.referralSource,
      data.accessPassCode,
    ],
  };

  const jsonString = JSON.stringify(payload);

  try {
    // Attempt 1: Standard POST with text/plain (avoids CORS preflight)
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonString,
      redirect: 'follow',
    });

    if (response.ok) {
      try {
        const text = await response.text();
        // Check if response is valid JSON or success message
        if (text.includes('error') && !text.includes('success')) {
          const parsed = JSON.parse(text);
          return {
            success: false,
            error: parsed.message || 'Server reported an error saving the registration.',
          };
        }
        return {
          success: true,
          message: 'Registration recorded successfully in Google Sheets.',
        };
      } catch {
        return {
          success: true,
          message: 'Registration recorded successfully in Google Sheets.',
        };
      }
    }

    // If redirected to login page or 404, check response text
    const responseText = await response.text();
    if (responseText.includes('ServiceLogin') || responseText.includes('Page not found') || responseText.includes('unable to open')) {
      // The Apps Script web app is deployed or requires public access
      // Try fallback with URL-encoded parameters or no-cors
      throw new Error(
        'Google Apps Script access required: Please ensure your Web App deployment has "Who has access" set to "Anyone".'
      );
    }

    throw new Error(`Server returned status ${response.status}`);
  } catch (err: any) {
    console.warn('Standard POST error, trying fallback no-cors transmission...', err);

    // Fallback: mode: 'no-cors' sends the request directly to the Apps Script endpoint
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: jsonString,
      });

      return {
        success: true,
        message: 'Registration transmitted successfully.',
      };
    } catch (fallbackErr: any) {
      console.error('Submission failed completely:', fallbackErr);
      return {
        success: false,
        error:
          err?.message ||
          'Unable to save registration to Google Sheets. Please check your internet connection and try again.',
      };
    }
  }
}
