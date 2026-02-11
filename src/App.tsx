import { useState } from "react";
import Layout from "./components/Layout";
import GeneratorForm from "./components/GeneratorForm";
import IdeasDisplay from "./components/IdeasDisplay";
import { useIdeasGenerator } from "./hooks/useIdeasGenerator";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [businessType, setBusinessType] = useState("");

  const { generateIdeas, ideas, isLoading, error } = useIdeasGenerator();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType.trim()) return;

    generateIdeas({ businessType });
  };

  const handleBusinessTypeChange = (value: string) => {
    setBusinessType(value);
  };

  return (
    <Layout>
      <GeneratorForm
        businessType={businessType}
        onBusinessTypeChange={handleBusinessTypeChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <IdeasDisplay ideas={ideas || []} isLoading={isLoading} error={error} />
      <Analytics />
      <SpeedInsights />
    </Layout>
  );
}

export default App;
