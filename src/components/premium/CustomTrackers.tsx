
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface CustomTracker {
  id: string;
  name: string;
  emoji: string;
  type: 'counter' | 'yes-no' | 'scale';
}

const CustomTrackers: React.FC = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium || false;
  const [trackers, setTrackers] = useState<CustomTracker[]>(() => {
    const saved = localStorage.getItem('customTrackers');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [newTracker, setNewTracker] = useState<Omit<CustomTracker, 'id'>>({
    name: '',
    emoji: '📊',
    type: 'counter',
  });

  // Common emojis that could be used for tracking
  const commonEmojis = ['📊', '🏃‍♂️', '🍽️', '🚰', '💧', '☕', '💊', '💤', '😊', '📚', '💰', '🧘‍♀️'];

  const handleAddTracker = () => {
    if (!newTracker.name.trim()) {
      toast.error('Please enter a name for your tracker');
      return;
    }

    const tracker: CustomTracker = {
      ...newTracker,
      id: Date.now().toString(),
    };

    const updatedTrackers = [...trackers, tracker];
    setTrackers(updatedTrackers);
    localStorage.setItem('customTrackers', JSON.stringify(updatedTrackers));
    setNewTracker({ name: '', emoji: '📊', type: 'counter' });
    setShowForm(false);
    toast.success(`"${tracker.name}" tracker created`);
  };

  const handleDeleteTracker = (id: string) => {
    const updatedTrackers = trackers.filter(tracker => tracker.id !== id);
    setTrackers(updatedTrackers);
    localStorage.setItem('customTrackers', JSON.stringify(updatedTrackers));
    toast.success('Tracker deleted');
  };

  if (!isPremium) {
    return (
      <div className="tap-card flex flex-col items-center justify-center py-8 bg-muted/30">
        <Plus className="w-10 h-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">Custom Trackers</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 max-w-sm">
          Create your own categories to track anything that matters to you
        </p>
        <div className="text-primary text-sm mt-4">
          Premium Feature
        </div>
      </div>
    );
  }

  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-2">Custom Trackers</h3>
      <p className="text-sm text-muted-foreground mb-4">Create your own tracking categories</p>
      
      {trackers.length > 0 ? (
        <div className="space-y-2 mb-4">
          {trackers.map(tracker => (
            <div 
              key={tracker.id} 
              className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg"
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">{tracker.emoji}</span>
                <div>
                  <div className="font-medium">{tracker.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {tracker.type === 'counter' ? 'Count tracking' : 
                     tracker.type === 'yes-no' ? 'Yes/No tracking' : 'Scale tracking'}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleDeleteTracker(tracker.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 p-4 rounded-lg text-center text-muted-foreground mb-4">
          No custom trackers yet
        </div>
      )}
      
      {showForm ? (
        <div className="space-y-3 border rounded-lg p-3">
          <div>
            <label className="block text-sm font-medium mb-1">Tracker Name</label>
            <Input 
              value={newTracker.name} 
              onChange={e => setNewTracker({...newTracker, name: e.target.value})} 
              placeholder="E.g., Caffeine Intake"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Emoji</label>
            <div className="grid grid-cols-6 gap-2">
              {commonEmojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setNewTracker({...newTracker, emoji})}
                  className={`text-xl p-2 rounded-md ${
                    newTracker.emoji === emoji ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tracker Type</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setNewTracker({...newTracker, type: 'counter'})}
                className={`p-2 text-sm rounded-md ${
                  newTracker.type === 'counter' ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary'
                }`}
              >
                Counter
              </button>
              <button
                onClick={() => setNewTracker({...newTracker, type: 'yes-no'})}
                className={`p-2 text-sm rounded-md ${
                  newTracker.type === 'yes-no' ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary'
                }`}
              >
                Yes/No
              </button>
              <button
                onClick={() => setNewTracker({...newTracker, type: 'scale'})}
                className={`p-2 text-sm rounded-md ${
                  newTracker.type === 'scale' ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary'
                }`}
              >
                Scale (1-5)
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddTracker} className="flex-1">
              Create Tracker
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          onClick={() => setShowForm(true)} 
          variant="outline" 
          className="w-full flex items-center justify-center"
        >
          <Plus size={16} className="mr-2" /> Add Custom Tracker
        </Button>
      )}
    </div>
  );
};

export default CustomTrackers;
