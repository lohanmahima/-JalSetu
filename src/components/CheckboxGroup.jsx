function CheckboxGroup({ label, options, selected, onChange, name }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-semibold text-slate-900">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="inline-flex items-center gap-3 rounded-3xl border border-slate-300 bg-white p-4 text-sm text-slate-700 transition hover:border-ocean-400">
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={selected.includes(option)}
              onChange={(event) => {
                const next = event.target.checked
                  ? [...selected, option]
                  : selected.filter((value) => value !== option);
                onChange(next);
              }}
              className="h-4 w-4 rounded border-slate-300 text-ocean-900 focus:ring-ocean-900"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default CheckboxGroup;
