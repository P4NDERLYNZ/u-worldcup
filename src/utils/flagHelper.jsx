/* eslint-disable react-refresh/only-export-components */
/**
 * Converts a flag emoji (regional indicator pairs) or 2-letter country code
 * into a FlagCDN URL to display actual flag images on Windows and other platforms.
 * 
 * @param {string} flagEmoji - The flag emoji (e.g., '🇦🇷') or ISO country code (e.g., 'ar')
 * @returns {string} The URL to the flag image
 */
export const getFlagUrl = (flagEmoji) => {
  if (!flagEmoji || typeof flagEmoji !== 'string') return '';

  const trimmed = flagEmoji.trim();

  // Try to convert emoji characters (regional indicators) to country code
  const codePoints = [...trimmed].map(c => c.codePointAt(0));
  if (
    codePoints.length >= 2 &&
    codePoints[0] >= 127462 && codePoints[0] <= 127487 &&
    codePoints[1] >= 127462 && codePoints[1] <= 127487
  ) {
    const char1 = String.fromCharCode(codePoints[0] - 127462 + 97); // 'a' is 97
    const char2 = String.fromCharCode(codePoints[1] - 127462 + 97);
    const countryCode = (char1 + char2).toLowerCase();
    return `https://flagcdn.com/w160/${countryCode}.png`;
  }

  // If it's already a 2-letter country code (e.g., 'AR', 'FR')
  if (trimmed.length === 2 && /^[a-zA-Z]{2}$/.test(trimmed)) {
    return `https://flagcdn.com/w160/${trimmed.toLowerCase()}.png`;
  }

  return '';
};

/**
 * React Component to display flag image with fallback to text/emoji if image fails to load.
 */
export const FlagImage = ({ flag, countryName, className = 'w-9 h-6' }) => {
  const url = getFlagUrl(flag);

  if (!url) {
    return <span className="text-xl">{flag}</span>;
  }

  return (
    <img
      src={url}
      alt={countryName || 'Flag'}
      className={`${className} object-cover rounded shadow-sm border border-white/10`}
      onError={(e) => {
        // Fallback if image fails to load (e.g., offline)
        e.target.style.display = 'none';
        const fallback = document.createElement('span');
        fallback.className = 'text-xl font-bold';
        fallback.innerText = flag;
        e.target.parentNode.appendChild(fallback);
      }}
    />
  );
};
