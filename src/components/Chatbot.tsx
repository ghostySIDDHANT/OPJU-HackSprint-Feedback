
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  Send, 
  AlertTriangle, 
  X, 
  ChevronDown, 
  ChevronUp,
  Bot,
  MinusCircle,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  automaticallyCategorizeIssue,
  estimatePriority,
  analyzeSentiment 
} from '@/utils/aiServices';
import { toast } from 'sonner';

// Message types
type MessageType = 'user' | 'bot' | 'system';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

interface ChatbotProps {
  onClose?: () => void;
}

const Chatbot = ({ onClose }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReportMode, setIsReportMode] = useState(false);
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    category: '',
    priority: ''
  });
  
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add initial message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          type: 'bot',
          text: "👋 Hi there! I'm your Sahayak. How can I help you today? You can report an issue, provide feedback, or ask questions about the platform.",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage = {
      id: userMessageId,
      type: 'user' as MessageType,
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSubmitting(true);
    
    try {
      if (isReportMode) {
        // Handle report mode input based on current state
        await handleReportModeInput(inputValue);
      } else {
        // Regular chat mode
        await processMessage(inputValue);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'system',
        text: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const processMessage = async (message: string) => {
    // Simple keyword detection for report creation
    const lowerMsg = message.toLowerCase();
    
    if (
      lowerMsg.includes('report') || 
      lowerMsg.includes('issue') || 
      lowerMsg.includes('problem')
    ) {
      // Start report mode
      setIsReportMode(true);
      setReportData({
        title: '',
        description: '',
        category: '',
        priority: ''
      });
      
      // Send bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          text: "I'll help you report an issue. First, what's a brief title for this issue?",
          timestamp: new Date()
        }]);
      }, 500);
      
      return;
    }
    
    if (
      lowerMsg.includes('feedback') || 
      lowerMsg.includes('suggest') || 
      lowerMsg.includes('opinion')
    ) {
      // Direct to feedback page
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          text: "I'd be happy to help you provide feedback. Would you like to go to the feedback page now?",
          timestamp: new Date()
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'bot',
            text: "Just click 'Yes' to go to the feedback form.",
            timestamp: new Date()
          }]);
          
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              type: 'system',
              text: `<button class="px-4 py-2 bg-primary text-white rounded-md" id="go-to-feedback">Yes, take me there</button>`,
              timestamp: new Date()
            }]);
            
            // Add event listener after render
            setTimeout(() => {
              document.getElementById('go-to-feedback')?.addEventListener('click', () => {
                navigate('/feedback');
                if (onClose) onClose();
              });
            }, 0);
          }, 500);
        }, 800);
      }, 500);
      
      return;
    }
    
    // General FAQ responses
    setTimeout(() => {
      let response = "I'm not sure how to help with that. You can report an issue, provide feedback, or track status of your previous submissions.";
      
      if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        response = "Hello! How can I assist you today?";
      } else if (lowerMsg.includes('thank')) {
        response = "You're welcome! Is there anything else I can help you with?";
      } else if (lowerMsg.includes('track') || lowerMsg.includes('status')) {
        response = "You can track the status of your reports on the Track Status page. Would you like to go there now?";
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'system',
            text: `<button class="px-4 py-2 bg-primary text-white rounded-md" id="go-to-track">Yes, check status</button>`,
            timestamp: new Date()
          }]);
          
          setTimeout(() => {
            document.getElementById('go-to-track')?.addEventListener('click', () => {
              navigate('/track');
              if (onClose) onClose();
            });
          }, 0);
        }, 500);
      }
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      }]);
    }, 800);
  };
  
  const handleReportModeInput = async (input: string) => {
    // Process input based on current report state
    if (!reportData.title) {
      // First input is the title
      setReportData(prev => ({ ...prev, title: input }));
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          text: "Thanks! Now, please provide a detailed description of the issue.",
          timestamp: new Date()
        }]);
      }, 600);
    } 
    else if (!reportData.description) {
      // Second input is the description
      const description = input;
      
      // Use AI to categorize and set priority
      const category = automaticallyCategorizeIssue(reportData.title, description);
      const priority = estimatePriority(reportData.title, description);
      
      setReportData(prev => ({ 
        ...prev, 
        description,
        category,
        priority
      }));
      
      // Show AI-generated categorization
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          text: `Based on your description, I've categorized this as a ${category.toUpperCase()} issue with ${priority.toUpperCase()} priority.`,
          timestamp: new Date()
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'bot',
            text: "Would you like to submit this report now?",
            timestamp: new Date()
          }]);
          
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              type: 'system',
              text: `
                <div class="flex space-x-2">
                  <button class="px-4 py-2 bg-primary text-white rounded-md" id="submit-report">Submit Report</button>
                  <button class="px-4 py-2 bg-secondary text-primary rounded-md" id="cancel-report">Cancel</button>
                </div>
              `,
              timestamp: new Date()
            }]);
            
            // Add event listeners after render
            setTimeout(() => {
              document.getElementById('submit-report')?.addEventListener('click', handleSubmitReport);
              document.getElementById('cancel-report')?.addEventListener('click', handleCancelReport);
            }, 0);
          }, 600);
        }, 800);
      }, 600);
    }
  };
  
  const handleSubmitReport = () => {
    // Simulate report submission
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        text: "📝 Your report has been submitted successfully! You can track its status in the Track Status page.",
        timestamp: new Date()
      }]);
      
      // Reset report mode
      setIsReportMode(false);
      setReportData({
        title: '',
        description: '',
        category: '',
        priority: ''
      });
      
      // Show toast notification
      toast.success('Report Submitted', {
        description: 'Your issue has been reported successfully.',
      });
      
      // Offer to go to track status page
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'system',
          text: `<button class="px-4 py-2 bg-primary text-white rounded-md" id="go-to-track-after">Go to Track Status</button>`,
          timestamp: new Date()
        }]);
        
        setTimeout(() => {
          document.getElementById('go-to-track-after')?.addEventListener('click', () => {
            navigate('/track');
            if (onClose) onClose();
          });
        }, 0);
      }, 800);
    }, 1000);
  };
  
  const handleCancelReport = () => {
    setIsReportMode(false);
    setReportData({
      title: '',
      description: '',
      category: '',
      priority: ''
    });
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'bot',
      text: "I've cancelled the report. How else can I help you today?",
      timestamp: new Date()
    }]);
  };
  
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChatbot}
          className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </Button>
      </div>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isMinimized 
              ? { opacity: 1, y: 0, scale: 0.95, height: '60px' }
              : { opacity: 1, y: 0, scale: 1, height: 'auto' }
            }
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-md rounded-lg shadow-2xl bg-card border z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div 
              className="p-4 border-b bg-primary text-primary-foreground flex items-center justify-between cursor-pointer"
              onClick={toggleMinimize}
            >
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <h3 className="font-medium">Sahayak</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={toggleMinimize} className="p-1 hover:bg-primary-foreground/10 rounded-full">
                  {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="h-[350px] overflow-y-auto p-4 bg-secondary/10"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${
                        message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : message.type === 'system'
                            ? 'bg-secondary/30'
                            : 'bg-muted rounded-tl-none'
                        }`}
                      >
                        {message.type === 'system' ? (
                          <div dangerouslySetInnerHTML={{ __html: message.text }} />
                        ) : (
                          <p>{message.text}</p>
                        )}
                        <div className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Chat Input */}
            {!isMinimized && (
              <div className="p-4 border-t bg-card">
                <div className="flex space-x-2">
                  <Input
                    placeholder={
                      isReportMode 
                        ? (!reportData.title 
                          ? "Enter issue title..." 
                          : "Enter issue description...")
                        : "Type a message..."
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                  <Button 
                    size="icon"
                    onClick={handleSend}
                    disabled={isSubmitting || !inputValue.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
