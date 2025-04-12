import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FileDiff from '@/components/viewer/FileDiff';
import AIFeedbackPanel from '@/components/feedback/AIFeedbackPanel';
import CommentSystem from '@/components/comments/CommentSystem';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Mock data
const mockVersions = [
  { id: 'v1', number: '1.0', date: '2025-03-15T10:30:00' },
  { id: 'v2', number: '1.1', date: '2025-03-20T14:45:00' },
  { id: 'v3', number: '1.2', date: '2025-03-28T09:15:00' },
  { id: 'v4', number: '2.0', date: '2025-04-05T16:30:00' },
  { id: 'v5', number: '2.1', date: '2025-04-10T11:20:00' },
];

// Define the FeedbackItem type to match the expected type in AIFeedbackPanel
type FeedbackItemType = 'suggestion' | 'improvement' | 'warning';

interface FeedbackItem {
  id: string;
  type: FeedbackItemType;
  category: string;
  title: string;
  description: string;
  location: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: 'f1',
    type: 'suggestion',
    category: 'design',
    title: 'Improve color contrast',
    description: 'The contrast between the text and background color in the hero section doesn\'t meet accessibility standards. Consider darkening the text or lightening the background.',
    location: 'Hero section'
  },
  {
    id: 'f2',
    type: 'improvement',
    category: 'content',
    title: 'Shorten headline for clarity',
    description: 'Your headline could be more impactful if shortened to 8-10 words. The current length may reduce readability on mobile devices.',
    location: 'Page header'
  },
  {
    id: 'f3',
    type: 'warning',
    category: 'accessibility',
    title: 'Missing alt text on images',
    description: 'Several product images are missing alternative text descriptions, which impacts screen reader users. Add descriptive alt text to all images.',
    location: 'Product gallery'
  },
  {
    id: 'f4',
    type: 'suggestion',
    category: 'performance',
    title: 'Optimize image sizes',
    description: 'The hero image is 2.3MB which may slow down page loading. Consider compressing it to under 300KB for better performance.',
    location: 'Hero image'
  },
];

const mockComments = [
  {
    id: 'c1',
    author: {
      name: 'Alex Johnson'
    },
    content: 'I think we should make the CTA button more prominent. Maybe use a brighter color or increase the size?',
    timestamp: '2025-04-11T13:45:00',
    replies: [
      {
        id: 'r1',
        author: {
          name: 'Maya Rodriguez'
        },
        content: 'Good point! I\'ll try a few variations and share them tomorrow.',
        timestamp: '2025-04-11T14:20:00'
      },
      {
        id: 'r2',
        author: {
          name: 'Jamie Lee'
        },
        content: 'The brand guidelines actually recommend the orange shade #FF8C42 for primary CTAs. Should we try that?',
        timestamp: '2025-04-11T15:05:00'
      }
    ]
  },
  {
    id: 'c2',
    author: {
      name: 'Chris Wong'
    },
    content: 'The spacing between these sections feels inconsistent with our other pages. Can we standardize to 64px?',
    timestamp: '2025-04-11T16:30:00',
    replies: []
  }
];

const FileViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [currentVersionIndex, setCurrentVersionIndex] = useState(4); // Latest version
  const [previousVersionIndex, setPreviousVersionIndex] = useState(3); // Previous version
  const [activeTab, setActiveTab] = useState<'feedback' | 'comments'>('feedback');

  const handleVersionChange = (current: number, previous: number) => {
    setCurrentVersionIndex(current);
    setPreviousVersionIndex(previous);
  };

  // In a real app, we'd fetch the file details based on id
  const fileDetails = {
    id: id || '1',
    name: 'Landing Page Design',
    type: 'image' as const
  };

  const versionSummary = "Updated color palette and improved typography in header section";

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="mr-2"
              >
                <Link to="/">
                  <ArrowLeft size={16} className="mr-1" />
                  Back
                </Link>
              </Button>
              
              <h2 className="text-lg font-semibold">{fileDetails.name}</h2>
              
              <Button
                variant="outline"
                size="sm"
                className="ml-auto gap-1"
              >
                <Download size={14} />
                Download
              </Button>
            </div>
            
            <div className="h-[calc(100vh-12rem)] border rounded-lg p-4 bg-background">
              <FileDiff
                fileId={fileDetails.id}
                fileName={fileDetails.name}
                fileType={fileDetails.type}
                versions={mockVersions}
                currentVersionIndex={currentVersionIndex}
                previousVersionIndex={previousVersionIndex}
                onVersionChange={handleVersionChange}
              />
            </div>
          </div>
        </main>
        
        <Sidebar title={activeTab === 'feedback' ? "AI Feedback" : "Comments"}>
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium text-center ${
                activeTab === 'feedback'
                  ? 'border-b-2 border-workloop-purple text-foreground'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab('feedback')}
            >
              Feedback
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium text-center ${
                activeTab === 'comments'
                  ? 'border-b-2 border-workloop-purple text-foreground'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>
          
          <div className="p-4">
            {activeTab === 'feedback' ? (
              <AIFeedbackPanel
                fileId={fileDetails.id}
                fileName={fileDetails.name}
                feedbackItems={mockFeedback}
              />
            ) : (
              <CommentSystem
                fileId={fileDetails.id}
                comments={mockComments}
              />
            )}
          </div>
        </Sidebar>
      </div>
      
      <Footer versionSummary={versionSummary} />
    </div>
  );
};

export default FileViewer;
