import { StatsGrid, StatsAdvanced, EmptyState } from "../index.js";
import {Button, TrashIcon} from "../../ui/index.js";

export const ResultSidebar = ({ result, history, onSelectHistory, deleteHistory, activeTab, setActiveTab, allHistory }) => {

    return (
        <aside className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 flex-none">
                <h2 className="text-xl font-bold tracking-tight">Результаты</h2>
                <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <Button variant="tab" active={activeTab === 'main'} onClick={() => setActiveTab('main')}>База</Button>
                    <Button variant="tab" active={activeTab === 'top'} onClick={() => setActiveTab('top')}>Топы</Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {activeTab === 'history' ? (
                    <HistoryList history={history} deleteHistory = {deleteHistory} allHistory={allHistory} onSelect={(item) => {
                        console.log("Выбранный элемент истории:", item); // Посмотри, есть ли там поле .text
                        onSelectHistory(item);
                        setActiveTab('main');
                    }} />
                ) : result ? (
                    activeTab === 'main' ? <StatsGrid stats={result}/> : <StatsAdvanced stats={result}/>
                ) : (
                    <EmptyState/>
                )}
            </div>
        </aside>
    );
};

const HistoryList = ({ history, onSelect, deleteHistory, allHistory }) => (
    <div className="space-y-3 animate-in fade-in duration-300">
        {!history?.length && <p className="text-slate-500 text-sm text-center py-10">История пуста</p>}
        {history?.map((item) => (
            <div
                key={item.id}
                // Останавливаем всплытие клика, чтобы при нажатии на корзину не выбирался элемент
                onClick={() => onSelect(item)}
                className="group relative p-3 rounded-xl bg-slate-800/40 border border-slate-700 hover:border-indigo-500/50 cursor-pointer transition-all flex items-center justify-between gap-3"
            >
                {/* Левая часть с текстом */}
                <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-indigo-400 font-bold mb-1 uppercase tracking-wider">{item.date}</div>
                    <div className="text-sm text-slate-300 truncate group-hover:text-white">
                        {item.previewText}
                    </div>
                </div>

                {/* Правая часть с кнопкой */}
                <Button
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 hover:text-rose-400 p-2 transition-all"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteHistory(item);
                    }}
                    title="Удалить"
                >
                    <TrashIcon />
                </Button>
            </div>
        ))}

        {history?.length > 0 && (
            <Button variant="primary" className="w-full mt-4" onClick={allHistory}>
                Показать всю историю
            </Button>
        )}
    </div>
);
