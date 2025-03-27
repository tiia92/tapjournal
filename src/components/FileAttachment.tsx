
import React, { useState } from 'react';
import { useJournal } from '@/context/JournalContext';
import { Paperclip, X, FileText, Image, File } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface FileAttachmentProps {
  entryId: string;
  attachments?: string[];
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ entryId, attachments = [] }) => {
  const { user } = useAuth();
  const { saveAttachmentToEntry, removeAttachmentFromEntry } = useJournal();
  const [isUploading, setIsUploading] = useState(false);
  const isPremium = user?.isPremium || false;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 5MB.');
      return;
    }
    
    const reader = new FileReader();
    setIsUploading(true);
    
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        // In a real app, you'd upload this to a server
        // For demo purposes, we'll just store the data URL
        const fileUrl = event.target.result.toString();
        saveAttachmentToEntry(entryId, fileUrl);
        toast.success('File attached successfully');
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      toast.error('Error uploading file');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveAttachment = (url: string) => {
    removeAttachmentFromEntry(entryId, url);
    toast.success('Attachment removed');
  };

  const getFileIcon = (url: string) => {
    if (url.startsWith('data:image')) {
      return <Image size={16} />;
    } else if (url.startsWith('data:text')) {
      return <FileText size={16} />;
    } else {
      return <File size={16} />;
    }
  };

  const getFileName = (url: string, index: number) => {
    if (url.startsWith('data:image')) {
      return `Image ${index + 1}`;
    } else if (url.startsWith('data:text')) {
      return `Document ${index + 1}`;
    } else {
      return `File ${index + 1}`;
    }
  };

  const openAttachment = (url: string) => {
    window.open(url, '_blank');
  };

  if (!isPremium) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
          <Paperclip size={16} />
          Attachments
        </span>
      </div>
      
      <div className="space-y-2">
        {attachments.map((url, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
          >
            <button 
              className="flex items-center gap-2 text-sm text-left flex-grow"
              onClick={() => openAttachment(url)}
            >
              {getFileIcon(url)}
              <span>{getFileName(url, index)}</span>
            </button>
            <button 
              onClick={() => handleRemoveAttachment(url)}
              className="p-1 hover:bg-muted rounded-full"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        {attachments.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No attachments</p>
        )}
        
        <label className="mt-2 cursor-pointer flex items-center justify-center w-full py-2 bg-muted/50 hover:bg-muted rounded-md transition-colors">
          <input 
            type="file" 
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <Paperclip size={16} className="mr-2" />
          <span className="text-sm">{isUploading ? 'Uploading...' : 'Add attachment'}</span>
        </label>
      </div>
    </div>
  );
};

export default FileAttachment;
