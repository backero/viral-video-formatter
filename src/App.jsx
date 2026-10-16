import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FormEditor from "./pages/FormEditor";
import ScriptGenerator from "./pages/ScriptGenerator";
import Page08_RawContentAnalyzer from "./pages/Page08_RawContentAnalyzer";

export default function App() {
  const [formData, setFormData] = useState({
    rawContent: '',
    analyzedContent: null,
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/f/:slug" element={<FormEditor />} />
        <Route path="/generate" element={<ScriptGenerator />} />
        <Route path="/raw-content" element={<Page08_RawContentAnalyzer data={formData} onChange={handleFormChange} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
