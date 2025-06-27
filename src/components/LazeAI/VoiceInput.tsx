import React, { useCallback, useRef, useState } from 'react'
import { HiOutlineMicrophone } from 'react-icons/hi2';
import { MdOutlineMicOff } from 'react-icons/md';

interface VoiceInputProps {
    onResult: (text: string) => void;
    disabled?: boolean;
}

const VoiceInput = ({ onResult, disabled }: VoiceInputProps) => {
    const [isRecording, setIsRecording] = useState(false);
    // const [stream, setStream] = useState<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    // useEffect(() => {
    //     async function setupMicrophone() {
    //         try {
    //             const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //             setStream(audioStream);
    //         } catch (error) {
    //             console.error('Error accessing microphone:', error);
    //         }
    //     }
    //     setupMicrophone();

    //     return () => {
    //         if (stream) {
    //             stream.getTracks().forEach(track => track.stop());
    //         }
    //     };
    // }, []);

    const sendToOpenAI = async (audioBlob: Blob) => {
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.webm');
        formData.append('model', 'whisper-1');

        try {
            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            onResult(data.text);
        } catch (error) {
            console.error('Error sending audio to OpenAI:', error);
        }
    };

    const startRecording = useCallback(async () => {
        audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

        chunksRef.current = [];
        const mediaRecorder = new MediaRecorder(audioStreamRef.current);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
            chunksRef.current = [];
            sendToOpenAI(audioBlob);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            audioStreamRef.current?.getTracks().forEach(track => track.stop());
            audioStreamRef.current = null;
        }
    }, []);

    const toggleRecording = useCallback(() => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }, [isRecording, startRecording, stopRecording]);

    return (
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-[#2A2D34] border-none outline-none ml-1 cursor-pointer" onClick={toggleRecording} disabled={disabled}>
            {isRecording ? <HiOutlineMicrophone className="text-[#3A3D46] dark:text-white w-5 h-5" /> : <MdOutlineMicOff className="text-[#3A3D46] dark:text-white w-5 h-5" />}
        </button>
    )
}

export default VoiceInput