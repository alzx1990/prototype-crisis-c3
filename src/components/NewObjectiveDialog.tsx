import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { usePlanning } from '@/hooks/usePlanning';
import { Target } from 'lucide-react';
import { toast } from 'sonner';

const objectiveSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().trim().min(10, 'Description must be at least 10 characters').max(500),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  resources: z.string().trim(),
  incidentId: z.string().optional(),
});

type ObjectiveFormData = z.infer<typeof objectiveSchema>;

interface NewObjectiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewObjectiveDialog({ open, onOpenChange }: NewObjectiveDialogProps) {
  const { addObjective } = usePlanning();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ObjectiveFormData>({
    resolver: zodResolver(objectiveSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      resources: '',
      incidentId: '',
    },
  });

  const handleSubmit = async (data: ObjectiveFormData) => {
    setIsSubmitting(true);
    
    addObjective({
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: 'planned',
      resources: data.resources.split(',').map(r => r.trim()).filter(Boolean),
      tasks: [],
      incidentId: data.incidentId || undefined,
    });
    
    toast.success('Objective created successfully');
    form.reset();
    onOpenChange(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Create New Objective
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objective Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Strategic objective name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed objective description..." 
                      className="resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <select
                        className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground"
                        {...field}
                      >
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="incidentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linked Incident (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="INC-2024-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="resources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Resources</FormLabel>
                  <FormControl>
                    <Input placeholder="Alpha Team, Cyber Response (comma separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Objective'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
