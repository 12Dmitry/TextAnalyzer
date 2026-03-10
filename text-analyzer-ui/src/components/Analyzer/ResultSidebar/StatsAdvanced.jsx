export const StatsAdvanced = ({ stats }) => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <WordList title="Частота появления" words={stats.topFrequency} icon="📈" showKeys = "true" color="text-indigo-400" />
        <WordList title="Самые длинные слова" words={stats.topLength} icon="📏" color="text-rose-400" />
    </div>
);

const WordList = ({ title, words, icon, showKeys = false, color }) => {
    // Превращаем всё в массив пар [key, value], даже если пришел массив
    const entries = Object.entries(words);

    return (
        <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 flex items-center gap-2">
                <span>{icon}</span> {title}
            </h3>
            <div className="flex flex-wrap gap-2">
                {entries.map(([key, word]) => (
                    <div key={key} className="px-3 py-1.5 rounded-lg bg-slate-800/40 border border-slate-700 text-sm text-slate-300 hover:border-indigo-500/50 transition-colors break-all">
                        {showKeys && <span className="text-indigo-400 font-mono mr-2">{key}:</span>}
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
};
