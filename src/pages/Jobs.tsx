import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Clock, Bookmark } from "lucide-react";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Jobs</h1>
                  <p className="text-muted-foreground mt-2">
                    Discover and track job opportunities
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search Jobs
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {/* Job Listings */}
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              Senior Software Engineer
                            </h3>
                            <Badge variant="secondary">New</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            TechCorp Inc.
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              San Francisco, CA
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Posted 2 days ago
                            </div>
                          </div>
                          <p className="text-sm text-foreground line-clamp-2">
                            We're looking for a Senior Software Engineer to join
                            our growing team and help build scalable web
                            applications...
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button size="sm">Apply Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
