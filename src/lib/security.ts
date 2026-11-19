// Exclusive Teacher Identity & Cryptographic PIN verification
// ONLY spacio.n.blnco@gmail.com is authorized as the Teacher/Admin of the platform.

export const MASTER_TEACHER_EMAIL = 'spacio.n.blnco@gmail.com';

// SHA-256 hash of "159487123456"
export const TEACHER_MASTER_PIN_HASH = '9bb5be3868beabcb8fe8da77fb2dcae0fb0d315ce920e54d6a5996fbe531818e';
export const DEFAULT_TEACHER_PIN = '159487123456';

export function isMasterTeacherEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === MASTER_TEACHER_EMAIL;
}

export async function hashPinSHA256(pin: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(pin.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyTeacherCredentials(emailInput: string, inputPin: string): Promise<boolean> {
  if (!isMasterTeacherEmail(emailInput)) {
    return false;
  }
  return verifyTeacherPin(inputPin);
}

export async function verifyTeacherPin(inputPin: string): Promise<boolean> {
  if (!inputPin) return false;
  const cleanPin = inputPin.trim();

  if (cleanPin === DEFAULT_TEACHER_PIN) {
    return true;
  }

  try {
    const computedHash = await hashPinSHA256(cleanPin);
    return computedHash === TEACHER_MASTER_PIN_HASH;
  } catch {
    return false;
  }
}
