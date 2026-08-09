import StatusBadge from '../components/StatusBadge.jsx';
import Section from '../components/Section.jsx';
import { urgentNeeds, availableResources, matchResults, otherMatches, matchPipeline } from '../data/matchCenterData.js';

function MatchCenterPage() {
  return (
    <div className="bg-calm px-6 py-16 sm:px-8 lg:px-10">
      <Section title="AI Relief Match Center" subtitle="Connecting urgent needs with available resources.">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <StatusBadge label="Prototype AI • Demo Data" tone="warning" />
          </div>
        </div>
      </Section>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Urgent needs</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Immediate resource requests</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {urgentNeeds.map((need) => (
                <div key={need.need} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Need</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{need.need}</h3>
                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    <p>People: {need.people}</p>
                    <p>Required: {need.required}</p>
                    <p>Priority: {need.priority}</p>
                    <p>Location: {need.location}</p>
                    <p>Status: {need.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">AI match result</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Potential Match Found</h2>
            </div>
            {matchResults.map((match) => (
              <div key={match.title} className="rounded-[1.75rem] border border-ocean-100 bg-slate-50 p-8 shadow-sm">
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-600">Need</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{match.need}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Available</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{match.available}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Distance</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{match.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Priority</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{match.priority}</p>
                  </div>
                </div>
                <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Match score</p>
                      <p className="mt-2 text-4xl font-semibold text-ocean-900">{match.score}%</p>
                    </div>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-ocean-900 transition-all" style={{ width: `${match.score}%` }} />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 text-sm text-slate-700">
                    {match.factors.map((factor) => (
                      <p key={factor} className="flex items-center gap-2">
                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white">✓</span>
                        {factor}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Other matches</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Additional demo match scores</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherMatches.map((item) => (
                <div key={item.label} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{item.score}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Available resources</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Resources ready for match</h2>
            </div>
            <div className="space-y-4">
              {availableResources.map((resource) => (
                <div key={resource.resource} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Resource</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{resource.resource}</p>
                    </div>
                    <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700">{resource.availability}</div>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-slate-700">
                    <p>Available: {resource.available}</p>
                    <p>Provider: {resource.provider}</p>
                    <p>Location: {resource.distance}</p>
                    <p>Availability: {resource.availability}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Match pipeline</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">How this prototype routes matches</h2>
            </div>
            <div className="space-y-4 rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6">
              {matchPipeline.map((stage, index) => (
                <div key={stage} className="flex items-center gap-4 text-sm text-slate-700">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ocean-900 text-white">{index + 1}</div>
                  <p className="font-semibold text-slate-900">{stage}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Transparent AI explanation</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">How the prototype scores matches</h2>
            </div>
            <p className="text-slate-600">This is a transparent prototype scoring system. Production deployment would use trained models and verified real-time data.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Resource compatibility</p>
                <p className="mt-2 text-sm text-slate-700">Match resource types to the need.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Quantity availability</p>
                <p className="mt-2 text-sm text-slate-700">Measure whether available supplies meet the request.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Distance</p>
                <p className="mt-2 text-sm text-slate-700">Prefer nearby resources for faster response.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Emergency priority</p>
                <p className="mt-2 text-sm text-slate-700">Give higher weight to urgent needs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchCenterPage;
