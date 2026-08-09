function ToggleInput({ label, checked, onChange, hint }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border border-slate-300 bg-white p-4">
      <label className="flex items-center gap-3 text-sm font-medium text-slate-900">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-ocean-900 focus:ring-ocean-900"
        />
        {label}
      </label>
      {hint && <p className="text-sm text-slate-500">{hint}</p>}
    </div>
  );
}

export default ToggleInput;
