'use client';
import React, { useRef, useState, useEffect } from 'react';
import { MdOutlineSend, MdContentCopy, MdThumbUp, MdThumbDown } from 'react-icons/md';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { enqueueSnackbar } from 'notistack';
import VoiceInput from './VoiceInput';
import { askLaze } from '@/api/laze';

const ChatBox = () => {
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
    const [input, setInput] = useState<string>('');
    const messageBoxRef = useRef<HTMLDivElement>(null);

    const handleSend = async (message: string) => {
        setMessages([
            ...messages,
            { role: 'user', content: message },
        ]);
        const response = await askLaze(message);
        if (response.success) {
            setMessages([
                ...messages,
                { role: 'assistant', content: response.data?.message || '' }
            ]);
        } else {
            setMessages([
                ...messages,
                { role: 'assistant', content: 'Bukayo Saka has scored 10 goals and provided 8 assists this season, while Phil Foden has 12 goals and 6 assists. Both have been instrumental for their teams, but Foden edges ahead in goals, while Saka leads in assists.' }
            ]);
        }
        setInput('');
        setTimeout(() => {
            messageBoxRef.current?.scrollTo({
                top: messageBoxRef.current?.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend(input);
        }
    }

    const handleSpeak = (text: string) => {
        console.log(window);

        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            const utterance = new window.SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.onstart = () => console.log("Speech started");
            utterance.onend = () => console.log("Speech ended");
            utterance.onerror = (e) => console.error("Speech error", e);
            window.speechSynthesis.speak(utterance);
        } else {
            enqueueSnackbar('Speech synthesis not supported in this browser.', { variant: 'error' });
        }
    };

    return (
        <div className={`bg-white dark:bg-[#121212] rounded-[4px] py-8 px-1 md:px-4 flex flex-col items-center ${messages.length > 0 ? 'justify-start' : 'justify-center'} h-[100%] w-full max-w-2xl mx-auto`}>
            {messages.length > 0 && <div className='w-full h-[82%] overflow-y-auto mb-3 pb-1 scroll-bar px-1' ref={messageBoxRef}>
                <Messages messages={messages} onSpeak={handleSpeak} />
            </div>}
            <div className="w-full flex flex-col items-center gap-6">
                {messages.length === 0 && <div className="flex flex-col items-center gap-2 w-full max-w-lg">
                    <span className="font-medium text-[20px] leading-[1.32em] text-[#1E1E1E] dark:text-white text-center font-sans">
                        Talk to Laze AI
                    </span>
                    <span className="font-normal text-[16px] leading-[1.32em] text-[#3A3D46] dark:text-[#b0b3bb] text-center font-sans">
                        Ask anything about football. Fixtures, player stats, predictions, and more — all in one place.
                    </span>
                </div>}
                <div className="bg-[#E4E6EC]/50 dark:bg-[#2A2D34] rounded-[8px] p-4 flex flex-col gap-[10px] w-full max-w-lg">
                    <span className="font-normal text-[10px] leading-[1.32em] text-[#7A7F8C] font-sans text-left">
                        Ask something like &lsquo;Who&rsquo;s leading La Liga?&rsquo; or &lsquo;Predict Arsenal vs Man City.&rsquo;
                    </span>
                    <div className="flex flex-row justify-end items-center gap-1 w-full">
                        <input
                            type="text"
                            placeholder="Type your question..."
                            className="flex-1 bg-transparent outline-none border-none text-[13px] text-[#1E1E1E] dark:text-white placeholder-[#7A7F8C] font-sans px-2 py-1"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <VoiceInput onResult={handleSend} />
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F9FAFB] dark:bg-[#1A1C20] border-none outline-none ml-1 cursor-pointer" onClick={() => handleSend(input)}>
                            <MdOutlineSend className="text-[#3A3D46] dark:text-white w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Messages = ({ messages, onSpeak }: { messages: Array<{ role: string, content: string }>, onSpeak: (text: string) => void }) => {
    const [typed, setTyped] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const typingSpeed = 18; // ms per character

    useEffect(() => {
        // Only animate the last assistant message
        if (messages.length === 0) return;
        const last = messages[messages.length - 1];
        if (last.role !== 'assistant') return;
        setTyped('');
        setIsTyping(true);
        let i = 0;
        const interval = setInterval(() => {
            setTyped(last.content.slice(0, i + 1));
            i++;
            if (i >= last.content.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, typingSpeed);
        return () => clearInterval(interval);
    }, [messages]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        enqueueSnackbar('Copied to clipboard', {
            variant: 'success',
            autoHideDuration: 3000,
        });
    };

    return (
        <div className="flex flex-col w-full gap-6 mt-4">
            {messages.map((message, index) => {
                // If this is the last assistant message, animate typing
                if (message.role === 'assistant' && index === messages.length - 1) {
                    return (
                        <div key={index} className="flex justify-start w-full">
                            <div className="max-w-[80%]">
                                <div className="bg-[#F9FAFB] dark:bg-[#23272f] rounded-[8px] shadow-sm px-4 py-3 flex flex-col gap-2">
                                    <span className="font-normal text-[14px] md:text-[16px] leading-[1.32em] text-[#7A7F8C] font-sans">
                                        {typed}
                                        {isTyping && <span className="animate-pulse">|</span>}
                                    </span>
                                    <div className="flex flex-row items-center gap-2 mt-1">
                                        <MdContentCopy className="w-5 h-5 text-[#3A3D46] dark:text-white cursor-pointer" onClick={() => handleCopy(message.content)} />
                                        <MdThumbUp className="w-5 h-5 text-[#3A3D46] dark:text-white cursor-pointer" />
                                        <MdThumbDown className="w-5 h-5 text-[#3A3D46] dark:text-white cursor-pointer" />
                                        <HiOutlineSpeakerWave className="w-5 h-5 text-[#3A3D46] dark:text-white cursor-pointer" onClick={() => onSpeak(message.content)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                if (message.role === 'assistant') {
                    return (
                        <div key={index} className="flex justify-start w-full">
                            <div className="max-w-[80%]">
                                <div className="bg-[#F9FAFB] dark:bg-[#23272f] rounded-[8px] shadow-sm px-4 py-3 flex flex-col gap-2">
                                    <span className="font-normal text-[14px] md:text-[16px] leading-[1.32em] text-[#7A7F8C] font-sans">
                                        {message.content}
                                    </span>
                                    <div className="flex flex-row items-center gap-2 mt-1">
                                        <MdContentCopy className="w-5 h-5 text-[#3A3D46] dark:text-white cursor-pointer" onClick={() => handleCopy(message.content)} />
                                        <MdThumbUp className="w-5 h-5 text-[#3A3D46] dark:text-white cursor-pointer" />
                                        <MdThumbDown className="w-5 h-5 text-[#3A3D46] dark:text-white cursor-pointer" />
                                        <HiOutlineSpeakerWave className="w-5 h-5 text-[#3A3D46] dark:text-white cursor-pointer" onClick={() => onSpeak(message.content)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                // User message
                return (
                    <div key={index} className="flex justify-end w-full">
                        <div className="relative max-w-[80%]">
                            <div className="bg-[#E4E6EC] dark:bg-[#23272f] rounded-[8px] shadow-sm px-4 py-3 flex flex-col gap-2">
                                <span className="font-normal text-[14px] md:text-[16px] leading-[1.32em] text-[#1E1E1E] dark:text-white font-sans">
                                    {message.content}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatBox;