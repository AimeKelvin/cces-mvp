export const categorizeComplaint = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();

  const keywordsMap = {
    water: ['water', 'tap', 'pipe', 'leak', 'flood', 'no water'],
    electricity: ['electricity', 'power', 'light', 'blackout', 'voltage', 'no power'],
    roads: ['road', 'pothole', 'traffic', 'bridge', 'highway'],
    education: ['school', 'education', 'teacher', 'student', 'exam'],
    health: ['hospital', 'clinic', 'health', 'doctor', 'nurse'],
    security: ['police', 'security', 'theft', 'crime', 'assault']
  };

  for (const [category, keywords] of Object.entries(keywordsMap)) {
    if (keywords.some(word => text.includes(word))) {
      return category;
    }
  }

  return 'general';
};
