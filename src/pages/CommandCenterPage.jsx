import { useState } from 'react';
import Section from '../components/Section.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { commandKpis, mapMarkers, priorityQueue, resourceFlow, aiInsights, markerDetails } from '../data/commandCenterData.js';

function badgeClass(type) {
  return type === 'critical'
    ? 'bg-rose-100 text-rose-800'
    : type === 'high'
    ? 'bg-amber-100 text-amber-900'
    : type === 'resource'
    ? 'bg-emerald-100 text-emerald-900'
    : 'bg-slate-100 text-slate-700';
}

function CommandCenterPage() {
  const [activeMarker, setActiveMarker] = useState('m1');

  return (
    <div className="bg-calm px-6 py-16 sm:px-8 lg:px-10">
      <Section title="JalSetu Command Center" subtitle="One view for understanding needs, resources and response.">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <StatusBadge label="Prototype • Demo Data" tone="warning" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {commandKpis.map((kpi) => (
              <div key={kpi.label} className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{kpi.label}</p>
                <p className="mt-4 text-4xl font-semibold text-slate-900">{kpi.value}</p>
                <p className="mt-3 text-sm text-slate-600">Demo statistic for command visibility.</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Operational map</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Simplified response geography</h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                  <span className="inline-flex h-3 w-3 rounded-full bg-rose-500" /> Critical Need
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                  <span className="inline-flex h-3 w-3 rounded-full bg-amber-500" /> High Priority
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                  <span className="inline-flex h-3 w-3 rounded-full bg-lime-500" /> Available Resource
                </div>
              </div>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(111,155,212,0.12),_transparent_35%),linear-gradient(135deg,_rgba(236,248,255,0.95),_rgba(222,234,247,0.88))]" />
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-2 p-6">
                {Array.from({ length: 12 }).map((_, col) => (
                  <div key={`line-${col}`} className="col-span-1 border-r border-slate-200/70" />
                ))}
                {Array.from({ length: 5 }).map((_, row) => (
                  <div key={`line-row-${row}`} className="row-span-1 border-b border-slate-200/70" />
                ))}
              </div>
              {mapMarkers.map((marker) => (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => setActiveMarker(marker.id)}
                  className="absolute inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 shadow-soft transition hover:scale-105"
                  style={{ top: marker.position.top, left: marker.position.left, transform: 'translate(-50%, -50%)' }}
                >
                  <span className={`inline-flex h-3.5 w-3.5 rounded-full ${marker.type === 'critical' ? 'bg-rose-600' : marker.type === 'high' ? 'bg-amber-500' : 'bg-lime-500'}`} />
                  {marker.label}
                </button>
              ))}
              <div className="absolute bottom-6 right-6 w-72 rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Marker detail</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{markerDetails[activeMarker].title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{markerDetails[activeMarker].info}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Priority Queue</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Top demo requests</h2>
              </div>
            </div>
            <div className="space-y-4">
              {priorityQueue.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{item.title}</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{item.level}</p>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700">{item.location}</div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">People affected: {item.people}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Resource Flow</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Prototype operational stages</h2>
            </div>
            <div className="space-y-4">
              {resourceFlow.map((stage, index) => (
                <div key={stage} className="grid grid-cols-[1.3rem_1fr] items-center gap-4 text-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean-900 text-white">{index + 1}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{stage}</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-ocean-900" style={{ width: `${((index + 1) / resourceFlow.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">AI Relief Intelligence</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Demo insights for response coordination</h2>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight} className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-5">
                  <p className="text-sm text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-amber-100 bg-amber-50 p-5 text-sm text-amber-900">
              Production version would use verified live disaster, weather and resource data.
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Demo data notice</p>
              <p className="mt-3 text-sm text-slate-600">The JalSetu Command Center is built with prototype and demo data for showcasing the coordination experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommandCenterPage;
