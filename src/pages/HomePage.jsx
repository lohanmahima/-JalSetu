import Button from '../components/Button.jsx';
import Section from '../components/Section.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { liveCards, processSteps, aiCapabilities, helpOptions, emergencyResources } from '../data/homeData.js';

function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-72 bg-water-wave opacity-40" />
      <section className="relative overflow-hidden bg-gradient-to-b from-ocean-900 via-[#0f2d58] to-[#0f335f] px-6 pb-20 pt-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-soft backdrop-blur-xl sm:p-12">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <StatusBadge label="Prototype • Demo data only" tone="warning" />
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  When the water rises, help should move faster.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
                  An AI-powered disaster response network connecting people who need help with people and organizations ready to provide it.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button to="/get-help" className="min-w-[11rem]" variant="primary">
                    I NEED HELP
                  </Button>
                  <Button to="/volunteer" className="min-w-[11rem]" variant="secondary">
                    I WANT TO HELP
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:w-[38rem]">
                {liveCards.map((card) => (
                  <div key={card.label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/10 p-6 backdrop-blur-sm">
                    <p className="text-sm uppercase tracking-[0.22em] text-slate-300">{card.label}</p>
                    <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{card.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="situation"
        title="Live situation preview"
        subtitle="A calm coordination view built for trusted response."
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Demo map overview</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">Coordinated response zones</h3>
              </div>
              <StatusBadge label="Demo data" tone="neutral" />
            </div>
            <p className="mt-5 text-slate-600">
              Sample relief zones and verified reports are shown for demonstration purposes only. This page does not display live emergency data.
            </p>
            <div className="mt-7 rounded-[1.5rem] bg-slate-100 p-6">
              <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-ocean-200 via-calm to-slate-100" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Verified fields</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">Highest priority: flood-impacted households</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">48 verified requests</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">Volunteer staging near evacuation routes</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">18 ready teams</p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Resource summary</p>
              <ul className="mt-6 space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-seafoam" />
                  <span>Water supply coordination for 1,200 people.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span>Local transport support mapped to urgent rescues.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-400" />
                  <span>Verification checkpoints active for incoming requests.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="how-it-works"
        title="How JalSetu works"
        subtitle="A coordination flow designed around verified need, matched resources, and tracked relief."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {processSteps.map((step) => (
            <div key={step.title} className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean-700">{step.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="ai-intelligence"
        title="AI relief intelligence"
        subtitle="Support teams with insights that make response faster and safer."
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {aiCapabilities.map((capability) => (
            <div key={capability.title} className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{capability.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{capability.summary}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="matching"
        title="Help ↔ Resource matching"
        subtitle="Connect verified needs with people, supplies, and local relief teams in a single coordination layer."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Matching process</p>
            <h3 className="mt-4 text-3xl font-semibold text-slate-900">Resource flows become visible and actionable.</h3>
            <p className="mt-5 text-slate-600">
              JalSetu keeps both sides of the response loop aligned so that urgent requests do not wait in the dark.
            </p>
            <div className="mt-8 space-y-4 rounded-3xl bg-slate-50 p-6">
              <div className="flex items-start gap-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-ocean-900" />
                <p className="text-sm text-slate-700">Requests are reviewed, validated and tagged by response coordinators.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-seafoam" />
                <p className="text-sm text-slate-700">Available resources are mapped to needs with context and timing.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
                <p className="text-sm text-slate-700">Responders receive clear dispatch information and follow-up steps.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-100 to-calm p-8 shadow-soft">
            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Demo match card</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Request:</p>
                  <p className="mt-1 text-slate-600">Family of 5 needs water, blankets, and transport.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Match:</p>
                  <p className="mt-1 text-slate-600">Volunteer convoy + relief supplies assigned from nearby staging area.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="tracking"
        title="Transparent relief tracking"
        subtitle="Keep communities, responders, and coordinators informed through every step."
      >
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Tracking flow</p>
              <h3 className="mt-4 text-3xl font-semibold text-slate-900">A single source of truth for relief status.</h3>
              <p className="mt-5 text-slate-600">
                Status updates are visible to response teams and requesters, making it easier to confirm delivery and close the loop.
              </p>
            </div>
            <div className="space-y-4 rounded-[1.75rem] bg-slate-50 p-6">
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-900">Request received</p>
                <p className="mt-2 text-sm text-slate-600">Submitted and verified by on-ground staff.</p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-900">Response assigned</p>
                <p className="mt-2 text-sm text-slate-600">Volunteer team and supplies matched to the need.</p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-900">Delivery confirmed</p>
                <p className="mt-2 text-sm text-slate-600">Final verification closes the request with a status update.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="ways-to-help"
        title="Ways to help"
        subtitle="Choose how you contribute, whether it is support, time, or coordination."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {helpOptions.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
              <Button to={item.action} variant="secondary" size="sm" className="mt-6">
                Explore
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="emergency-resources"
        title="Emergency resources"
        subtitle="Sample resources for planning and coordination during floods and disasters."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {emergencyResources.map((item) => (
            <div key={item.name} className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-ocean-900">{item.name}</p>
              <p className="mt-3 text-sm text-slate-600">{item.type}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-gradient-to-r from-ocean-900 via-[#123763] to-[#1c4a78] px-6 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-[2rem] border border-white/10 bg-white/10 p-10 shadow-soft sm:flex-row">
          <div>
            <p className="text-lg font-semibold uppercase tracking-[0.24em] text-seafoam">Ready to bridge the gap</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Build more resilient relief coordination with JalSetu.
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/get-help" variant="primary">I NEED HELP</Button>
            <Button to="/volunteer" variant="secondary">I WANT TO HELP</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
