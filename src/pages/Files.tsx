
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileList from '@/components/dashboard/FileList';
import SearchFilter from '@/components/dashboard/SearchFilter';
import { mockFiles } from '@/components/dashboard/FileList';
import { cn } from '@/lib/utils';

const Files = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState(mockFiles);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'rating'>('date');
  const [showFilters, setShowFilters] = useState(false);

  // Mock search function
  const handleSearch = (query: string) => {
    if (!query) {
      setFiles(mockFiles);
      return;
    }
    
    const filtered = mockFiles.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      file.author.toLowerCase().includes(query.toLowerCase()) ||
      file.changeSummary.toLowerCase().includes(query.toLowerCase())
    );
    setFiles(filtered);
  };
  
  // Filter mock function
  const handleFilter = (type: string | null, author: string | null, date: string | null) => {
    let filtered = [...mockFiles];
    
    if (type) {
      filtered = filtered.filter(file => file.type === type);
    }
    
    if (author) {
      filtered = filtered.filter(file => file.author === author);
    }
    
    if (date) {
      // Simplified date filtering for demo
      filtered = filtered.filter(file => {
        const fileDate = new Date(file.updatedAt).toDateString();
        const filterDate = new Date(date).toDateString();
        return fileDate === filterDate;
      });
    }
    
    setFiles(filtered);
  };
  
  // Sort function
  const handleSort = (sortType: 'date' | 'name' | 'rating') => {
    setSortBy(sortType);
    
    const sortedFiles = [...files];
    switch (sortType) {
      case 'date':
        sortedFiles.sort((a, b) => {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
        break;
      case 'name':
        sortedFiles.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sortedFiles.sort((a, b) => {
          const ratingA = a.feedbackRating || 0;
          const ratingB = b.feedbackRating || 0;
          return ratingB - ratingA;
        });
        break;
    }
    
    setFiles(sortedFiles);
  };

  // Handle file upload (mock)
  const handleFileUpload = () => {
    console.log("File upload triggered");
    // Would implement actual file upload here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="workloop-container animate-fade-in">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">Files</h1>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                <SlidersHorizontal size={16} />
                Filters
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Plus size={16} />
                    New
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Create New</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleFileUpload}>
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Upload File</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/files/create')}>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Create New File</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <Input
                type="search"
                placeholder="Search files..."
                className="w-full"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort: {
                    sortBy === 'date' ? 'Latest' : 
                    sortBy === 'name' ? 'Name' : 'Rating'
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSort('date')} className={cn(sortBy === 'date' && "bg-accent")}>
                  Sort by Latest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('name')} className={cn(sortBy === 'name' && "bg-accent")}>
                  Sort by Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('rating')} className={cn(sortBy === 'rating' && "bg-accent")}>
                  Sort by Rating
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {showFilters && (
            <div className="mb-6 animate-fade-in">
              <SearchFilter onFilter={handleFilter} />
            </div>
          )}
          
          <div className="mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
            <FileList files={files} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Files;
