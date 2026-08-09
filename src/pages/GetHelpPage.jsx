import { useEffect, useMemo, useState } from 'react';
import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';
import CheckboxGroup from '../components/CheckboxGroup.jsx';
import FormStepBar from '../components/FormStepBar.jsx';
import SelectInput from '../components/SelectInput.jsx';
import TextInput from '../components/TextInput.jsx';
import ToggleInput from '../components/ToggleInput.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { needOptions, unavailableDurations } from '../data/helpFormData.js';
import { calculatePriority, priorityLabel } from '../services/priority.js';

const stepLabels = ['Need', 'Location', 'People', 'Situation', 'Review', 'Tracking'];

const initialFormValues = {
  needs: [],
  location: '',
  locationSource: 'manual',
  peopleAffected: '',
  childrenPresent: false,
  elderlyPresent: false,
  personWithDisability: false,
  medicalEmergency: false,
  currentlyTrapped: false,
  accessToDrinkingWater: true,
  helpUnavailableDuration: '',
  description: '',
};

const timelineSteps = [
  'REQUEST SUBMITTED',
  'PRIORITY ASSESSED',
  'SEARCHING FOR HELP',
  'RESPONDER MATCHED',
  'HELP DISPATCHED',
  'RESOLVED',
];

function generateRequestId() {
  return `JAL-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function GetHelpPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [geoStatus, setGeoStatus] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const geoAvailable = useMemo(() => typeof navigator !== 'undefined' && 'geolocation' in navigator, []);

  useEffect(() => {
    const unsaved = isDirty && !submittedRequest;
    function handleUnload(event) {
      if (!unsaved) return;
      event.preventDefault();
      event.returnValue = '';
    }
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [isDirty, submittedRequest]);

  const updateValue = (next) => {
    setFormValues((current) => ({ ...current, ...next }));
    setIsDirty(true);
  };

  const validateStep = () => {
    const nextErrors = {};

    if (currentStep === 0) {
      if (formValues.needs.length === 0) nextErrors.needs = 'Select at least one need.';
    }

    if (currentStep === 1) {
      if (!formValues.location.trim()) nextErrors.location = 'Enter your location or use browser location.';
    }

    if (currentStep === 2) {
      if (!formValues.peopleAffected || Number(formValues.peopleAffected) < 1) {
        nextErrors.peopleAffected = 'Enter the number of people affected.';
      }
    }

    if (currentStep === 3) {
      if (!formValues.helpUnavailableDuration) nextErrors.helpUnavailableDuration = 'Choose a duration.';
      if (!formValues.description.trim()) nextErrors.description = 'Describe your situation briefly.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep((step) => Math.min(step + 1, stepLabels.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleUseLocation = () => {
    if (!geoAvailable) {
      setGeoStatus('Geolocation is not available in this browser.');
      return;
    }

    setGeoStatus('Requesting location...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateValue({
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
    const score = calculatePriority(formValues);
    const request = {
      id: generateRequestId(),
      score,
      priority: priorityLabel(score),
      submittedAt: new Date().toISOString(),
      details: formValues,
    };
    setSubmittedRequest(request);
    setCurrentStep(stepLabels.length - 1);
    setIsDirty(false);
  };

  const reviewRows = [
    { label: 'Needs', value: formValues.needs.join(', ') || 'None selected' },
    { label: 'Location', value: formValues.location || 'Not provided', note: formValues.locationSource === 'geolocation' ? 'Browser location captured' : 'Manual location entry' },
    { label: 'People affected', value: formValues.peopleAffected || 'Not specified' },
    { label: 'Children present', value: formValues.childrenPresent ? 'Yes' : 'No' },
    { label: 'Elderly present', value: formValues.elderlyPresent ? 'Yes' : 'No' },
    { label: 'Person with disability', value: formValues.personWithDisability ? 'Yes' : 'No' },
    { label: 'Medical emergency', value: formValues.medicalEmergency ? 'Yes' : 'No' },
    { label: 'Currently trapped', value: formValues.currentlyTrapped ? 'Yes' : 'No' },
    { label: 'Access to drinking water', value: formValues.accessToDrinkingWater ? 'Yes' : 'No' },
    { label: 'Help unavailable for', value: unavailableDurations.find((item) => item.value === formValues.helpUnavailableDuration)?.label || 'Not selected' },
    { label: 'Situation description', value: formValues.description || 'Not provided' },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <p className="text-slate-600">Tell us what kind of help you need. You can select more than one option.</p>
            <CheckboxGroup
              label="Select the help needed"
              options={needOptions}
              selected={formValues.needs}
              onChange={(needs) => updateValue({ needs })}
              name="needs"
            />
            {errors.needs && <p className="text-sm text-rose-600">{errors.needs}</p>}
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_12rem]">
              <div className="space-y-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Location information</p>
                <p className="text-sm text-slate-600">
                  Use your browser location when possible, or enter a nearby address, landmark, or village.
                </p>
                <Button variant="secondary" size="sm" className="w-full" onClick={handleUseLocation}>
                  Use my current location
                </Button>
                <p className="text-sm text-slate-500">{geoAvailable ? geoStatus || 'Browser geolocation is available.' : 'Geolocation not available in this browser.'}</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
                <TextInput
                  label="Manual location entry"
                  id="location"
                  value={formValues.location}
                  onChange={(value) => updateValue({ location: value, locationSource: 'manual' })}
                  placeholder="Village, block, or nearest landmark"
                  required
                  hint="Labelled as demo or prototype data if real location cannot be confirmed."
                />
              </div>
            </div>
            {errors.location && <p className="text-sm text-rose-600">{errors.location}</p>}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-slate-600">Help us understand how many people are affected and whether the situation involves higher risk factors.</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextInput
                label="Number of people affected"
                id="peopleAffected"
                value={formValues.peopleAffected}
                onChange={(value) => updateValue({ peopleAffected: value.replace(/[^0-9]/g, '') })}
                placeholder="e.g. 4"
                required
              />
              <div className="space-y-4">
                <ToggleInput
                  label="Children present"
                  checked={formValues.childrenPresent}
                  onChange={(checked) => updateValue({ childrenPresent: checked })}
                />
                <ToggleInput
                  label="Elderly present"
                  checked={formValues.elderlyPresent}
                  onChange={(checked) => updateValue({ elderlyPresent: checked })}
                />
                <ToggleInput
                  label="Person with disability"
                  checked={formValues.personWithDisability}
                  onChange={(checked) => updateValue({ personWithDisability: checked })}
                />
              </div>
              <div className="space-y-4">
                <ToggleInput
                  label="Medical emergency"
                  checked={formValues.medicalEmergency}
                  onChange={(checked) => updateValue({ medicalEmergency: checked })}
                />
                <ToggleInput
                  label="Currently trapped"
                  checked={formValues.currentlyTrapped}
                  onChange={(checked) => updateValue({ currentlyTrapped: checked })}
                />
                <ToggleInput
                  label="Access to drinking water"
                  checked={formValues.accessToDrinkingWater}
                  onChange={(checked) => updateValue({ accessToDrinkingWater: checked })}
                  hint="Uncheck if there is no access to safe drinking water."
                />
              </div>
            </div>
            {errors.peopleAffected && <p className="text-sm text-rose-600">{errors.peopleAffected}</p>}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-slate-600">Describe the current conditions so responders can understand the most urgent needs.</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectInput
                label="How long help has been unavailable"
                id="helpUnavailableDuration"
                value={formValues.helpUnavailableDuration}
                onChange={(value) => updateValue({ helpUnavailableDuration: value })}
                options={unavailableDurations}
                required
              />
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-slate-900">
                  Situation description <span className="text-amber-600">*</span>
                </label>
                <textarea
                  id="description"
                  value={formValues.description}
                  onChange={(event) => updateValue({ description: event.target.value })}
                  placeholder="Share what is happening and what is needed most."
                  rows="6"
                  className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100"
                />
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
              Prototype note: priority is calculated from the information you provide. This is a demo assessment only.
            </div>
            {(errors.helpUnavailableDuration || errors.description) && (
              <div className="space-y-2 text-sm text-rose-600">
                {errors.helpUnavailableDuration && <p>{errors.helpUnavailableDuration}</p>}
                {errors.description && <p>{errors.description}</p>}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <p className="text-slate-600">Review your request before submission. You can go back to make changes if needed.</p>
            <div className="space-y-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
              {reviewRows.map((row) => (
                <div key={row.label} className="grid gap-1 sm:grid-cols-[11rem_1fr]">
                  <p className="text-sm font-semibold text-slate-900">{row.label}</p>
                  <div>
                    <p className="text-sm text-slate-700">{row.value}</p>
                    {row.note && <p className="text-xs text-slate-500">{row.note}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5 text-sm text-slate-600">
              Prototype priority assessment is based on medical urgency, access to water, and vulnerable people present.
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Request submitted</p>
                  <h2 className="mt-3 text-3xl font-semibold text-slate-900">Your demo request is in the system.</h2>
                </div>
                <StatusBadge label="Prototype only" tone="warning" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Request ID</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">{submittedRequest.id}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Priority</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">{submittedRequest.priority}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Score</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">{submittedRequest.score}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[0.85fr_0.9fr]">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Incident summary</p>
                <div className="mt-6 space-y-4 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">Needs:</span> {submittedRequest.details.needs.join(', ') || 'None selected'}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">People affected:</span> {submittedRequest.details.peopleAffected}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Location:</span> {submittedRequest.details.location}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Description:</span> {submittedRequest.details.description}
                  </p>
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-ocean-600">Request timeline</p>
                <div className="mt-6 space-y-4">
                  {timelineSteps.map((label, index) => {
                    const isComplete = index < 2;
                    return (
                      <div key={label} className="flex items-start gap-4">
                        <div className={`mt-1 h-3.5 w-3.5 rounded-full ${isComplete ? 'bg-ocean-900' : 'border border-slate-300 bg-white'}`} />
                        <div>
                          <p className={`text-sm font-semibold ${isComplete ? 'text-slate-900' : 'text-slate-500'}`}>{label}</p>
                          <p className="text-xs text-slate-500">{isComplete ? 'Completed' : 'Demo state'}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 rounded-3xl bg-amber-50 p-4 text-sm text-amber-900">
                  Prototype only — this demo does not contact emergency services.
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-calm px-6 py-16 sm:px-8 lg:px-10">
      <Section title="Get help" subtitle="Report your need and receive a prototype priority assessment.">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft">
          <FormStepBar steps={stepLabels} current={currentStep} />
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStepContent()}
            {currentStep < stepLabels.length - 1 ? (
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
                      Submit request
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </Section>
    </div>
  );
}

export default GetHelpPage;
