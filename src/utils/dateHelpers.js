export const isMatchLocked = (matchDate, matchTime) => {
  // Use local time for mock
  const matchDateTime = new Date(`${matchDate}T${matchTime}`);
  const now = new Date();
  return now >= matchDateTime;
};
