function FormStepBar({ steps, current }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3 sm:gap-4">
      {steps.map((label, index) => {
        const isActive = index === current;
        const isCompleted = index < current;
        return (
          <div key={label} className="flex items-center gap-2">
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${isActive ? 'border-ocean-900 bg-ocean-900 text-white' : isCompleted ? 'border-seafoam bg-seafoam text-ocean-900' : 'border-slate-300 bg-white text-slate-500'}`}>
              {index + 1}
            </span>
            <span className={`text-sm ${isActive ? 'font-semibold text-slate-900' : 'text-slate-500'}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default FormStepBar;
