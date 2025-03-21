
import React, { useState, useRef } from 'react';
import { Mic, StopCircle, Trash2, Play, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const VoiceJournal: React.FC = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
      };

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
      toast.success('Recording saved');
    }
  };

  const clearRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
  };

  const saveRecording = () => {
    if (!audioBlob) return;
    
    // Create a download link
    const a = document.createElement('a');
    a.href = audioUrl as string;
    a.download = `voice-note-${new Date().toISOString()}.mp3`;
    a.click();
    toast.success('Voice note downloaded');
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
            <audio src={audioUrl} controls className="w-full mb-3" />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={clearRecording} className="flex-1">
                <Trash2 className="w-4 h-4 mr-1" /> Discard
              </Button>
              <Button variant="default" size="sm" onClick={saveRecording} className="flex-1">
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
            </div>
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
