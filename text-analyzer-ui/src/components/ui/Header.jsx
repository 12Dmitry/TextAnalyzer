import {NeonLogo} from "./Logo.jsx"; 
import {Badge} from "./Badge.jsx";

export const Header = () => {
    return (
        <header className="flex-none flex justify-between items-end">
                    <div className="flex items-center gap-4">
                        <NeonLogo/>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-400 to-pink-400">
                                Neon Text Analyzer
                            </h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Быстрый анализ текста — частоты, длины и базовая статистика
                            </p>
                        </div>
                    </div>

                    <Badge>v1.0</Badge>
                </header>
    )
};