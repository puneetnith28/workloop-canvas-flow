
import React from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  File, 
  Clock, 
  User, 
  MessageSquare,
  ArrowLeftRight,
  RotateCcw,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type FileType = 'pdf' | 'image' | 'text' | 'code';

interface FileCardProps {
  id: string;
  name: string;
  type: FileType;
  version: string | number;
  changeSummary: string;
  author: string;
  updatedAt: string | Date;
  feedbackRating?: number;
  className?: string;
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  name,
  type,
  version,
  changeSummary,
  author,
  updatedAt,
  feedbackRating,
  className,
}) => {
  const fileTypeIcon = () => {
    switch (type) {
      case 'pdf':
        return <File className="text-red-500" />;
      case 'image':
        return <ImageIcon className="text-blue-500" />;
      case 'code':
        return <FileCode className="text-green-500" />;
      case 'text':
      default:
        return <FileText className="text-yellow-500" />;
    }
  };

  const formatDate = (date: string | Date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <Card className={cn("hover:shadow-md transition-all duration-200 animate-fade-in", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 bg-secondary rounded-lg">
              {fileTypeIcon()}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-base line-clamp-1">{name}</h3>
                <Badge variant="outline" className="text-xs">v{version}</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">{changeSummary}</p>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{formatDate(updatedAt)}</span>
                </div>
                {feedbackRating !== undefined && (
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500" />
                    <span>{feedbackRating}/5</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-secondary/50 flex flex-wrap gap-2">
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to={`/files/${id}`}>
            <ArrowLeftRight size={14} />
            <span>Compare</span>
          </Link>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-1">
          <RotateCcw size={14} />
          <span>Revert</span>
        </Button>
        
        <Button asChild variant="ghost" size="sm" className="gap-1 ml-auto">
          <Link to={`/feedback/${id}`}>
            <MessageSquare size={14} />
            <span>AI Feedback</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
