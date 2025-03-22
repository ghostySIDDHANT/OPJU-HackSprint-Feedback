import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, ImagePlus, X, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { automaticallyCategorizeIssue, estimatePriority } from '@/utils/aiServices';

const categories = [
  { value: 'facilities', label: 'Facilities' },
  { value: 'academic', label: 'Academic' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'technical', label: 'Technical' },
  { value: 'other', label: 'Other' }
];

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

export default function ReportForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [useAI, setUseAI] = useState<boolean>(true);
  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string | null,
    priority: string | null
  }>({ category: null, priority: null });
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  useEffect(() => {
    const analyzeContent = async () => {
      if (!useAI || !title || !description || title.length < 3 || description.length < 10) return;
      
      setIsAnalyzing(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const suggestedCategory = automaticallyCategorizeIssue(title, description);
        const suggestedPriority = estimatePriority(title, description);
        
        setAiSuggestion({
          category: suggestedCategory,
          priority: suggestedPriority
        });
        
        if (!category) setCategory(suggestedCategory);
        if (!priority) setPriority(suggestedPriority);
      } catch (error) {
        console.error("Error during AI analysis:", error);
        toast.error("Couldn't analyze content", {
          description: "Please select category and priority manually."
        });
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    const debounceTimer = setTimeout(() => {
      analyzeContent();
    }, 1000);
    
    return () => clearTimeout(debounceTimer);
  }, [title, description, useAI]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Report submitted successfully!', {
        description: 'You will receive updates on your report status.'
      });
      
      navigate('/track');
    } catch (error) {
      toast.error('Failed to submit report', {
        description: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-blur-in">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
          <CardDescription>
            Fill out the form below to report an issue or problem you've encountered.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium">AI-powered categorization</span>
            </div>
            <button 
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                useAI 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted text-muted-foreground'
              }`}
              onClick={() => setUseAI(!useAI)}
            >
              {useAI ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Provide a brief title for the issue"
              required
              className="form-input"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem 
                      key={cat.value} 
                      value={cat.value}
                      className={cat.value === aiSuggestion.category ? "bg-primary/10" : ""}
                    >
                      {cat.label}
                      {cat.value === aiSuggestion.category && useAI && (
                        <span className="ml-2 text-primary text-xs">(AI suggested)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={priority} onValueChange={setPriority} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((pri) => (
                    <SelectItem 
                      key={pri.value} 
                      value={pri.value} 
                      className={pri.value === aiSuggestion.priority ? "bg-primary/10" : ""}
                    >
                      {pri.label}
                      {pri.value === aiSuggestion.priority && useAI && (
                        <span className="ml-2 text-primary text-xs">(AI suggested)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isAnalyzing && (
            <div className="bg-primary/5 text-primary rounded-md p-2 text-sm flex items-center space-x-2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span>Analyzing content...</span>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the issue"
              rows={5}
              required
              className="form-input min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Attach Image (Optional)</Label>
            {!imagePreview ? (
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label htmlFor="image" className="cursor-pointer flex flex-col items-center text-muted-foreground">
                  <ImagePlus className="h-8 w-8 mb-2" />
                  <span>Click to upload image</span>
                  <span className="text-xs">(PNG, JPG up to 5MB)</span>
                </Label>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border">
                <img src={imagePreview} alt="Preview" className="max-h-60 w-full object-contain" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full h-8 w-8"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className={cn(isSubmitting && "opacity-80")}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
