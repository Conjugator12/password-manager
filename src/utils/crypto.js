// Cryptography utilities for secure password management
export const cryptoUtils = {
  // Generate salt (in production, store this per user)
  generateSalt() {
    return crypto.getRandomValues(new Uint8Array(16));
  },

  // Derive encryption key from master password
  async deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"],
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );
  },

  // Encrypt text with AES-GCM
  async encrypt(text, key) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      enc.encode(text),
    );

    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
    };
  },

  // Decrypt text with AES-GCM
  async decrypt(encryptedData, key) {
    const dec = new TextDecoder();

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: new Uint8Array(encryptedData.iv),
      },
      key,
      new Uint8Array(encryptedData.data),
    );

    return dec.decode(decrypted);
  },

  // Generate strong password
  generatePassword(length = 16) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const randomValues = crypto.getRandomValues(new Uint8Array(length));

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars[randomValues[i] % chars.length];
    }

    return password;
  },

  // Check password strength
  checkStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2)
      return { level: "Weak", color: "#e74c3c", score: strength };
    if (strength <= 4)
      return { level: "Medium", color: "#f39c12", score: strength };
    return { level: "Strong", color: "#27ae60", score: strength };
  },
};
