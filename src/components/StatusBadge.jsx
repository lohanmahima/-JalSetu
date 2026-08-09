function StatusBadge({ label, tone = 'neutral' }) {
  const toneClasses = {
    neutral: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-900',
    critical: 'bg-rose-100 text-rose-900',
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${toneClasses[tone]}`}>{label}</span>;
}

export default StatusBadge;
