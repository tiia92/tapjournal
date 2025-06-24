
import React, { useState, useEffect } from 'react';
import { Check, X, Plus, ListChecks, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskTrackerProps {
  tasks: Task[];
  onChange: (tasks: Task[]) => void;
  previousTasks?: string[];
  deletedTasks?: string[];
  onDeletePreviousTask?: (taskName: string) => void;
  icon: React.ReactNode;
  label: string;
}

const TaskTracker: React.FC<TaskTrackerProps> = ({
  tasks,
  onChange,
  previousTasks = [],
  deletedTasks = [],
  onDeletePreviousTask,
  icon,
  label
}) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [availableTasks, setAvailableTasks] = useState<string[]>(previousTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [allHistoricalTasks, setAllHistoricalTasks] = useState<string[]>([]);

  useEffect(() => {
    // Combine previous tasks and deleted tasks for search
    const allTasks = [...previousTasks, ...deletedTasks];
    const uniqueTasks = Array.from(new Set(allTasks));
    setAllHistoricalTasks(uniqueTasks);

    // Filter out tasks that are already in the list
    const existingTaskNames = tasks.map(task => task.name.toLowerCase());
    const filteredAvailable = previousTasks.filter(
      task => !existingTaskNames.includes(task.toLowerCase())
    );
    setAvailableTasks(filteredAvailable);
  }, [tasks, previousTasks, deletedTasks]);

  const handleAddTask = () => {
    if (!newTaskName.trim()) return;
    
    const taskExists = tasks.some(
      task => task.name.toLowerCase() === newTaskName.toLowerCase()
    );
    
    if (taskExists) {
      toast.error('This task is already in your list');
      return;
    }
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: newTaskName.trim(),
      completed: false,
    };
    
    onChange([...tasks, newTask]);
    setNewTaskName('');
    
    // Remove this task from available options
    setAvailableTasks(prev => 
      prev.filter(task => task.toLowerCase() !== newTaskName.toLowerCase())
    );
  };

  const handleRemoveTask = (id: string) => {
    const taskToRemove = tasks.find(task => task.id === id);
    if (taskToRemove) {
      // Add removed task back to available options
      setAvailableTasks(prev => [...prev, taskToRemove.name]);
    }
    
    onChange(tasks.filter(task => task.id !== id));
  };

  const handleToggleCompleted = (id: string) => {
    onChange(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSelectPreviousTask = (name: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      completed: false,
    };
    
    onChange([...tasks, newTask]);
    
    // Remove selected task from available options
    setAvailableTasks(prev => 
      prev.filter(task => task.toLowerCase() !== name.toLowerCase())
    );
  };

  const handleDeletePreviousTask = (taskName: string) => {
    if (onDeletePreviousTask) {
      onDeletePreviousTask(taskName);
      toast.success(`"${taskName}" won't appear in future suggestions`);
      
      // Remove from available tasks immediately
      setAvailableTasks(prev => 
        prev.filter(task => task.toLowerCase() !== taskName.toLowerCase())
      );
    }
  };

  // Filter tasks based on search query
  const filteredHistoricalTasks = allHistoricalTasks.filter(task =>
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailableTasks = availableTasks.filter(task =>
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tap-card flex flex-col items-center gap-3 animate-fade-in">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 text-4xl">
        {icon}
      </div>
      
      <div className="w-full space-y-4 mt-1">
        <div className="flex gap-2">
          <Input
            placeholder={`Add ${label.toLowerCase()}...`}
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="flex-1"
          />
          <Button 
            onClick={handleAddTask}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Plus size={18} />
          </Button>
        </div>
        
        {(availableTasks.length > 0 || allHistoricalTasks.length > 0) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Previous {label.toLowerCase()}:</p>
              {allHistoricalTasks.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1">
                  <Search size={12} />
                  <Input
                    placeholder="Search all..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent text-xs h-auto p-0 min-w-0 w-20 focus-visible:ring-0"
                  />
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(searchQuery ? filteredAvailableTasks : availableTasks).map(task => (
                <div key={task} className="flex items-center gap-1">
                  <button
                    onClick={() => handleSelectPreviousTask(task)}
                    className="bg-muted hover:bg-muted/80 text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
                  >
                    <ListChecks size={12} />
                    {task}
                  </button>
                  {onDeletePreviousTask && (
                    <button
                      onClick={() => handleDeletePreviousTask(task)}
                      className="w-5 h-5 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                      title="Remove from suggestions"
                    >
                      <X size={10} />
                    </button>
                  )}
                </div>
              ))}
              
              {searchQuery && filteredHistoricalTasks.length > filteredAvailableTasks.length && (
                <>
                  {filteredHistoricalTasks
                    .filter(task => !filteredAvailableTasks.includes(task))
                    .map(task => (
                    <div key={`deleted-${task}`} className="flex items-center gap-1">
                      <button
                        onClick={() => handleSelectPreviousTask(task)}
                        className="bg-red-100 hover:bg-red-200 text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-colors text-red-700"
                        title="This task was removed from suggestions"
                      >
                        <ListChecks size={12} />
                        {task}
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No {label.toLowerCase()} added yet</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-md border bg-muted/30"
              >
                <div className="flex items-center gap-2">
                  <ListChecks className="text-primary" size={16} />
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>{task.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleCompleted(task.id)}
                    className={`tap-button w-9 h-9 flex items-center justify-center ${
                      task.completed ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {task.completed ? <Check size={16} /> : null}
                  </button>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="tap-button w-9 h-9 flex items-center justify-center hover:text-destructive"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;
