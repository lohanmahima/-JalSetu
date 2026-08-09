import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';

function VolunteerPage() {
  return (
    <div className="bg-calm px-6 py-16 sm:px-8 lg:px-10">
      <Section title="Volunteer" subtitle="Offer your time and skills to support relief operations.">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-soft">
          <div className="space-y-6">
            <p className="text-slate-600">
              This page is a placeholder for volunteer signup and local coordination pathways.
            </p>
            <Button variant="secondary" to="/" size="md">
              Return to homepage
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default VolunteerPage;
