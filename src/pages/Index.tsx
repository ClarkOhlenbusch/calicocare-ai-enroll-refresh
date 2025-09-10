import { useState } from "react";
import Header from "@/components/Header";
import EnrollmentContainer from "@/components/EnrollmentContainer";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "enroll">("home");

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      {currentPage === "home" ? <Dashboard /> : <EnrollmentContainer />}
    </div>
  );
};

export default Index;
