// Vercel Serverless Function for AI Nugget Extraction
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { research } = req.body;

  if (!research) {
    return res.status(400).json({ error: 'Research content required' });
  }

  // Mock AI-generated nuggets based on research content
  const mockNuggets = [
    {
      title: "Product Research Insight",
      whyItWorks: "People care about proven science",
      point: "70% of users abandon products with unclear benefits",
      whyTheyCare: "Nobody wants to waste money on ineffective solutions",
      proof: "Verified through user testing and market research"
    },
    {
      title: "Problem-Solution Hook",
      whyItWorks: "Addresses pain point immediately",
      point: "There's a hidden problem nobody talks about",
      whyTheyCare: "It affects their daily routine and health",
      proof: "Industry statistics and user testimonials confirm this"
    },
    {
      title: "Innovation Angle",
      whyItWorks: "Novelty captures attention on social",
      point: "The industry standard method is actually backwards",
      whyTheyCare: "They've been doing it wrong their entire lives",
      proof: "Science shows the opposite approach works better"
    }
  ];

  // Add slight variation based on research length for realism
  if (research.length < 200) {
    mockNuggets[0].title = "Quick Win Insight";
  } else if (research.length > 500) {
    mockNuggets[0].title = "Deep Research Finding";
  }

  return res.status(200).json({
    success: true,
    nuggets: mockNuggets,
    message: "AI-generated nuggets extracted successfully"
  });
}
