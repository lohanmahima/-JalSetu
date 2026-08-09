import { Link } from 'react-router-dom';

const styleMap = {
  primary: 'bg-ocean-900 text-white hover:bg-ocean-800',
  secondary: 'bg-white text-ocean-900 ring-1 ring-slate-300 hover:bg-slate-100',
  subtle: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
};

const sizeMap = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-base',
};

function Button({ to, variant = 'primary', size = 'md', children, className = '' }) {
  const classes = `inline-flex items-center justify-center rounded-full font-semibold transition ${styleMap[variant]} ${sizeMap[size]} ${className}`;

  return to ? (
    <Link to={to} className={classes}>
      {children}
    </Link>
  ) : (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}

export default Button;
