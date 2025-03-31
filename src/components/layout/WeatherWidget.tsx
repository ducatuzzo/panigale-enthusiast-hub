
import React from "react";
import { Sun } from "lucide-react";

type WeatherWidgetProps = {
  mobile?: boolean;
};

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ mobile = false }) => {
  // In a real application, this would fetch from a weather API
  // For now we're using static data as requested
  const weatherData = {
    location: "Bern",
    temperature: 15,
    condition: "sunny" // could be sunny, cloudy, rainy, etc.
  };

  // Map weather conditions to icons
  const renderWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className={`${mobile ? "h-4 w-4" : "h-5 w-5"} text-yellow-500`} />;
      // Add more conditions as needed
      default:
        return <Sun className={`${mobile ? "h-4 w-4" : "h-5 w-5"} text-yellow-500`} />;
    }
  };

  if (mobile) {
    return (
      <div className="flex items-center text-ducati-gray-dark">
        {renderWeatherIcon(weatherData.condition)}
        <span className="ml-1 text-sm">{weatherData.temperature}°C</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-ducati-gray-dark">
      {renderWeatherIcon(weatherData.condition)}
      <span className="ml-1">
        {weatherData.location}: {weatherData.temperature}°C
      </span>
    </div>
  );
};
