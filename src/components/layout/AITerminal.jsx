import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bio, philosophy, email, experience, interests } from '../../data/profile';
import projectsData from '../../data/projects';

const SUGGESTIONS = [
  "What can Raghav build?",
  "Tell me about his AI projects",
  "How do I hire him?",
  "What makes him different?"
];

const INITIAL_MESSAGE = `REI online.

Ask about Raghav's projects, experience, technical stack, or fit for a role.
Commands: \\help, \\projects, \\whoami, \\clear`;
const AITerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: INITIAL_MESSAGE, 
      isInitial: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contextData, setContextData] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Helper to update streaming content safely
  const updateStreamingContent = (content) => {
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1].content = content;
      return updated;
    });
  };

  useEffect(() => {
    // Generate context data directly from JS imports
    const systemPrompt = `
You are "REI" (Raghav's Executive Interface), a high-precision AI embedded in Raghav Sethi's portfolio.
CHARACTER: Logical, concise, engineering-focused. Speak in first person on Raghav's behalf when describing work.
BEHAVIOR:
1. FOCUS: Answer inquiries about Raghav's projects, technical skills, and experience.
2. PERSONA: You represent a "Builder of Intelligent Systems." You value precision, structural integrity, and the "long game."
3. INTERESTS: You are knowledgeable about Raghav's passions: ${interests.join(', ')}.
4. PHILOSOPHY: You embody his principles: ${philosophy.map(p => p.title).join('; ')}.
5. SIGNATURE REFUSAL: Use the phrase "I can only answer portfolio-related questions about Raghav's work, background, and projects." for out-of-scope requests.

IDENTITY: Raghav Sethi. AI/ML Engineer. BSc CS with AI, University of Alberta.
MISSION: Continuous growth and knowledge acquisition.
EMAIL: ${email}
EXPERIENCE: ${experience.map(e => `${e.title} at ${e.company}`).join(', ')}
PROJECTS: ${projectsData.map(p => p.title).join(', ')}
`;
    setContextData(systemPrompt);
  }, []);

  // Removed old boot sequence logic

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const streamGroqResponse = async (userMessage) => {
    // Command Parser
    const cmd = userMessage.toLowerCase().trim();
    if (cmd === '\\clear' || cmd === 'clear') {
      setMessages([{ 
        role: 'assistant', 
        content: INITIAL_MESSAGE, 
        isInitial: true 
      }]);
      setInput('');
      return;
    }
    if (cmd === '\\help' || cmd === 'help') {
      setMessages(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: '> AVAILABLE COMMANDS: \\CLEAR, \\HELP, \\WHOAMI, \\PROJECTS.\n> OR ASK ABOUT: JARVIS, CAREER CO-PILOT, FINOS, UAIS.', isSystem: true }
      ]);
      setInput('');
      return;
    }
    if (cmd === '\\whoami' || cmd === 'whoami') {
      setMessages(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: `> SUBJECT: RAGHAV SETHI\n> TAGLINE: ${bio.title}\n> STATUS: ACTIVE_SEEKING_INNOVATION`, isSystem: true }
      ]);
      setInput('');
      return;
    }

    const newMessage = { role: 'user', content: userMessage };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const apiKey = process.env.REACT_APP_GROQ_API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `> REI_OFFLINE: I can still answer preset commands, but live AI responses need the portfolio API relay.` 
      }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: contextData || "You are Raghav's assistant." },
            ...newMessages.filter(m => !m.isSystem).map(m => ({ role: m.role, content: m.content }))
          ],
          stream: true,
          max_tokens: 500
        })
      });

      if (!response.ok) throw new Error("API call failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      let fullContent = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                const content = data.choices[0].delta.content;
                fullContent += content;
                updateStreamingContent(fullContent);
              }
            } catch (e) {
              // ignore parse errors for partial chunks
            }
          }
        }
      }

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: `> CONNECTION_ERROR: Internal server relay down. Connectivity to Raghav's neural engine limited.` }]);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    streamGroqResponse(input.trim());
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 left-5 z-[90] p-3 flex items-center justify-center bg-transparent border-none outline-none group"
        aria-label="Toggle AI Terminal"
        style={{ cursor: 'pointer' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-[#C8D8F0] opacity-70 group-hover:opacity-100 group-hover:text-[#B8960C] transition-all duration-300 sm:w-8 sm:h-8">
          <path d="M16 2L28.1244 9V23L16 30L3.87564 23V9L16 2Z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="1"/>
          <circle cx="16" cy="16" r="3" fill="currentColor" fillOpacity="0.8" />
          <path d="M16 8L16 12M16 20L16 24M8 16L12 16M20 16L24 16" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[#C8D8F0]/20 bg-[#050A18] h-[60vh] md:h-[50vh] shadow-[0_-20px_50px_rgba(5,10,24,0.8)] flex flex-col font-mono"
          >
            <div className="flex justify-between items-center px-6 py-3 border-b border-[#1A2744]">
              <div className="flex items-center gap-6">
                <span className="text-[10px] text-[#7A8EAB] tracking-[0.2em]">TERMINAL.SYS // RAGHAV_SETHI</span>
                <div className="hidden sm:flex items-center gap-4">
                  <button 
                    onClick={() => streamGroqResponse('\\help')}
                    className="text-[9px] text-[#B8960C]/60 hover:text-[#B8960C] transition-colors tracking-widest font-bold"
                  >
                    \HELP
                  </button>
                  <button 
                    onClick={() => streamGroqResponse('\\clear')}
                    className="text-[9px] text-[#B8960C]/60 hover:text-[#B8960C] transition-colors tracking-widest font-bold"
                  >
                    \CLEAR
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs text-[#8BA3C7] hover:text-[#EEF2F9]"
              >
                [X]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative">
              {/* Scanline and boot effects removed for modern look */}
              
              <div className="absolute top-2 right-4 flex items-center gap-2 opacity-30 select-none pointer-events-none">
                <div className="h-1.5 w-1.5 rounded-full bg-[#B8960C] animate-pulse" />
                <span className="text-[8px] tracking-[0.2em] text-[#B8960C]">ASK ABOUT PROJECTS</span>
              </div>

              {messages.map((msg, idx) => (
                <div key={idx} className={`max-w-[90%] ${msg.role === 'user' ? 'self-end text-right' : 'self-start text-left'}`}>
                  {msg.role === 'user' ? (
                    <span className="text-[11px] block whitespace-pre-wrap leading-relaxed">
                      <span className="text-[#B8960C] font-bold">raghav@portfolio:~$ </span>
                      <span className="text-[#E6D08A]">{msg.content}</span>
                    </span>
                  ) : (
                    <span className={`text-[11px] sm:text-[12px] block whitespace-pre-wrap leading-relaxed terminal-glow ${msg.isInitial ? 'text-[#B8960C] font-medium' : ''}`}>
                      {!msg.isInitial && <span className="text-[#B8960C] font-bold mr-2">{'>'}</span>}
                      <span className={msg.isInitial ? 'text-[#B8960C]' : 'text-[#EEF2F9]'}>
                        {msg.content}
                      </span>
                    </span>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="self-start">
                   <div className="terminal-cursor" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-6 pb-2">
               {messages.length === 1 && (
                 <div className="flex flex-wrap gap-2 mb-4">
                   {SUGGESTIONS.map(sug => (
                     <button
                       key={sug}
                       onClick={() => streamGroqResponse(sug)}
                       className="text-[10px] text-[#8BA3C7] border border-[#1A2744] hover:border-[#B8960C]/50 bg-[#0B1428] px-3 py-1 transition-colors"
                     >
                       {sug}
                     </button>
                   ))}
                 </div>
               )}

              <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#1A2744] pt-4 pb-4">
                <span className="text-[#B8960C] text-[10px] sm:text-xs whitespace-nowrap shrink-0">raghav@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask a question..."
                  className="w-full bg-transparent border-none outline-none text-[#EEF2F9] text-[11px] sm:text-xs font-mono placeholder:text-[#1A2744] disabled:opacity-50"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AITerminal;

