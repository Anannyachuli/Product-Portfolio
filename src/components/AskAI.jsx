import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

const SECTION_LABELS = {
  about: 'About',
  work: 'Work',
  research: 'Research',
  projects: 'Projects',
  experience: 'Experience',
  skills: 'Skills',
  education: 'Education',
  contact: 'Contact',
};

const STARTER_QUESTIONS = [
  "What's Anannya's experience with AI?",
  "Tell me about her leadership experience",
  "What products has she shipped?",
  "What's her technical background?",
];

function parseSections(text) {
  const sectionMatch = text.match(/SECTIONS:\s*(.+)$/im);
  if (!sectionMatch) return { cleanText: text.trim(), sections: [] };

  const cleanText = text.replace(/SECTIONS:\s*(.+)$/im, '').trim();
  const sections = sectionMatch[1]
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => SECTION_LABELS[s]);

  return { cleanText, sections };
}

function scrollToSection(sectionId, onClose) {
  onClose();
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
}

function MessageBubble({ message, onClose }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-purple-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%] text-sm leading-relaxed">
          {message.text}
        </div>
      </div>
    );
  }

  const { cleanText, sections } = parseSections(message.text);

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%]">
        <div className="bg-white/10 text-white/90 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed whitespace-pre-wrap">
          {cleanText}
        </div>
        {sections.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollToSection(s, onClose)}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 hover:text-white transition-all cursor-pointer border border-purple-500/30"
              >
                {SECTION_LABELS[s]}
                <ArrowRight size={10} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white/10 text-white/60 px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex items-center gap-1.5">
          <Loader2 size={14} className="animate-spin" />
          <span className="text-xs">Thinking...</span>
        </div>
      </div>
    </div>
  );
}

export default function AskAI({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const buildHistory = () => {
    return messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));
  };

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = buildHistory();
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      setMessages((prev) => [...prev, { role: 'assistant', text: '' }]);
      setIsLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const payload = line.slice(6).trim();
            if (payload === '[DONE]') continue;
            try {
              const data = JSON.parse(payload);
              if (data.text) {
                fullText += data.text;
                const currentText = fullText;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    text: currentText,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "Sorry, I couldn't get a response right now. Please try again in a moment.",
        },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#1a1225] z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center">
                  <Sparkles size={16} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Ask about Anannya</h3>
                  <p className="text-white/40 text-xs">Powered by AI</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {messages.length === 0 && (
                <div className="h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-3">
                      <Sparkles size={24} className="text-purple-400" />
                    </div>
                    <h4 className="text-white font-medium text-base mb-1">
                      Hi! Ask me anything about Anannya
                    </h4>
                    <p className="text-white/40 text-xs">
                      Experience, skills, projects, research — I have it all.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left px-4 py-2.5 rounded-xl bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all border border-white/5 hover:border-white/15"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} onClose={onClose} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-white/10"
            >
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/10 focus-within:border-purple-500/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, skills, projects..."
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-1.5 rounded-lg bg-purple-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
