import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserPlus, Users, LinkedinIcon } from "lucide-react";

const Networking = () => {
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
                  <h1 className="text-3xl font-bold text-foreground">
                    Networking
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Manage your professional connections
                  </p>
                </div>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Connection
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Your Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-3 p-3 border rounded-lg"
                        >
                          <Avatar>
                            <AvatarFallback>
                              {String.fromCharCode(65 + i)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">
                              Connection {i + 1}
                            </h4>
                            <p className="text-sm text-muted-foreground truncate">
                              Software Engineer
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Badge variant="outline" className="text-xs">
                                <LinkedinIcon className="w-3 h-3 mr-1" />
                                LinkedIn
                              </Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Networking;
