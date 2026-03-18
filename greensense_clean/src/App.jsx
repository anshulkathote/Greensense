// GreenSense — Root Application Component
// Manages screen state and routes between the four pages.

import { useState, useEffect } from "react";
import { IntroPage }   from "./pages/IntroPage";
import { FormPage }    from "./pages/FormPage";
import { LoadingPage } from "./pages/LoadingPage";
import { ResultsPage } from "./pages/ResultsPage";
import { recommend, countCompatibleAsync, countCompatible, totalPlants } from "./engine/decisionEngine";
import { DEFAULT_FORM } from "./data/constants";

export default function App() {
  const [screen,          setScreen]          = useState("intro");
  const [form,            setForm]            = useState(DEFAULT_FORM);
  const [results,         setResults]         = useState([]);
  const [compatible,      setCompatible]      = useState(countCompatible());
  const [error,           setError]           = useState(null);

  const total = totalPlants();

  // Re-fetch compatible count from Java whenever form changes
  useEffect(() => {
    countCompatibleAsync(form).then(setCompatible);
  }, [form]);

  const handleStart = () => setScreen("form");

  const handleAnalyze = async () => {
    setScreen("loading");
    setError(null);
    try {
      const recs = await recommend(form);
      setResults(recs);
      setScreen("results");
    } catch (err) {
      setError("Could not reach the Java backend. Make sure it is running on port 8080.");
      setScreen("form");
    }
  };

  const handleBack = () => {
    setResults([]);
    setScreen("form");
  };

  switch (screen) {
    case "intro":
      return <IntroPage onStart={handleStart} totalPlants={total} />;
    case "form":
      return (
        <FormPage
          form={form}
          setForm={setForm}
          onAnalyze={handleAnalyze}
          compatibleCount={compatible}
          totalPlants={total}
          error={error}
        />
      );
    case "loading":
      return <LoadingPage />;
    case "results":
      return (
        <ResultsPage
          results={results}
          form={form}
          totalPlants={total}
          compatibleCount={compatible}
          onBack={handleBack}
        />
      );
    default:
      return null;
  }
}
