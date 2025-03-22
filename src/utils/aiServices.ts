
/**
 * This file contains mock AI service functions for the Student Hub application.
 * In a real application, these would connect to an actual AI service.
 */

// Simulate AI-based categorization of issues based on title and description
export function automaticallyCategorizeIssue(title: string, description: string): string {
  const combinedText = `${title.toLowerCase()} ${description.toLowerCase()}`;
  
  if (combinedText.includes('wifi') || 
      combinedText.includes('internet') || 
      combinedText.includes('connection') ||
      combinedText.includes('computer') ||
      combinedText.includes('printer') ||
      combinedText.includes('login')) {
    return 'technical';
  }
  
  if (combinedText.includes('class') || 
      combinedText.includes('course') || 
      combinedText.includes('professor') ||
      combinedText.includes('lecture') ||
      combinedText.includes('exam') ||
      combinedText.includes('grade')) {
    return 'academic';
  }
  
  if (combinedText.includes('bathroom') || 
      combinedText.includes('ac') || 
      combinedText.includes('air conditioning') ||
      combinedText.includes('light') ||
      combinedText.includes('door') ||
      combinedText.includes('chair') ||
      combinedText.includes('desk') ||
      combinedText.includes('room')) {
    return 'facilities';
  }
  
  if (combinedText.includes('registration') || 
      combinedText.includes('payment') || 
      combinedText.includes('form') ||
      combinedText.includes('office') ||
      combinedText.includes('staff') ||
      combinedText.includes('administration')) {
    return 'administrative';
  }
  
  // Default category if no keywords match
  return 'other';
}

// Simulate AI-based priority estimation based on title and description
export function estimatePriority(title: string, description: string): string {
  const combinedText = `${title.toLowerCase()} ${description.toLowerCase()}`;
  
  // Urgent priority patterns
  if (combinedText.includes('emergency') || 
      combinedText.includes('urgent') || 
      combinedText.includes('immediately') ||
      combinedText.includes('dangerous') ||
      combinedText.includes('safety') ||
      combinedText.includes('fire') ||
      combinedText.includes('flood')) {
    return 'urgent';
  }
  
  // High priority patterns
  if (combinedText.includes('broken') || 
      combinedText.includes('not working') || 
      combinedText.includes('malfunction') ||
      combinedText.includes('can\'t access') ||
      combinedText.includes('important') ||
      combinedText.includes('deadline')) {
    return 'high';
  }
  
  // Medium priority patterns
  if (combinedText.includes('issue') || 
      combinedText.includes('problem') || 
      combinedText.includes('difficult') ||
      combinedText.includes('slow')) {
    return 'medium';
  }
  
  // Default priority is low
  return 'low';
}

// Simulate AI-based sentiment analysis
export function analyzeSentiment(text: string): { score: number; sentiment: 'positive' | 'neutral' | 'negative' } {
  // Count positive and negative keywords in the text
  const positiveKeywords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'best', 'love', 'happy', 'satisfied', 'helpful', 'impressive', 'thank', 'pleased', 'appreciate'];
  const negativeKeywords = ['bad', 'terrible', 'poor', 'awful', 'worst', 'hate', 'unhappy', 'unsatisfied', 'useless', 'disappointing', 'frustrating', 'angry', 'disappointed', 'problem', 'issue', 'complaint'];
  
  const lowerText = text.toLowerCase();
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      positiveScore += 1;
    }
  });
  
  negativeKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      negativeScore += 1;
    }
  });
  
  // Calculate sentiment score (-1 to 1)
  const totalKeywords = positiveScore + negativeScore;
  const score = totalKeywords === 0 ? 0 : (positiveScore - negativeScore) / totalKeywords;
  
  // Determine sentiment category
  let sentiment: 'positive' | 'neutral' | 'negative';
  
  if (score > 0.2) {
    sentiment = 'positive';
  } else if (score < -0.2) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  
  return {
    score: parseFloat(score.toFixed(2)),
    sentiment
  };
}
