export const NeonLogo = () => (
    <div className="relative group">
        {/* Свечение на фоне */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

        <svg
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            className="relative"
        >
            {/* Углы сканера */}
            <path d="M7 3H5C3.9 3 3 3.9 3 5V7" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 3H19C20.1 3 21 3.9 21 5V7" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 17V19C3 20.1 3.9 21 5 21H7" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
            <path d="M21 17V19C21 20.1 20.1 21 19 21H17" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />

            {/* Центральная линия с анимацией */}
            <line x1="6" y1="12" x2="18" y2="12" stroke="#818CF8" strokeWidth="2" strokeLinecap="round">
                <animate attributeName="y1" values="9;15;9" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y2" values="9;15;9" dur="3s" repeatCount="indefinite" />
            </line>

            {/* Точки "данных" */}
            <circle cx="12" cy="8" r="1" fill="#F43F5E">
                <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="12" cy="16" r="1" fill="#F43F5E">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
        </svg>
    </div>
);
