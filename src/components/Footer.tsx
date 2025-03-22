
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/30 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">StudentHub</h3>
            <p className="text-sm text-muted-foreground">
              Making campus life better through collaboration and feedback.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/report" className="text-muted-foreground hover:text-foreground transition-colors">Report Issue</Link></li>
              <li><Link to="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">Feedback</Link></li>
              <li><Link to="/lost-and-found" className="text-muted-foreground hover:text-foreground transition-colors">Lost & Found</Link></li>
              <li><Link to="/track" className="text-muted-foreground hover:text-foreground transition-colors">Track Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-sm mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-sm mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><Link to="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">Feedback</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Team INDIA ~ HAckSprint OPJU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
