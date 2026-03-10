import { useState } from 'react';
import { textService } from '../services/api';
import { storageService } from '../services/storage';
import { useApi } from './useApi';

export function useTextAnalyzer() {
    const [text, setText] = useState('');
    const { data: result, setData: setResult, loading, error, request } = useApi();

    const analyze = async () => {
        const clientId = storageService.getClientId();
        setResult(await request(textService.analyze, text, clientId));
    };

    const clear = () => {
        setText("");
        setResult(null);
    };

    return { text, setText, result, loading, error, analyze, clear, setResult };
}
