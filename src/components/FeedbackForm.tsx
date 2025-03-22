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
import { Switch } from '@/components/ui/switch';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { analyzeSentiment } from '@/utils/aiServices';
import { Sparkles, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';

const categories = [
  { value: 'facilities', label: 'Facilities' },
  { value: 'course', label: 'Course Content' },
  { value: 'teaching', label: 'Teaching Quality' },
  { value: 'support', label: 'Student Support' },
  { value: 'other', label: 'Other' }
];

export default function FeedbackForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [sentiment, setSentiment] = useState<{
    score: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  useEffect(() => {
    const analyzeFeedbackSentiment = async () => {
      if (!feedback || feedback.length < 10) {
        setSentiment(null);
        return;
      }
      
      setIsAnalyzing(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const result = analyzeSentiment(feedback);
        setSentiment(result);
      } catch (error) {
        console.error("Error analyzing sentiment:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    const debounceTimer = setTimeout(() => {
      analyzeFeedbackSentiment();
    }, 800);
    
    return () => clearTimeout(debounceTimer);
  }, [feedback]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Feedback submitted successfully!', {
        description: isAnonymous ? 
          'Your feedback has been submitted anonymously.' : 
          'Thank you for your feedback.'
      });
      
      navigate('/');
    } catch (error) {
      toast.error('Failed to submit feedback', {
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
          <CardTitle>Provide Feedback</CardTitle>
          <CardDescription>
            Share your thoughts, suggestions, or experiences to help us improve.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Feedback Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Provide a brief title for your feedback"
              required
              className="form-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="text-2xl focus:outline-none transition-transform hover:scale-110"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(null)}
                >
                  {(hoveredRating !== null ? star <= hoveredRating : star <= rating) ? (
                    <StarFilledIcon className="h-8 w-8 text-amber-400" />
                  ) : (
                    <StarIcon className="h-8 w-8 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="feedback">Your Feedback</Label>
              {isAnalyzing ? (
                <div className="flex items-center space-x-1 text-xs">
                  <div className="animate-spin h-3 w-3 border-2 border-primary border-t-transparent rounded-full"></div>
                  <span>Analyzing sentiment...</span>
                </div>
              ) : sentiment && (
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-secondary/20 text-xs">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span className="font-medium">
                    {sentiment.sentiment === 'positive' && (
                      <span className="text-green-600 flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" /> Positive Sentiment
                      </span>
                    )}
                    {sentiment.sentiment === 'negative' && (
                      <span className="text-red-600 flex items-center">
                        <ThumbsDown className="h-3 w-3 mr-1" /> Negative Sentiment
                      </span>
                    )}
                    {sentiment.sentiment === 'neutral' && "Neutral Sentiment"}
                  </span>
                </div>
              )}
            </div>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts, suggestions, or experiences"
              rows={5}
              required
              className="form-input min-h-[120px]"
            />
            {sentiment && sentiment.sentiment === 'negative' && feedback.length > 20 && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md text-sm flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium">Priority Feedback Detected</p>
                  <p>We've identified this as potentially critical feedback that will be prioritized for review.</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
            <Label htmlFor="anonymous" className="cursor-pointer">
              Submit anonymously
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className={cn(isSubmitting && "opacity-80")}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
