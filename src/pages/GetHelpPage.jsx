import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';

function GetHelpPage() {
  return (
    <div className="bg-calm px-6 py-16 sm:px-8 lg:px-10">
      <Section title="Get help" subtitle="Submit a request and connect with relief support in your area.">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-soft">
          <div className="space-y-6">
            <p className="text-slate-600">
              This page is a sample experience showing how people can request support and stay informed about next steps.
            </p>
            <Button variant="primary" to="/" size="md">
              Return to homepage
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default GetHelpPage;
