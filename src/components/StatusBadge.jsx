import clsx from 'clsx';

const StatusBadge = ({ status }) => {
  const isFinished = status === 'Finished';
  const isLocked = status === 'Locked';
  const isOpen = status === 'Open';

  const badgeClass = clsx(
    "text-xs px-2 py-1 rounded-full font-medium border",
    isFinished && "bg-gray-800 text-gray-400 border-gray-600",
    isLocked && "bg-red-900/30 text-red-400 border-red-800/50",
    isOpen && "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/50"
  );

  return (
    <span className={badgeClass}>
      {status}
    </span>
  );
};

export default StatusBadge;
