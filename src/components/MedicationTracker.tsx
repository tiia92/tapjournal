
import React, { useState, useEffect } from 'react';
import { Pill, X, Plus, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Medication {
  id: string;
  name: string;
  taken: boolean;
}

interface MedicationTrackerProps {
  medications: Medication[];
  onChange: (medications: Medication[]) => void;
  previousMedications?: string[];
  onNoteChange?: (note: string) => void;
  note?: string;
}

const MedicationTracker: React.FC<MedicationTrackerProps> = ({
  medications,
  onChange,
  previousMedications = [],
  onNoteChange,
  note = '',
}) => {
  const [newMedicationName, setNewMedicationName] = useState('');
  const [availableMedications, setAvailableMedications] = useState<string[]>(previousMedications);

  useEffect(() => {
    // Filter out medications that are already in the list
    const existingMedNames = medications.map(med => med.name.toLowerCase());
    const filteredAvailable = previousMedications.filter(
      med => !existingMedNames.includes(med.toLowerCase())
    );
    setAvailableMedications(filteredAvailable);
  }, [medications, previousMedications]);

  const handleAddMedication = () => {
    if (!newMedicationName.trim()) return;
    
    const medicationExists = medications.some(
      med => med.name.toLowerCase() === newMedicationName.toLowerCase()
    );
    
    if (medicationExists) {
      toast.error('This medication is already in your list');
      return;
    }
    
    const newMedication: Medication = {
      id: crypto.randomUUID(),
      name: newMedicationName.trim(),
      taken: false,
    };
    
    onChange([...medications, newMedication]);
    setNewMedicationName('');
    
    // Remove this medication from available options
    setAvailableMedications(prev => 
      prev.filter(med => med.toLowerCase() !== newMedicationName.toLowerCase())
    );
  };

  const handleRemoveMedication = (id: string) => {
    const medicationToRemove = medications.find(med => med.id === id);
    if (medicationToRemove) {
      // Add removed medication back to available options
      setAvailableMedications(prev => [...prev, medicationToRemove.name]);
    }
    
    onChange(medications.filter(med => med.id !== id));
  };

  const handleToggleTaken = (id: string) => {
    onChange(
      medications.map(med =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  const handleSelectPreviousMedication = (name: string) => {
    const newMedication: Medication = {
      id: crypto.randomUUID(),
      name,
      taken: false,
    };
    
    onChange([...medications, newMedication]);
    
    // Remove selected medication from available options
    setAvailableMedications(prev => 
      prev.filter(med => med.toLowerCase() !== name.toLowerCase())
    );
  };

  return (
    <div className="tap-card">
      <h3 className="text-lg font-medium mb-3">Medication Tracker</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add medication name..."
            value={newMedicationName}
            onChange={(e) => setNewMedicationName(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleAddMedication}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Plus size={18} />
          </Button>
        </div>
        
        {availableMedications.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Previous medications:</p>
            <div className="flex flex-wrap gap-2">
              {availableMedications.map(med => (
                <button
                  key={med}
                  onClick={() => handleSelectPreviousMedication(med)}
                  className="bg-muted hover:bg-muted/80 text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
                >
                  <Pill size={12} />
                  {med}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-3 mt-4">
          {medications.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No medications added yet</p>
          ) : (
            medications.map((med) => (
              <div
                key={med.id}
                className="flex items-center justify-between p-3 rounded-md border bg-muted/30"
              >
                <div className="flex items-center gap-2">
                  <Pill className="text-primary" size={16} />
                  <span>{med.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleTaken(med.id)}
                    className={`tap-button w-9 h-9 flex items-center justify-center ${
                      med.taken ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {med.taken ? <Check size={16} /> : null}
                  </button>
                  <button
                    onClick={() => handleRemoveMedication(med.id)}
                    className="tap-button w-9 h-9 flex items-center justify-center hover:text-destructive"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {onNoteChange && (
          <div className="mt-4">
            <Textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Add a note about your medications..."
              className="resize-none text-sm"
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationTracker;
