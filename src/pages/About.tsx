
import React from "react";
import Layout from "@/components/layout/Layout";
import { Users, Target, MessageCircle, CalendarDays } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1622185135505-2d795005617d?q=80&w=2574&auto=format&fit=crop')", 
            backgroundPosition: "center" 
          }}
        ></div>
        <div className="container-custom h-full relative z-20 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Über V4S.CH
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Unsere Leidenschaft für die Ducati Panigale V4S mit dir teilen
          </p>
        </div>
      </section>
      
      {/* About Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-8">Unsere Geschichte</h2>
            <p className="mb-6 text-ducati-gray-dark">
              V4S.CH entstand aus der gemeinsamen Leidenschaft von Schweizer Ducati-Enthusiasten für die legendäre Panigale V4S. 
              Was als kleines Forum für den Austausch von Erfahrungen und Tipps begann, hat sich zu einer wachsenden Community entwickelt.
            </p>
            <p className="mb-6 text-ducati-gray-dark">
              Unser Ziel ist es, eine Plattform zu schaffen, die alle Aspekte dieses außergewöhnlichen Motorrads abdeckt - von technischen Details und Tuning-Optionen bis hin zu gemeinsamen Ausfahrten und Events. Wir möchten das Wissen und die Begeisterung für die Panigale V4S in der Schweiz bündeln und weitergeben.
            </p>
            <p className="mb-8 text-ducati-gray-dark">
              Diese Website dient als zentrale Anlaufstelle für alle V4S-Fahrer und Interessenten in der Schweiz. Hier findest du nicht nur umfassende Informationen zum Motorrad selbst, sondern auch eine lebendige Community von Gleichgesinnten.
            </p>
            
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-2xl font-semibold mb-6">Das Team hinter V4S.CH</h3>
              <p className="mb-6 text-ducati-gray-dark">
                Hinter V4S.CH steht ein kleines Team von passionierten Ducati-Fahrern aus verschiedenen Teilen der Schweiz. Was uns verbindet? Die Liebe zur Panigale V4S und der Wunsch, diese Begeisterung mit anderen zu teilen.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-ducati-gray-light rounded-lg p-6">
                  <div className="w-16 h-16 bg-ducati-red rounded-full flex items-center justify-center mb-4">
                    <Users className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Für die Community</h4>
                  <p className="text-ducati-gray-dark">
                    Wir schaffen einen Ort für den Austausch zwischen Fahrern, Enthusiasten und Interessierten.
                  </p>
                </div>
                
                <div className="bg-ducati-gray-light rounded-lg p-6">
                  <div className="w-16 h-16 bg-ducati-red rounded-full flex items-center justify-center mb-4">
                    <Target className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Unser Ziel</h4>
                  <p className="text-ducati-gray-dark">
                    Die umfassendste Ressource für die Ducati Panigale V4S in der Schweiz zu werden.
                  </p>
                </div>
                
                <div className="bg-ducati-gray-light rounded-lg p-6">
                  <div className="w-16 h-16 bg-ducati-red rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Transparenz</h4>
                  <p className="text-ducati-gray-dark">
                    Offener und ehrlicher Austausch über alle Aspekte der V4S - Stärken wie Schwächen.
                  </p>
                </div>
                
                <div className="bg-ducati-gray-light rounded-lg p-6">
                  <div className="w-16 h-16 bg-ducati-red rounded-full flex items-center justify-center mb-4">
                    <CalendarDays className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Events</h4>
                  <p className="text-ducati-gray-dark">
                    Organisation und Promotion von Treffen, Ausfahrten und anderen Events für V4S-Enthusiasten.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mt-12">
              <h3 className="text-2xl font-semibold mb-4">Sei dabei!</h3>
              <p className="mb-6 text-ducati-gray-dark">
                V4S.CH lebt vom Engagement seiner Community. Egal ob du selbst eine Panigale V4S fährst, darauf sparst oder einfach nur fasziniert bist - du bist herzlich willkommen, Teil unserer Gemeinschaft zu werden.
              </p>
              <p className="text-ducati-gray-dark">
                Registriere dich noch heute und werde Teil der schweizweit größten V4S-Community!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
