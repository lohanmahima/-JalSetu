function Section({ id, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="max-w-2xl">
            {title && <h2 className="text-3xl font-semibold tracking-tight text-ocean-900 sm:text-4xl">{title}</h2>}
            {subtitle && <p className="mt-4 text-base leading-7 text-slate-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
