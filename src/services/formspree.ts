import { RegistrationData } from '../types';
import { FORMSPREE_ENDPOINT } from '../config';

export interface FormspreeSubmitResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submits attendee registration to the Formspree endpoint.
 *
 * Ensures all fields are clearly named and mapped so they are neatly captured
 * in the Formspree dashboard, exported CSVs, and notification emails.
 */
export async function submitRegistrationToFormspree(
  data: RegistrationData
): Promise<FormspreeSubmitResult> {
  const timestamp = new Date(data.registeredAt || Date.now()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const payload = {
    // Standard Formspree recipient fields
    name: data.fullName,
    fullName: data.fullName,
    email: data.email,
    _replyto: data.email,
    phone: data.phone,
    referralSource: data.referralSource,
    agreeToUpdates: data.agreeToUpdates ? 'Yes' : 'No',
    passId: data.id,
    accessPassCode: data.accessPassCode,
    registeredAt: timestamp,
    // Custom notification subject for Formspree email alerts
    _subject: `New Registration: Birthday Live Chat 2.0 - ${data.fullName}`,
  };

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Registration recorded successfully in Formspree.',
      };
    }

    // Attempt to extract helpful error messages from Formspree's response
    try {
      const responseData = await response.json();
      if (responseData?.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
        const errorMessages = responseData.errors
          .map((err: any) => err.message || err.field)
          .filter(Boolean)
          .join(', ');
        return {
          success: false,
          error: errorMessages || 'Formspree could not accept this submission. Please verify your details.',
        };
      }
      if (responseData?.error) {
        return {
          success: false,
          error: responseData.error,
        };
      }
    } catch {
      // Non-JSON response body
    }

    return {
      success: false,
      error: `Formspree submission failed (HTTP ${response.status}). Please check your connection and retry.`,
    };
  } catch (err: any) {
    console.error('Formspree network error:', err);
    return {
      success: false,
      error:
        err?.message ||
        'Unable to connect to the registration service. Please check your internet connection and try again.',
    };
  }
}
