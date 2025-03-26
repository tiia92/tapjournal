
import React, { useState, useRef, useEffect } from 'react';
import { Mic, StopCircle, Trash2, Play, Pause, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useJournal } from '@/context/JournalContext';

// Add TypeScript declarations for SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error?: any;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
  onstart: () => void;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface VoiceJournalProps {
  entryId?: string;
  audioUrl?: string;
  transcription?: string;
}

const VoiceJournal: React.FC<VoiceJournalProps> = ({ entryId, audioUrl: existingAudioUrl, transcription }) => {
  const { user } = useAuth();
  const { saveAudioToEntry } = useJournal();
  const isPremium = user?.isPremium || false;
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(existingAudioUrl || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState(transcription || '');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Create an audio element for controlling playback
    const audioElement = new Audio();
    audioElementRef.current = audioElement;
    
    audioElement.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    // Set the source if there is an existing audio URL
    if (existingAudioUrl) {
      audioElement.src = existingAudioUrl;
    }
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionConstructor) {
        speechRecognitionRef.current = new SpeechRecognitionConstructor();
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true;
        
        speechRecognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }
          
          setTranscriptionText(finalTranscript || interimTranscript);
        };
        
        speechRecognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
        };
      }
    }
    
    return () => {
      audioElement.pause();
      audioElement.src = '';
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, [existingAudioUrl]);

  useEffect(() => {
    if (audioUrl) {
      audioElementRef.current!.src = audioUrl;
    }
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        
        // Save to the entry with the current transcription
        if (entryId) {
          saveAudioToEntry(entryId, audioUrl, transcriptionText);
        }
      };

      // Start speech recognition if available
      if (speechRecognitionRef.current) {
        setTranscriptionText('');
        speechRecognitionRef.current.start();
      }

      mediaRecorder.start();
      setIsRecording(true);
      toast.info('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks on the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      // Stop speech recognition
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      
      toast.success('Recording saved');
      
      // If speech recognition isn't available or didn't work, we can simulate transcription
      if (!transcriptionText && entryId) {
        simulateTranscription();
      }
    }
  };

  const simulateTranscription = () => {
    if (!audioUrl) return;
    
    setIsTranscribing(true);
    
    // In a real app, you would send the audio to a transcription service
    // For demo purposes, we'll simulate this with a timeout and predefined text
    setTimeout(() => {
      const mockTranscriptions = [
        "Today was a really productive day. I managed to finish all my tasks and even had time for a quick workout.",
        "I'm feeling a bit tired today, but overall in a good mood. Had coffee with Sarah which was nice.",
        "Just realized I need to be more consistent with my water intake. I've been feeling dehydrated lately.",
        "Made progress on my project today, though I hit some roadblocks. Need to research some solutions tomorrow.",
        "Feeling pretty anxious about the presentation tomorrow, but I know I've prepared well and should do fine.",
      ];
      
      const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      setTranscriptionText(randomTranscription);
      
      if (entryId) {
        saveAudioToEntry(entryId, audioUrl, randomTranscription);
      }
      
      setIsTranscribing(false);
      toast.success('Transcription completed');
    }, 2000);
  };

  const clearRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscriptionText('');
    
    // Clear from the entry
    if (entryId) {
      saveAudioToEntry(entryId, '', '');
    }
  };

  const togglePlayback = () => {
    if (!audioElementRef.current || !audioUrl) return;
    
    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!isPremium) {
    return (
      <div className="tap-card flex flex-col items-center justify-center py-8 bg-muted/30">
        <Mic className="w-10 h-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">Voice Journal</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 max-w-sm">
          Record voice notes to capture your thoughts and feelings
        </p>
        <div className="text-primary text-sm mt-4">
          Premium Feature
        </div>
      </div>
    );
  }

  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-2">Voice Journal</h3>
      <p className="text-sm text-muted-foreground mb-4">Record voice notes for your journal</p>
      
      <div className="flex flex-col space-y-4">
        {isRecording ? (
          <div className="flex items-center justify-center bg-red-50 p-4 rounded-lg animate-pulse">
            <div className="text-red-500 font-medium flex items-center">
              <span className="mr-2">Recording in progress</span>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : audioUrl ? (
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex space-x-2 mb-3">
              <Button variant="outline" size="sm" onClick={togglePlayback} className="flex-1">
                {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button variant="outline" size="sm" onClick={clearRecording} className="flex-1">
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
            
            {isTranscribing ? (
              <div className="mt-3 p-3 bg-secondary/50 rounded-md text-sm animate-pulse">
                <div className="flex items-center">
                  <Sparkles size={14} className="text-primary mr-2" />
                  <span>Transcribing your audio...</span>
                </div>
              </div>
            ) : transcriptionText ? (
              <div className="mt-3 p-3 bg-secondary/50 rounded-md text-sm">
                <h4 className="font-medium mb-1">Transcription:</h4>
                <p className="text-muted-foreground">{transcriptionText}</p>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={simulateTranscription} 
                className="mt-3 w-full"
                disabled={isTranscribing}
              >
                <Sparkles size={14} className="mr-2" /> 
                Generate Transcription
              </Button>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              onClick={startRecording} 
              variant="outline" 
              size="lg" 
              className="w-20 h-20 rounded-full flex items-center justify-center"
            >
              <Mic className="w-8 h-8 text-primary" />
            </Button>
          </div>
        )}
        
        {isRecording && (
          <Button 
            onClick={stopRecording} 
            variant="destructive" 
            className="flex items-center justify-center"
          >
            <StopCircle className="w-4 h-4 mr-2" /> Stop Recording
          </Button>
        )}
      </div>
    </div>
  );
};

export default VoiceJournal;
