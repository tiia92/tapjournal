
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Trash2, Play, Pause, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useJournal } from '@/context/JournalContext';
import { toast } from 'sonner';

// Define interface for SpeechRecognition API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onerror: (event: any) => void;
  onend: (event: any) => void;
  onresult: (event: any) => void;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    isFinal: boolean;
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

interface VoiceJournalProps {
  entryId: string;
  audioUrl?: string;
  transcription?: string;
}

const VoiceJournal: React.FC<VoiceJournalProps> = ({ entryId, audioUrl }) => {
  const { user } = useAuth();
  const { saveAudioToEntry } = useJournal();
  const isPremium = user?.isPremium || false;
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);
  
  const startRecording = async () => {
    audioChunksRef.current = [];
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        
        // Create a URL for the audio blob
        const audioUrl = URL.createObjectURL(audioBlob);
        saveAudioToEntry(entryId, audioUrl);
        
        // Stop all tracks on the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access your microphone');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      toast.success('Voice note recorded');
    }
  };
  
  const handleTogglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleDeleteRecording = () => {
    saveAudioToEntry(entryId, '');
    setAudioBlob(null);
    toast.success('Voice note deleted');
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [audioUrl]);
  
  if (!isPremium) {
    return (
      <div className="flex flex-col items-center justify-center py-4 bg-muted/30 rounded-lg">
        <Lock className="w-6 h-6 text-muted-foreground mb-2" />
        <h3 className="text-sm font-medium">Voice Journal</h3>
        <div className="text-primary text-xs mt-2">
          Premium Feature
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-muted-foreground">Voice Journal</h4>
        {audioUrl && !isRecording && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDeleteRecording}
            className="text-muted-foreground hover:text-destructive h-7 px-2"
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>
      
      {!audioUrl && !audioBlob ? (
        <div className="flex flex-col items-center justify-center py-4 border border-dashed rounded-lg border-border">
          {isRecording ? (
            <div className="text-center mb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                <span className="text-destructive font-medium">Recording...</span>
              </div>
              <div className="text-sm mb-4">
                {formatTime(recordingTime)}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={stopRecording}
                className="rounded-full"
              >
                <MicOff size={14} className="mr-1" />
                Stop Recording
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={startRecording}
              className="rounded-full"
            >
              <Mic size={14} className="mr-1" />
              Record Voice Note
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTogglePlayback}
            className="rounded-full w-10 h-10 p-0"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          
          <div className="text-sm text-muted-foreground flex-1 ml-3">
            {isPlaying ? 'Playing voice note...' : 'Voice note recorded'}
          </div>
          
          <audio
            ref={audioRef}
            src={audioUrl || ''}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default VoiceJournal;
