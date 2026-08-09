function TextInput({ label, id, value, onChange, type = 'text', placeholder, required = false, hint }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-900">
        {label}
        {required && <span className="ml-1 text-amber-600">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100"
      />
      {hint && <p className="text-sm text-slate-500">{hint}</p>}
    </div>
  );
}

export default TextInput;
