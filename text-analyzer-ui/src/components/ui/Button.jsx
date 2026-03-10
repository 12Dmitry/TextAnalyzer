export const Button = ({ children, variant = 'secondary', active = true, className = '', ...props }) => {
    const variants = {
        primary: "bg-gradient-to-r from-indigo-500 to-pink-500 text-white !border-none shadow-lg shadow-indigo-500/20",
        secondary: "bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700 text-slate-300",
        ghost: "bg-transparent !border-none text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 shadow-none",
        tab: `px-3 py-1 text-[10px] uppercase font-bold rounded-lg transition-all 
        ${active ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300 border-none bg-transparent'}`
    };

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
