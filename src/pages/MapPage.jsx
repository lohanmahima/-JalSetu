import Section from '../components/Section.jsx';

function MapPage() {
  return (
    <div className="bg-calm px-6 py-16 sm:px-8 lg:px-10">
      <Section title="Live map" subtitle="A demo map page for relief coordination planning.">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-soft">
          <div className="aspect-[16/9] w-full rounded-[1.75rem] bg-gradient-to-br from-ocean-200 via-calm to-slate-100" />
          <p className="mt-6 text-slate-600">
            This page is a placeholder for the coordinated situation map. No live location data is shown.
          </p>
        </div>
      </Section>
    </div>
  );
}

export default MapPage;
