
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const Members = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    
    if (loggedIn) {
      // Redirect to the dashboard
      navigate("/dashboard");
    } else {
      toast({
        title: "Zugriff verweigert",
        description: "Bitte melde dich an, um auf den Mitgliederbereich zuzugreifen.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  return (
    <Layout>
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-ducati-gray-medium">Weiterleitung...</div>
      </div>
    </Layout>
  );
};

export default Members;
