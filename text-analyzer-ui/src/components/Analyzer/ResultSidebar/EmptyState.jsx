export const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
            {/* Иконка с мягким свечением */}
            <div className="w-16 h-16 mb-4 rounded-full bg-indigo-500/10 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                📊
            </div>

            <h3 className="text-slate-200 font-semibold mb-1 text-center">
                Готов к анализу
            </h3>

            <p className="text-slate-500 text-sm text-center max-w-[200px]">
                Введите текст слева и нажмите кнопку, чтобы увидеть статистику
            </p>

            {/* Декоративный элемент — имитация строк данных */}
            <div className="mt-6 w-full space-y-2 opacity-20">
                <div className="h-2 w-3/4 bg-slate-700 rounded" />
                <div className="h-2 w-1/2 bg-slate-700 rounded" />
            </div>
        </div>
    );
};
