import { useState } from 'react';

export const StatsGrid = ({ stats }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatItem label="Слов" value={stats.wordsCount} icon="📝" />
            <StatItem label="Знаков" value={stats.charactersCount} icon="🔢" />
            <StatItem label="Предложений" value={stats.sentencesCount} icon="📂" />
            <StatItem label="Слогов" value={stats.syllablesCount} icon="🗣️" />
            <StatItem label="Знаков преп." value={stats.punctuationCount} icon="❗" />

            {/* Карточка Индекса Флеша */}
            <div className="relative col-span-full mt-2 p-5 rounded-2xl bg-slate-900/40 border border-indigo-500/20 overflow-hidden">
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors border border-indigo-500/30"
                    title="Что это?"
                >
                    <span className="text-xs font-bold">?</span>
                </button>

                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <div className="text-[10px] text-indigo-300 uppercase font-black tracking-[0.2em] mb-1">Индекс Флеша</div>
                        <div className="text-3xl font-black text-white">{stats.readabilityIndex}</div>
                    </div>
                    <div className="text-right">
                        {/*<span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">Сложность</span>*/}
                        <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-bold border border-indigo-500/20">
                {getReadabilityLabel(stats.readabilityIndex)}
             </span>
                    </div>
                </div>

                {/* Выпадающая инфа (Info Panel) */}
                {showInfo && (
                    <div className="mt-4 pt-4 border-t border-indigo-500/10 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <strong className="text-indigo-300">Индекс удобочитаемости Флеша</strong> показывает, насколько легко читать ваш текст.
                            Алгоритм анализирует длину предложений и количество слогов в словах.
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-wider">
                            <div className="text-emerald-400">80+: Легко (дети)</div>
                            <div className="text-indigo-400">50-80: Средне (статьи)</div>
                            <div className="text-amber-400">30-50: Сложно (наука)</div>
                            <div className="text-rose-400">0-30: Юристы / ВУЗ</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Вспомогательная функция для расшифровки индекса
const getReadabilityLabel = (score) => {
    if (score >= 80) return "Очень легко";
    if (score >= 50) return "Средне";
    if (score >= 30) return "Сложно";
    return "Очень сложно";
};

const StatItem = ({ label, value, icon, color }) => (
    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden">
        <div className="text-xl mb-1">{icon}</div>
        {/* break-words не даст тексту выйти за границы */}
        <div className="text-xs text-slate-500 uppercase font-bold wrap-break-word">{label}</div>
        <div className={`text-xl font-bold truncate ${color}`}>{value}</div>
    </div>
);
