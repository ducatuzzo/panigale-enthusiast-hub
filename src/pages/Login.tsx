
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!email || !password) {
      toast({
        title: "Fehler",
        description: "Bitte gib E-Mail-Adresse und Passwort ein.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate login process
    setIsLoading(true);
    
    // Timeout to simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Any email with a valid format and password with 6+ chars works for demo
      if (email.includes("@") && password.length >= 6) {
        // Store login state in sessionStorage
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userEmail", email);
        
        toast({
          title: "Erfolgreich angemeldet",
          description: "Willkommen im Mitgliederbereich!",
        });
        
        // Redirect to members area
        navigate("/members");
      } else {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: "Ungültige E-Mail oder Passwort zu kurz (min. 6 Zeichen).",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <Layout>
      <section className="section-padding min-h-[calc(100vh-80px)] flex items-center">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-ducati-red p-6 text-white text-center">
              <h1 className="text-2xl font-bold">Mitgliederbereich</h1>
              <p className="mt-2 text-white/80">Melde dich an, um exklusive Inhalte zu sehen</p>
            </div>
            
            <div className="p-6 md:p-8">
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-ducati-gray-dark mb-2">
                    E-Mail-Adresse
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ducati-gray-medium" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border border-ducati-gray-light py-2 pl-10 pr-3 focus:border-ducati-red focus:outline-none focus:ring-1 focus:ring-ducati-red"
                      placeholder="deine@email.com"
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="password" className="block text-sm font-medium text-ducati-gray-dark mb-2">
                    Passwort
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ducati-gray-medium" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded border border-ducati-gray-light py-2 pl-10 pr-10 focus:border-ducati-red focus:outline-none focus:ring-1 focus:ring-ducati-red"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ducati-gray-medium hover:text-ducati-gray-dark"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-ducati-red text-white py-2 rounded font-medium hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-ducati-red focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Anmeldung läuft..." : "Anmelden"}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-ducati-gray-dark">
                  Noch kein Konto? <a href="#" className="text-ducati-red hover:underline">Registrieren</a>
                </p>
                <p className="mt-2 text-xs text-ducati-gray-medium">
                  Für diese Demo: Beliebige E-Mail (mit @) und mindestens 6 Zeichen langes Passwort
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
