import {useState} from "react";
import { storageService } from './services/storage';
import { useTextAnalyzer, useCopyIcon, useHistory } from "./hooks/";
import { Header, Footer } from "./components/ui";
import { Editor, ResultSidebar } from "./components/Analyzer/";

export function App() {
    const [activeTab, setActiveTab] = useState('main');

    const { getClientId } = storageService;
    const {text, setText, result, setResult, loading, error:analyzerError, analyze, clear} = useTextAnalyzer();
    const {fetchHistory, getDetails, deleteHistory, history, error:historyError} = useHistory();
    const {copied, handleCopy} = useCopyIcon();

    const currentError = analyzerError || historyError;

    const handleSelectHistory = async (id) => {
        const details = await getDetails(id);
        if (details) {
            setText(details.text);
            setResult(details.result);
            setActiveTab('main');
        }
    };
    const handleAnalyzeClick = () => {
        analyze();
        setActiveTab('main');
    };
    const handleHistoryClick = () => {
        const clientId = getClientId()
        fetchHistory(clientId);
        setActiveTab('history');
    };
    const handleAllHistoryClick = () => {
        const clientId = getClientId()
        fetchHistory(clientId, true);
    };

    return (
        <div className="h-screen bg-slate-950 text-slate-100 flex flex-col p-6 overflow-hidden">
            <div className="w-full max-w-6xl mx-auto flex flex-col flex-1 gap-6 overflow-hidden">
                <Header/>

                <main className="flex-1 grid lg:grid-cols-3 gap-6 min-h-0">
                    <Editor
                        text={text} setText={setText}
                        onAnalyze={handleAnalyzeClick} onClear={clear}
                        onCopy={() => handleCopy(text)}
                        onFetchHistory={handleHistoryClick}
                        copied={copied} loading={loading}
                        charCount={text.length}
                    />

                    <ResultSidebar
                        result={result}
                        history={history}
                        onSelectHistory={(item) => handleSelectHistory(item.id)}
                        deleteHistory={(item) => deleteHistory(item.id)}
                        activeTab={activeTab}       // Передаем значение
                        setActiveTab={setActiveTab} // Передаем функцию управления
                        allHistory ={handleAllHistoryClick}
                    />
                </main>

                {currentError && <ErrorBanner message={currentError} />}
                <Footer />
            </div>
        </div>
    );
}

const ErrorBanner = ({ message }) => (
    <div className="mt-4 text-sm text-red-400 bg-red-900/20 p-3 rounded-xl border border-red-700 animate-in fade-in duration-300">
        ⚠️ {message}
    </div>
);
