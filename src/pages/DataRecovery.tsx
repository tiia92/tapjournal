import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, } from '@/components/ui/card';
import { toast } from 'sonner';
import { Download, Eye, Trash2 } from 'lucide-react';

const DataRecovery = () => {
  const [localStorageData, setLocalStorageData] = useState<any>({});
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    // Load all localStorage data
    const data: any = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          const value = localStorage.getItem(key);
          data[key] = value ? JSON.parse(value) : value;
        } catch {
          data[key] = localStorage.getItem(key);
        }
      }
    }
    setLocalStorageData(data);
  }, []);

  const exportData = () => {
    const dataStr = JSON.stringify(localStorageData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tapjournal-data-backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all local data? This cannot be undone.')) {
      localStorage.clear();
      setLocalStorageData({});
      toast.success('All local data cleared');
    }
  };

  const journalEntries = localStorageData['journal-entries'] || [];
  const goals = localStorageData['journal-goals'] || [];

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Data Recovery</h1>
          <p className="text-muted-foreground">
            Access and export your locally stored TapJournal data
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{journalEntries.length}</div>
                <div className="text-sm text-muted-foreground">Journal Entries</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{goals.length}</div>
                <div className="text-sm text-muted-foreground">Goals</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{Object.keys(localStorageData).length}</div>
                <div className="text-sm text-muted-foreground">Storage Keys</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(JSON.stringify(localStorageData).length / 1024)}KB
                </div>
                <div className="text-sm text-muted-foreground">Data Size</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={exportData} className="flex items-center gap-2">
                <Download size={16} />
                Export All Data
              </Button>
              <Button 
                onClick={() => setShowData(!showData)} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Eye size={16} />
                {showData ? 'Hide' : 'View'} Raw Data
              </Button>
              <Button 
                onClick={clearAllData} 
                variant="destructive" 
                className="flex items-center gap-2"
              >
                <Trash2 size={16} />
                Clear All Data
              </Button>
            </div>
          </Card>

          {showData && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Raw Local Storage Data</h2>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                {JSON.stringify(localStorageData, null, 2)}
              </pre>
            </Card>
          )}

          {journalEntries.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Journal Entries</h2>
              <div className="space-y-3 max-h-64 overflow-auto">
                {journalEntries.slice(-5).reverse().map((entry: any, index: number) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium">{entry.date}</div>
                    {entry.mood && <div className="text-sm text-muted-foreground">Mood: {entry.mood}/10</div>}
                    {entry.notes && <div className="text-sm mt-1">{entry.notes.substring(0, 100)}...</div>}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Back to App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataRecovery;