import { NavLink } from 'react-router-dom';
import Button from './Button.jsx';

const navItems = [
  { label: 'Live Map', to: '/map' },
  { label: 'Get Help', to: '/get-help' },
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'Donate', to: '/donate' },
  { label: 'Resources', to: '/resources' },
  { label: 'Matches', to: '/matches' },
  { label: 'Command Center', to: '/command-center' },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-50/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <NavLink to="/" className="font-semibold text-ocean-900 text-xl tracking-tight">
          JalSetu
        </NavLink>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-ocean-900' : 'text-slate-600 hover:text-ocean-800'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <NavLink to="/get-help" className="hidden rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 md:inline-block">
            I NEED HELP
          </NavLink>
          <Button to="/volunteer" variant="secondary" size="sm">
            I WANT TO HELP
          </Button>
          <button className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 md:hidden">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
