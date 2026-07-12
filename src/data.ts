import { Category, Goal, QuizAnswers, RecommendationResponse } from './types';

export const STATIC_GOALS: Record<Category, Goal[]> = {
  'Environment': [
    {
      id: 'env-1',
      title: 'Legume Meal Swap',
      action: 'Replace one beef or animal-protein centered meal per week with a bean, lentil, or organic tofu dish.',
      impact: 'Based on global farming meta-analyses (Poore & Nemecek 2018), shifting toward plant proteins reduces food-system greenhouse gas emissions by up to 73% and cuts personal agricultural land footprint by up to 76%. Avoiding beef delivers the largest climate gain, as beef generates ~60 kg of CO2-eq per kg of protein compared to just ~1 kg for peas.',
      category: 'Environment'
    },
    {
      id: 'env-2',
      title: 'Micro Transit Swap',
      action: 'Swap one short solo car trip of under 5 km each week for walking, cycling, or public transit.',
      impact: 'According to IEA and transport demand analyses, modal shifts to public or active transit deliver massive near-term climate gains. Public transit cuts CO2 emissions per passenger-mile by ~45% compared to driving alone. Commuters replacing a 20-mile solo commute with transit avoid roughly 2.2 tonnes of CO2-eq annually.',
      category: 'Environment'
    },
    {
      id: 'env-3',
      title: 'Lawn-to-Meadow Patch',
      action: 'Convert one 1x1 meter patch of grass lawn to regionally native flowers this planting season, and stop using synthetic pesticides.',
      impact: 'A landmark study (Narango et al. 2018) shows suburban songbird populations collapse when non-native lawn ornamentals exceed 30% of biomass, as non-natives host too few caterpillar larvae. Native oaks support 500+ Lepidoptera species while non-natives support under 10. This swap also reduces water demand by 50–75%.',
      category: 'Environment'
    },
    {
      id: 'env-4',
      title: 'Household Plastic Detox',
      action: 'Audit your kitchen bin for one week to identify the top single-use plastic items, and commit to carrying a reusable water bottle.',
      impact: 'Plastics are produced almost entirely from fossil fuels and generate 3.4% of global greenhouse gas emissions, yet only 9% of all plastic ever made has been recycled (Geyer et al. 2017). Using a reusable water bottle pays back its full manufacturing lifecycle impact in fewer than 20 uses.',
      category: 'Environment'
    }
  ],
  'Well-Being': [
    {
      id: 'well-1',
      title: 'Smart Screen Limit',
      action: 'Set recreational social media and smartphone limits to under 2 hours daily, and charge your phone outside the bedroom.',
      impact: 'A 2024 randomized controlled trial at Danube University Krems (Pieh et al.) proved that reducing screen time to under 2 hours per day significantly improves mental well-being, sleep quality, and lowers depressive symptoms. Taking a digital detox allows cognitive restoration and reduces compulsive attention fragmentation.',
      category: 'Well-Being'
    },
    {
      id: 'well-2',
      title: 'Consistency Stroll',
      action: 'Walk briskly for 30 minutes, 5 days per week, breaking it into 10-minute active blocks if needed.',
      impact: 'Meeting WHO physical activity guidelines of 150–300 minutes of moderate movement per week reduces all-cause mortality risk by 20–30% and dramatically lowers type-2 diabetes and depression. Dose-response research (Ekelund et al. 2019) confirms the steepest protective gains occur when moving from zero activity to modest micro-sessions.',
      category: 'Well-Being'
    },
    {
      id: 'well-3',
      title: 'Plant-Predominant Plate',
      action: 'Fill half your plate with vegetables, fruits, whole grains, and legumes, and replace processed meats with plant alternatives.',
      impact: 'Long-term clinical cohorts (Satija et al. 2017) demonstrate that healthy plant-predominant dietary indexes are associated with a 20–25% reduction in cardiovascular mortality and lower type-2 diabetes incidence. Whole food quality is key, as plant-based diets high in refined carbs and sugars do not confer this benefit.',
      category: 'Well-Being'
    },
    {
      id: 'well-4',
      title: 'Hydration Anchor',
      action: 'Anchor drinking one full glass of water to key daily routines, aiming for a pale straw urine color as a simple gauge.',
      impact: 'A 25-year National Institutes of Health cohort study (Dmitrieva et al. 2023) discovered that chronic underhydration—marked by high-normal serum sodium levels—is linked to a 64% higher risk of chronic disease and a 39% higher risk of accelerated biological aging. Adequate water intake directly preserves metabolic and cognitive performance.',
      category: 'Well-Being'
    }
  ],
  'Compassion': [
    {
      id: 'comp-1',
      title: 'Kindness Chunking',
      action: 'Perform five small acts of kindness (such as leaving a warm tip, helping a stranger, or writing a thank-you) in a single day each week.',
      impact: 'Meta-analytic reviews of 27 experimental studies (Curry et al. 2018) prove that performing prosocial acts delivers a positive effect on the giver\'s own well-being (d ≈ 0.28). Research shows that "chunking" five varied acts of kindness into a single day weekly produces significant happiness gains, whereas spreading them out does not.',
      category: 'Compassion'
    },
    {
      id: 'comp-2',
      title: 'Existing Tie Check-In',
      action: 'Reach out to one friend going through illness, bereavement, or job transition monthly, with no advice or agenda except presence.',
      impact: 'Social support and isolation research (Cohen & Wills 1985) confirms that perceived social support buffers against psychological stress. Contact from an existing social connection has an outsized protective effect compared to new ties, substantially mitigating complicated grief and isolation over time.',
      category: 'Compassion'
    },
    {
      id: 'comp-3',
      title: 'Local Food Bank Ritual',
      action: 'Establish a small, recurring monthly financial donation to your local food bank instead of donating physical pantry items.',
      impact: 'With US food insecurity affecting roughly 13.5% of households (USDA 2023), local food banks are on the front lines. Feeding America reports that monetary donations stretch 3× to 10× further than physical food items due to bulk-purchasing contracts and professional logistic efficiencies.',
      category: 'Compassion'
    },
    {
      id: 'comp-4',
      title: 'Stranger Micro-Interactions',
      action: 'Have one brief, friendly micro-interaction with a stranger (e.g. say a warm hello to a barista, commuter, or neighbor) daily.',
      impact: 'In field experiments (Epley & Schroeder 2014), commuters instructed to talk with a stranger reported significantly happier commutes than those who remained in solitude—yet systematically predicted the opposite. Minimal everyday interactions with weak ties reliably predict greater social belonging and subjective well-being.',
      category: 'Compassion'
    }
  ],
  'Responsible AI': [
    {
      id: 'rai-1',
      title: 'AI Verification Loop',
      action: 'Verify every fact, URL, citation, and quote from an AI output as unverified until you click through to the original source.',
      impact: 'LLMs are built on probabilistic synthesis and frequently hallucinate plausible-looking but non-existent citations or links (Ji et al. 2023). A proactive verification habit takes less than 30 seconds per claim, protects your professional integrity, and curbs the automated spread of digital misinformation.',
      category: 'Responsible AI'
    },
    {
      id: 'rai-2',
      title: 'Deliberate AI Use',
      action: 'Ask if a quick web search or your own critical thinking is sufficient before prompting, and choose smaller, efficient models.',
      impact: 'Global data center energy consumption reached ~415 TWh in 2024 and could approach 945 TWh by 2030, driven largely by AI (IEA 2025). Large generative prompts consume 5–30× more power than search. Right-sizing your tool selection reduces individual carbon and grid-cooling water footprints by an order of magnitude.',
      category: 'Responsible AI'
    },
    {
      id: 'rai-3',
      title: 'Cognitive Preservation',
      action: 'Take 60 seconds to draft your own thoughts before prompting AI, and preserve underlying skills by practicing offline craft.',
      impact: 'A 2025 study (Gerlich, n=666) discovered a significant negative correlation between frequent AI usage and critical thinking ability, driven by cognitive offloading. Younger cohorts (17-25) exhibit the highest AI dependence. Thinking first preserves vital original reasoning pathways.',
      category: 'Responsible AI'
    },
    {
      id: 'rai-4',
      title: 'Career Complement Strategy',
      action: 'Identify and develop the parts of your work that rely on relationships, human judgment, ethics, and contextual wisdom.',
      impact: 'The IMF reports that up to 40% of global jobs (and 60% in advanced economies) are exposed to AI automation (IMF 2024). However, roles centered on complex social judgment, accountability, and embodied dexterity are highly resilient. Proactively developing these complementary skills protects career optionality.',
      category: 'Responsible AI'
    }
  ]
};

