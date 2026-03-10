import { Button, CopyIcon, CheckIcon, TrashIcon, HistoryIcon, LoaderIcon } from "../ui";

export const Editor = ({ text, setText, onAnalyze, onClear, onCopy, onFetchHistory, copied, loading, charCount }) => (
    <section className="lg:col-span-2 flex flex-col gap-4 min-h-0">
        <div className="flex-1 relative min-h-0">
            <textarea
                className="w-full h-full rounded-2xl bg-slate-900/50 border border-slate-800 p-6 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-lg scrollbar-thin scrollbar-thumb-indigo-500/20"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст для анализа..."
            />
        </div>

        <div className="flex-none flex items-center gap-3">
            <Button variant="primary" onClick={onAnalyze} disabled={loading || !text}>
                {loading ? <LoaderIcon /> : 'Анализировать'}
            </Button>

            <Button variant="ghost" onClick={onCopy} title="Копировать">
                {copied ? <span className="text-emerald-400"><CheckIcon/></span> : <CopyIcon/>}
            </Button>

            <Button variant="ghost" className="hover:text-rose-400" onClick={onClear} title="Очистить">
                <TrashIcon/>
            </Button>

            <Button variant="ghost" onClick={onFetchHistory} title="История">
                <HistoryIcon />
            </Button>

            <div className="ml-auto text-sm text-slate-400">
                Всего символов: <span className="font-medium text-slate-100">{charCount}</span>
            </div>
        </div>
    </section>
);
