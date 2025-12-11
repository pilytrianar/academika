"use client";

import StudentHeader from "@/components/studentHeader/studentHeader";
import StudentSidebar from "@/components/studentSideBar/StudentSidebar";
import StudentAverage from "@/components/studentAverage/StudentAverage";
import StudentTabs from "@/components/studentTabs/StudentTabs";

export default function StudentInfoWrapper() {
  return (
    <div>
      <div className="p-3 bg-gray-100 min-h-screen">
        <StudentHeader />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            <StudentSidebar />
            <StudentAverage />
          </div>

          {/* Right column */}
          <div className="lg:col-span-3">
            <StudentTabs />
          </div>
        </div>
      </div>
    </div>
  );
}