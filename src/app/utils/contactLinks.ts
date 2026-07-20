export const GENERAL_WHATSAPP_MESSAGE =
  "Halo, saya ingin menghubungi pengurus Padukuhan Kragilan.";

export const AGENDA_WHATSAPP_MESSAGE =
  "Halo, saya ingin menanyakan informasi mengenai agenda Padukuhan Kragilan.";

export function normalizeWhatsAppNumber(phone: string): string {
  const digits = phone.trim().replace(/\D/g, "");
  if (!digits) return "";

  const normalized = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits.startsWith("8")
      ? `62${digits}`
      : digits;

  return /^62\d{8,13}$/.test(normalized) ? normalized : "";
}

export function createWhatsAppUrl(phone: string, message = ""): string {
  const number = normalizeWhatsAppNumber(phone);
  if (!number) return "";

  const baseUrl = `https://wa.me/${number}`;
  return message.trim() ? `${baseUrl}?text=${encodeURIComponent(message.trim())}` : baseUrl;
}

export function createMailtoUrl(email: string): string {
  const normalized = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? `mailto:${normalized}` : "";
}
