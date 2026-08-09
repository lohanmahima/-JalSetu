import Section from '../components/Section.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

function ResourcesPage() {
  return (
    <div className="bg-calm px-6 py-16 sm:px-8 lg:px-10">
      <Section title="Resources" subtitle="Find sample guidance and coordination tools for emergency response.">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-soft">
          <div className="flex flex-col gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <StatusBadge label="Demo resource" tone="neutral" />
                <p className="text-sm text-slate-600">Information created for product demonstration only.</p>
              </div>
              <p className="text-slate-700">
                These resources represent the coordination tools and summaries that JalSetu will connect to verified relief efforts.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">Prepared relief checklist</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">A sample checklist for volunteer and responder readiness.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">Community communications guide</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">Guidance for keeping families and local teams aligned during a response.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default ResourcesPage;
