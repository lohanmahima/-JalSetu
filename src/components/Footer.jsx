import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/90 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-slate-700 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-base font-semibold text-ocean-900">JalSetu</p>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            Prototype demo interface for disaster relief coordination. Demo data only.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link to="/">Home</Link>
          <Link to="/map">Live Map</Link>
          <Link to="/get-help">Get Help</Link>
          <Link to="/volunteer">Volunteer</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/command-center">Command Center</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
