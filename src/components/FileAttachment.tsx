
import React, { useRef, useState } from 'react';
import { PaperClip, X, File, Image, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useJournal } from '@/context/JournalContext';

interface FileAttachmentProps {
  entryId: string;
  attachments?: string[];
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ entryId, attachments = [] }) => {
  const { saveAttachmentToEntry } = useJournal();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    // In a real app, you would upload the file to storage
    // For demo purposes, we'll just create an object URL
    const fileUrl = URL.createObjectURL(file);
    
    // Small delay to simulate upload
    setTimeout(() => {
      saveAttachmentToEntry(entryId, fileUrl);
      setIsUploading(false);
      toast.success(`File "${file.name}" attached`);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 800);
  };

  const getFileIcon = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    
    // This is a simplified version - in a real app you'd do more sophisticated detection
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image size={16} className="text-blue-500" />;
    } else if (['mp4', 'webm', 'mov'].includes(extension || '')) {
      return <Video size={16} className="text-purple-500" />;
    } else if (['pdf', 'doc', 'docx', 'txt'].includes(extension || '')) {
      return <FileText size={16} className="text-red-500" />;
    } else {
      return <File size={16} className="text-gray-500" />;
    }
  };

  const getFileName = (url: string) => {
    // In a real app, you would store the original filename
    // Here we're just extracting from the URL
    const parts = url.split('/');
    return parts[parts.length - 1].substring(0, 15) + '...';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Attachments</h4>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,application/pdf,text/*,video/*"
        />
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="text-xs"
        >
          <PaperClip size={14} className="mr-1" />
          {isUploading ? 'Uploading...' : 'Attach File'}
        </Button>
      </div>
      
      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((url, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between bg-muted/30 p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                {getFileIcon(url)}
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  {getFileName(url)}
                </a>
              </div>
              <button className="text-muted-foreground hover:text-destructive">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileAttachment;
