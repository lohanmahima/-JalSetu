import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import Section from '../components/Section.jsx';
import CheckboxGroup from '../components/CheckboxGroup.jsx';
import SelectInput from '../components/SelectInput.jsx';
import TextInput from '../components/TextInput.jsx';
import ToggleInput from '../components/ToggleInput.jsx';
import FormStepBar from '../components/FormStepBar.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { helperTypeOptions, helperAvailabilityOptions, helperUnitOptions } from '../data/helperFormData.js';
import { demoMatches } from '../data/helperMatches.js';

const stepLabels = ['Help type', 'Location', 'Details', 'Review', 'Dashboard'];

const initialForm = {
  helpTypes: [],
  location: '',
  locationSource: 'manual',
  availability: '',
  resourceQuantity: '',
  resourceUnit: '',
  resourceDetails: '',
  volunteerSkills: '',
  volunteerHours: '',
  volunteerPreferences: '',
  vehicleType: '',
  vehicleCapacity: '',
  vehicleAvailability: '',
};

function generateHelperId() {
  return `HELP-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function VolunteerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [geoStatus, setGeoStatus] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const geoAvailable = useMemo(() => typeof navigator !== 'undefined' && 'geolocation' in navigator, []);

  useEffect(() => {
    const unsaved = isDirty && !submitted;
    function handleUnload(event) {
      if (!unsaved) return;
      event.preventDefault();
      event.returnValue = '';
    }
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [isDirty, submitted]);

  const updateForm = (next) => {
    setForm((current) => ({ ...current, ...next }));
    setIsDirty(true);
  };

  const validateStep = () => {
    const nextErrors = {};
    if (currentStep === 0) {
      if (form.helpTypes.length === 0) nextErrors.helpTypes = 'Select at least one way you can help.';
    }
    if (currentStep === 1) {
      if (!form.location.trim()) nextErrors.location = 'Enter your location or use browser location.';
      if (!form.availability) nextErrors.availability = 'Select when you are available.';
    }
    if (currentStep === 2) {
      const hasResource = form.helpTypes.some((type) => type !== 'Volunteer Time');
      const hasVolunteer = form.helpTypes.includes('Volunteer Time');
      const hasTransport = form.helpTypes.includes('Rescue/Transport');

      if (hasResource) {
        if (!form.resourceQuantity) nextErrors.resourceQuantity = 'Enter quantity for the resources you can provide.';
        if (!form.resourceUnit) nextErrors.resourceUnit = 'Select a unit for the resources.';
        if (!form.resourceDetails) nextErrors.resourceDetails = 'Describe the resource availability.';
      }
      if (hasVolunteer) {
        if (!form.volunteerSkills.trim()) nextErrors.volunteerSkills = 'Share your skills.';
        if (!form.volunteerHours.trim()) nextErrors.volunteerHours = 'Enter your available hours.';
        if (!form.volunteerPreferences.trim()) nextErrors.volunteerPreferences = 'Enter your preferred work.';
      }
      if (hasTransport) {
        if (!form.vehicleType.trim()) nextErrors.vehicleType = 'Enter the type of vehicle.';
        if (!form.vehicleCapacity.trim()) nextErrors.vehicleCapacity = 'Enter the vehicle capacity.';
        if (!form.vehicleAvailability.trim()) nextErrors.vehicleAvailability = 'Share the availability.';
      }
      if (!form.helpTypes.length) nextErrors.helpTypes = 'Select at least one way you can help.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep((step) => Math.min(step + 1, stepLabels.length - 1));
  };

  const handleBack = () => setCurrentStep((step) => Math.max(step - 1, 0));

  const handleUseLocation = () => {
    if (!geoAvailable) {
      setGeoStatus('Geolocation is not available in this browser.');
      return;
    }
    setGeoStatus('Requesting location...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateForm({
          locationSource: 'geolocation',
          location: `Lat ${position.coords.latitude.toFixed(4)}, Lon ${position.coords.longitude.toFixed(4)}`,
        });
        setGeoStatus('Location captured from browser.');
      },
      () => {
        setGeoStatus('Unable to access location. Please enter manually.');
      },
      { timeout: 10000, maximumAge: 300000 },
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateStep()) return;
    const helperDetails = {
      id: generateHelperId(),
      status: 'REGISTERED',
      submittedAt: new Date().toISOString(),
      details: form,
    };
    setSubmitted(helperDetails);
    setCurrentStep(stepLabels.length - 1);
    setIsDirty(false);
  };

  const selectedResources = form.helpTypes.filter((type) => type !== 'Volunteer Time');

  const renderDetailsSection = () => {
    const isVolunteer = form.helpTypes.includes('Volunteer Time');
    const isTransport = form.helpTypes.includes('Rescue/Transport');
    const hasResource = selectedResources.length > 0;

    return (
      <div className="space-y-6">
        <p className="text-slate-600">Tell us what you can provide and when.</p>
        {hasResource && (
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Resource details</p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <TextInput
                label="Quantity"
                id="resourceQuantity"
                value={form.resourceQuantity}
                onChange={(value) => updateForm({ resourceQuantity: value.replace(/[^0-9]/g, '') })}
                placeholder="e.g. 50"
                required
              />
              <SelectInput
                label="Unit"
                id="resourceUnit"
                value={form.resourceUnit}
                onChange={(value) => updateForm({ resourceUnit: value })}
                options={helperUnitOptions}
                required
              />
              <TextInput
                label="Availability"
                id="resourceDetails"
                value={form.resourceDetails}
                onChange={(value) => updateForm({ resourceDetails: value })}
                placeholder="e.g. 60 kits available by noon"
                required
              />
            </div>
            {errors.resourceQuantity && <p className="mt-2 text-sm text-rose-600">{errors.resourceQuantity}</p>}
            {errors.resourceUnit && <p className="mt-2 text-sm text-rose-600">{errors.resourceUnit}</p>}
            {errors.resourceDetails && <p className="mt-2 text-sm text-rose-600">{errors.resourceDetails}</p>}
          </div>
        )}
        {isVolunteer && (
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Volunteer details</p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <TextInput
                label="Skills"
                id="volunteerSkills"
                value={form.volunteerSkills}
                onChange={(value) => updateForm({ volunteerSkills: value })}
                placeholder="e.g. first aid, logistics"
                required
              />
              <TextInput
                label="Available hours"
                id="volunteerHours"
                value={form.volunteerHours}
                onChange={(value) => updateForm({ volunteerHours: value })}
                placeholder="e.g. 4 hours/day"
                required
              />
              <TextInput
                label="Preferred work"
                id="volunteerPreferences"
                value={form.volunteerPreferences}
                onChange={(value) => updateForm({ volunteerPreferences: value })}
                placeholder="e.g. distribution, coordination"
                required
              />
            </div>
            {errors.volunteerSkills && <p className="mt-2 text-sm text-rose-600">{errors.volunteerSkills}</p>}
            {errors.volunteerHours && <p className="mt-2 text-sm text-rose-600">{errors.volunteerHours}</p>}
            {errors.volunteerPreferences && <p className="mt-2 text-sm text-rose-600">{errors.volunteerPreferences}</p>}
          </div>
        )}
        {isTransport && (
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Transport details</p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <TextInput
                label="Vehicle type"
                id="vehicleType"
                value={form.vehicleType}
                onChange={(value) => updateForm({ vehicleType: value })}
                placeholder="e.g. pickup truck"
                required
              />
              <TextInput
                label="Capacity"
                id="vehicleCapacity"
                value={form.vehicleCapacity}
                onChange={(value) => updateForm({ vehicleCapacity: value })}
                placeholder="e.g. 8 people or 500 kg"
                required
              />
              <TextInput
                label="Availability"
                id="vehicleAvailability"
                value={form.vehicleAvailability}
                onChange={(value) => updateForm({ vehicleAvailability: value })}
                placeholder="e.g. immediate"
                required
              />
            </div>
            {errors.vehicleType && <p className="mt-2 text-sm text-rose-600">{errors.vehicleType}</p>}
            {errors.vehicleCapacity && <p className="mt-2 text-sm text-rose-600">{errors.vehicleCapacity}</p>}
            {errors.vehicleAvailability && <p className="mt-2 text-sm text-rose-600">{errors.vehicleAvailability}</p>}
          </div>
        )}
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5 text-sm text-slate-600">
          Use the details above to help match your available resources, skills, or transport with community needs.
        </div>
      </div>
    );
  };

  const renderReview = () => (
    <div className="space-y-6">
      <p className="text-slate-600">Review your contribution before registration.</p>
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
          <p className="text-sm font-semibold text-slate-900">Helper ID</p>
          <p className="text-slate-700">Generated after submission</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]">
          <p className="text-sm font-semibold text-slate-900">Help types</p>
          <p className="text-slate-700">{form.helpTypes.join(', ')}</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]">
          <p className="text-sm font-semibold text-slate-900">Location</p>
          <p className="text-slate-700">{form.location}</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]">
          <p className="text-sm font-semibold text-slate-900">Availability</p>
          <p className="text-slate-700">{form.availability}</p>
        </div>
        {selectedResources.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]">
            <p className="text-sm font-semibold text-slate-900">Resources</p>
            <p className="text-slate-700">{form.resourceQuantity} {form.resourceUnit} — {form.resourceDetails}</p>
          </div>
        )}
        {form.helpTypes.includes('Volunteer Time') && (
          <div className="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]">
            <p className="text-sm font-semibold text-slate-900">Volunteer details</p>
            <p className="text-slate-700">{form.volunteerSkills}, {form.volunteerHours}, {form.volunteerPreferences}</p>
          </div>
        )}
        {form.helpTypes.includes('Rescue/Transport') && (
          <div className="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]">
            <p className="text-sm font-semibold text-slate-900">Transport</p>
            <p className="text-slate-700">{form.vehicleType}, capacity {form.vehicleCapacity}, {form.vehicleAvailability}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderDashboard = () => {
    if (!submitted) return null;
    return (
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Your contribution</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Helper registration complete</h1>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">Status: {submitted.status}</div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[1.75rem] bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Helper ID</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{submitted.id}</p>
            </div>
            <div className="rounded-[1.75rem] bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Type</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{form.helpTypes.join(', ')}</p>
            </div>
            <div className="rounded-[1.75rem] bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Location</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{form.location}</p>
            </div>
            <div className="rounded-[1.75rem] bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Availability</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{form.availability}</p>
            </div>
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 text-slate-700">
            <p className="font-semibold text-slate-900">Next steps</p>
            <p className="mt-2 text-sm leading-6">
              This is a prototype dashboard. Verification and matching are shown as demo states only, and no requests are actively routed.
            </p>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Potential Matches — Demo</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Example needs that could align with what you offer</h2>
            </div>
            <StatusBadge label="Demo only" tone="warning" />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {demoMatches.map((match) => (
              <div key={match.title} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{match.title}</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">Need: {match.need}</p>
                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <p>People: {match.people}</p>
                  <p>Distance: {match.distance}</p>
                  <p>Priority: {match.priority}</p>
                  <p>Required: {match.required}</p>
                  <p>Your availability: {match.yourAvailability}</p>
                  <p>Status: {match.status}</p>
                </div>
                <button type="button" className="mt-6 w-full rounded-full bg-ocean-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ocean-800">
                  View request
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <p className="text-slate-600">Choose one or more ways you can help. This helps the platform match your offer with needs later.</p>
            <CheckboxGroup
              label="What can you provide?"
              options={helperTypeOptions}
              selected={form.helpTypes}
              onChange={(helpTypes) => updateForm({ helpTypes })}
              name="helpTypes"
            />
            {errors.helpTypes && <p className="text-sm text-rose-600">{errors.helpTypes}</p>}
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <p className="text-slate-600">Share your location so potential matches stay nearby and realistic.</p>
            <div className="grid gap-6 lg:grid-cols-[1fr_14rem]">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Location</p>
                <p className="mt-3 text-sm text-slate-600">Use browser location when available or enter a place manually.</p>
                <button type="button" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-ocean-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ocean-800" onClick={handleUseLocation}>
                  Use current location
                </button>
                <p className="mt-3 text-sm text-slate-500">{geoAvailable ? geoStatus || 'Browser geolocation available.' : 'Geolocation unavailable in this browser.'}</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
                <TextInput
                  label="Manual location entry"
                  id="location"
                  value={form.location}
                  onChange={(value) => updateForm({ location: value, locationSource: 'manual' })}
                  placeholder="Town, village, or nearby landmark"
                  required
                />
                <SelectInput
                  label="Availability"
                  id="availability"
                  value={form.availability}
                  onChange={(value) => updateForm({ availability: value })}
                  options={helperAvailabilityOptions}
                  required
                />
                {errors.location && <p className="mt-2 text-sm text-rose-600">{errors.location}</p>}
                {errors.availability && <p className="mt-2 text-sm text-rose-600">{errors.availability}</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return renderDetailsSection();
      case 3:
        return renderReview();
      case 4:
        return renderDashboard();
      default:
        return null;
    }
  };

  return (
    <div className="bg-calm px-6 py-16 sm:px-8 lg:px-10">
      <Section title="I want to help" subtitle="Register what you can offer and where you can help.">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
          <FormStepBar steps={stepLabels} current={currentStep} />
          {currentStep < stepLabels.length - 1 ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {renderStepContent()}
              <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  {currentStep > 0 && (
                    <button type="button" onClick={handleBack} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Back
                    </button>
                  )}
                  <p className="text-sm text-slate-500">Step {currentStep + 1} of {stepLabels.length - 1}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {currentStep < stepLabels.length - 2 ? (
                    <button type="button" onClick={handleNext} className="rounded-full bg-ocean-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ocean-800">
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300">
                      Submit registration
                    </button>
                  )}
                </div>
              </div>
            </form>
          ) : (
            renderStepContent()
          )}
        </div>
      </Section>
    </div>
  );
}

export default VolunteerPage;
