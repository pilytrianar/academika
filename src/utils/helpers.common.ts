// HELPERS

// Check if it is an error instance or not
export function isError(error: unknown) {
  return error instanceof Error;
}

// Convert a string to its case text (first and last letter capitalized)
export function parseCaseText(text: string): string {
  if (!text) return '';
  const words = text.trim().split(' ').filter(Boolean);
  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
}

// Format a date string to a relative time
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Ahora';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;

  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}

// Get background color based on image badge
export function getBgColor(imageBadge: string) {
  if (
    imageBadge === 'NEW_STUDENT' ||
    imageBadge === 'new_student' ||
    imageBadge === 'DISCIPLINARY'
  ) {
    return 'bg-[#DCFCE7]';
  }
  return 'bg-[#FFEDD5]';
}