export function getRecommendedGoals(answers: QuizAnswers): RecommendationResponse {
  const selectedCategories = answers.categories && answers.categories.length > 0 
    ? answers.categories 
    : ['Environment' as Category];

  const cat1 = selectedCategories[0];
  // Treat Well-Being as the automatic second choice. If the first choice is already Well-Being, fallback to Environment.
  const cat2 = cat1 === ('Well-Being' as Category) ? ('Environment' as Category) : ('Well-Being' as Category);

  // Extract candidate goals from the selected categories
  const cat1Goals = STATIC_GOALS[cat1];
  const cat2Goals = STATIC_GOALS[cat2];

  let rawTopGoal = cat1Goals[0];
  let rawAlts: Goal[] = [];

  if (cat1 === cat2) {
    // Single category fallback or selected only one
    rawAlts = [cat1Goals[1], cat1Goals[2], cat1Goals[3]];
  } else {
    // Balanced category selections: blend both areas
    // Alt 1: First goal of Cat 2 (to show representation of their other choice)
    // Alt 2: Second goal of Cat 1
    // Alt 3: Second goal of Cat 2
    rawAlts = [
      cat2Goals[0],
      cat1Goals[1],
      cat2Goals[1]
    ];
  }

  // Dynamic constraint advice
  const constraintAdvices: string[] = [];
  const selectedConstraints = answers.primaryConstraint || [];
  
  if (selectedConstraints.some(c => c.toLowerCase().includes('busy'))) {
    constraintAdvices.push('Optimized to fit demanding schedules with zero physical setup friction.');
  }
  if (selectedConstraints.some(c => c.toLowerCase().includes('budget') || c.toLowerCase().includes('cost'))) {
    constraintAdvices.push('Costs nothing to implement and reduces monthly overhead.');
  }
  if (selectedConstraints.some(c => c.toLowerCase().includes('quarters') || c.toLowerCase().includes('apartment'))) {
    constraintAdvices.push('Perfect for compact spaces, requiring no yard or heavy tools.');
  }
  if (selectedConstraints.some(c => c.toLowerCase().includes('fitness') || c.toLowerCase().includes('shape'))) {
    constraintAdvices.push('Supports overall physical stamina and structural kinetic health.');
  }

  const joinedConstraintAdvice = constraintAdvices.join(' ');

  // Dynamic living arrangements advice
  let arrangementAdvice = '';
  if (answers.livingArrangement) {
    if (answers.livingArrangement.toLowerCase().includes('family')) {
      arrangementAdvice = 'Acts as a shared focal point to inspire healthy routines in a family circle.';
    } else if (answers.livingArrangement.toLowerCase().includes('roommate') || answers.livingArrangement.toLowerCase().includes('shared')) {
      arrangementAdvice = 'Maintains respectful quiet periods and matches shared household limits.';
    } else if (answers.livingArrangement.toLowerCase().includes('alone') || answers.livingArrangement.toLowerCase().includes('single')) {
      arrangementAdvice = 'Allows single households to map custom visual triggers without external noise.';
    }
  }

  const futureAdvice = 'These incremental gains compound daily, generating long-term environmental and personal agency.';

  // Personalize a Goal's impact story
  const personalizeGoal = (goal: Goal, isAlternative = false, index = 0): Goal => {
    // Build concise segmented paragraphs with distinct bold uppercase labels
    const section1 = `[IMPACT]\n${goal.impact}`;
    
    const contextText = answers.livingArrangement 
      ? `Tailored specifically for a "${answers.livingArrangement}" setting.` 
      : 'Tailored specifically for your daily habitat.';
    const section2 = `[CONTEXT]\n${contextText}`;
    
    const optimizationText = [joinedConstraintAdvice, arrangementAdvice, futureAdvice].filter(Boolean).join(' ');
    const section3 = `[OPTIMIZATION]\n${optimizationText}`;
    
    let customImpact = `${section1}\n\n${section2}\n\n${section3}`;

    if (isAlternative) {
      const altTag = index === 0 
        ? ` (Alternative Focus: ${goal.category})` 
        : ` (Environment Match)`;
      const altSection1 = `[IMPACT]${altTag}\n${goal.impact}`;
      customImpact = `${altSection1}\n\n${section3}`;
    }

    return {
      ...goal,
      impact: customImpact
    };
  };

  return {
    topGoal: personalizeGoal(rawTopGoal, false),
    alternatives: rawAlts.map((g, idx) => personalizeGoal(g, true, idx))
  };
}
