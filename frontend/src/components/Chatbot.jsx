import { useState, useEffect, useRef } from "react";

function Chatbot({ disease }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const chatEndRef = useRef(null);

    // ✅ Auto scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat, isTyping]);

    // ✅ REAL AI FUNCTION
    const sendMessage = async () => {
        if (!message) return;

        const userMessage = { type: "user", text: message };

        setChat((prev) => [...prev, userMessage]);
        setMessage("");
        setIsTyping(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    disease: disease
                })
            });

            const data = await res.json();

            setChat((prev) => [
                ...prev,
                { type: "bot", text: data.reply }
            ]);

        } catch (error) {
            setChat((prev) => [
                ...prev,
                { type: "bot", text: "⚠️ Error connecting to AI server." }
            ]);
        }

        setIsTyping(false);
    };

    return (
        <>
            {/* FLOAT BUTTON */}
            <div style={styles.floatingButton} onClick={() => setIsOpen(!isOpen)}>
                💬
            </div>

            {/* CHAT WINDOW */}
            {isOpen && (
                <div style={styles.chatWindow}>
                    <div style={styles.header}>
                        🌱 AI Assistant
                        <span style={styles.close} onClick={() => setIsOpen(false)}>
                            ✖
                        </span>
                    </div>

                    <div style={styles.chatArea}>
                        {chat.map((c, i) => (
                            <div
                                key={i}
                                style={c.type === "user" ? styles.userMsg : styles.botMsg}
                            >
                                {c.text}
                            </div>
                        ))}

                        {/* ✅ Typing Animation */}
                        {isTyping && (
                            <div style={styles.botMsg}>
                                <span>Typing...</span>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    <div style={styles.inputArea}>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask about crops, diseases..."
                            style={styles.input}
                        />

                        <button onClick={sendMessage} style={styles.sendBtn}>
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    floatingButton: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#2e7d32",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        zIndex: 1000
    },

    chatWindow: {
        position: "fixed",
        bottom: "90px",
        right: "20px",
        width: "320px",
        height: "420px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },

    header: {
        background: "#2e7d32",
        color: "white",
        padding: "10px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between"
    },

    close: {
        cursor: "pointer"
    },

    chatArea: {
        flex: 1,
        padding: "10px",
        overflowY: "auto",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column"
    },

    userMsg: {
        background: "#2e7d32",
        color: "white",
        padding: "8px",
        borderRadius: "10px",
        marginBottom: "8px",
        alignSelf: "flex-end",
        maxWidth: "80%"
    },

    botMsg: {
        background: "#e0e0e0",
        padding: "8px",
        borderRadius: "10px",
        marginBottom: "8px",
        alignSelf: "flex-start",
        maxWidth: "80%"
    },

    inputArea: {
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ddd"
    },

    input: {
        flex: 1,
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc"
    },

    sendBtn: {
        marginLeft: "8px",
        background: "#2e7d32",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer"
    }
};

export default Chatbot;