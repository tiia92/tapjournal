
import React, { useRef, useState } from 'react';
import { Paperclip, X, File, Image, Video, FileText, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useJournal } from '@/context/JournalContext';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface FileAttachmentProps {
  entryId: string;
  attachments?: string[];
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ entryId, attachments = [] }) => {
  const { saveAttachmentToEntry, removeAttachmentFromEntry } = useJournal();
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openImageDialog, setOpenImageDialog] = useState<string | null>(null);

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

  const handleRemoveAttachment = (url: string) => {
    removeAttachmentFromEntry(entryId, url);
    toast.success('File removed');
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

  const isImageFile = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
  };

  if (!isPremium) {
    return (
      <div className="tap-card flex flex-col items-center justify-center py-6 bg-muted/30">
        <Lock className="w-8 h-8 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">File Attachments</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 max-w-sm">
          Add images and documents to your journal entries
        </p>
        <div className="text-primary text-sm mt-4">
          Premium Feature
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-muted-foreground">Attachments</h4>
        
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
          <Paperclip size={14} className="mr-1" />
          {isUploading ? 'Uploading...' : 'Attach File'}
        </Button>
      </div>
      
      {/* Display images with proper dimensions */}
      {attachments.filter(url => isImageFile(url)).length > 0 && (
        <div className="space-y-3">
          <h5 className="text-sm font-medium">Images</h5>
          <div className="grid grid-cols-1 gap-3">
            {attachments.filter(url => isImageFile(url)).map((url, index) => (
              <div key={`img-${index}`} className="relative">
                <img 
                  src={url} 
                  alt={`Attachment ${index + 1}`}
                  className="rounded-md object-contain max-h-[500px]"
                  style={{ maxWidth: '500px' }}
                  onClick={() => setOpenImageDialog(url)}
                />
                <button 
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                  onClick={() => handleRemoveAttachment(url)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Other file types */}
      {attachments.filter(url => !isImageFile(url)).length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium">Files</h5>
          {attachments.filter(url => !isImageFile(url)).map((url, index) => (
            <div 
              key={`file-${index}`} 
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
              <button 
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveAttachment(url)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {attachments.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No files attached yet.</p>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={!!openImageDialog} onOpenChange={() => setOpenImageDialog(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
          {openImageDialog && (
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center p-4">
              <img 
                src={openImageDialog} 
                alt="Full size preview" 
                className="max-w-full max-h-full object-contain"
              />
              <button 
                onClick={() => setOpenImageDialog(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileAttachment;
