import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Upload, Search, Filter } from 'lucide-react';
import { FileList, SearchFilter } from '@/components/dashboard';

const Files = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    console.log('Searching for:', query);
  };

  const handleFilterChange = (filters: string[]) => {
    console.log('Active filters:', filters);
  };

  const handleSortChange = (sort: string) => {
    console.log('Sort by:', sort);
  };

  // Explicit handler for the onFilter prop 
  // to match the expected SearchFilter component props
  const handleFilter = () => {
    console.log('Filter button clicked');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      
      <main className="flex-1">
        <div className="workloop-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Files</h1>
              <p className="text-muted-foreground">
                Manage and organize your creative assets
              </p>
            </div>
            
            <div className="flex gap-2 self-end">
              <Button variant="outline" className="gap-2 border-workloop-purple/30 hover:border-workloop-purple">
                <PlusCircle size={16} />
                New Folder
              </Button>
              <Button className="gap-2 bg-gradient-purple hover:bg-workloop-dark-purple">
                <Upload size={16} />
                Upload Files
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared with Me</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <SearchFilter 
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                className="mb-4"
              />
              
              <TabsContent value="all" className="mt-0">
                <FileList />
              </TabsContent>
              
              <TabsContent value="recent" className="mt-0">
                <FileList files={[]} />
              </TabsContent>
              
              <TabsContent value="shared" className="mt-0">
                <FileList files={[]} />
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-0">
                <FileList files={[]} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Files;
