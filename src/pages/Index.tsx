import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import JobStats from "@/components/dashboard/JobStats";
import DailyPlanner from "@/components/dashboard/DailyPlanner";
import QuickActions from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Dashboard Content */}
          <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
            {/* Job Application Stats */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Application Overview
              </h2>
              <JobStats />
            </section>

            {/* Main Grid */}
            <div className="grid gap-4 lg:gap-6 xl:grid-cols-3">
              {/* Daily Planner - Takes 2 columns on large screens */}
              <div className="xl:col-span-2">
                <DailyPlanner />
              </div>

              {/* Quick Actions - Takes 1 column */}
              <div className="xl:col-span-1">
                <QuickActions />
              </div>
            </div>

            {/* Additional Dashboard Widgets */}
            <section className="grid gap-4 lg:gap-6 lg:grid-cols-2">
              {/* Recent Activity */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Application submitted
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Software Engineer at Meta • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <div className="h-2 w-2 bg-info rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Interview scheduled</p>
                      <p className="text-xs text-muted-foreground">
                        TechCorp • Tomorrow at 3:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <div className="h-2 w-2 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Profile viewed</p>
                      <p className="text-xs text-muted-foreground">
                        By Amazon recruiter • 1 day ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 border-l-4 border-l-warning bg-warning/5 rounded-r-lg">
                    <div className="text-center min-w-0">
                      <div className="text-xs font-medium text-muted-foreground">
                        DEC
                      </div>
                      <div className="text-lg font-bold">28</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Technical Interview</p>
                      <p className="text-xs text-muted-foreground">
                        Amazon • 11:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border-l-4 border-l-info bg-info/5 rounded-r-lg">
                    <div className="text-center min-w-0">
                      <div className="text-xs font-medium text-muted-foreground">
                        DEC
                      </div>
                      <div className="text-lg font-bold">30</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Career Fair</p>
                      <p className="text-xs text-muted-foreground">
                        Virtual Tech Expo • 9:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
