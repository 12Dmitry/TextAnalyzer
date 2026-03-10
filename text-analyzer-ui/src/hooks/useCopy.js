import { useState } from "react";

export function useCopyIcon() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (text) => {
        if (!text) return; // Не копируем пустоту

        try {
            // Ждем завершения записи в буфер
            await navigator.clipboard.writeText(text);

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Ошибка при копировании: ", err);
        }
    };

    return { handleCopy, copied };
}
