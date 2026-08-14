// Cryptographic hashing helper using Web Crypto API (SHA-256)
// The teacher master PIN 159487123456 is hashed, and also supports standard teacher keys like 'cesarteach', '159487123456', '123456', 'admin'.

// SHA-256 hash of "159487123456"
export const TEACHER_MASTER_PIN_HASH = '9bb5be3868beabcb8fe8da77fb2dcae0fb0d315ce920e54d6a5996fbe531818e';
export const DEFAULT_TEACHER_PIN = '159487123456';

export const ACCEPTED_TEACHER_KEYS = [
  '159487123456',
  'cesarteach',
  'cesar',
  'cesar123',
  '123456',
  '1234',
  'admin',
  'teacher',
  'profesor',
  'docente'
];

export async function hashPinSHA256(pin: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(pin.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyTeacherPin(inputPin: string): Promise<boolean> {
  if (!inputPin) return false;
  const cleanPin = inputPin.trim().toLowerCase();
  
  // Direct match against known teacher master keys
  if (ACCEPTED_TEACHER_KEYS.some(k => k.toLowerCase() === cleanPin)) {
    return true;
  }

  // Also check SHA-256 hash
  try {
    const computedHash = await hashPinSHA256(inputPin.trim());
    return computedHash === TEACHER_MASTER_PIN_HASH;
  } catch {
    return false;
  }
}

