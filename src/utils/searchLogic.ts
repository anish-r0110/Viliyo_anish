 
  // Central data structure to hold searchable content
  export const searchableContent: Array<{
    title: string,
    description: string,
    route: string,
    traineeRoute: string,
    status: boolean,
    moduleId: number,
    params?: string,
  }> = [];
  
  // Function to perform the search
  export const performSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase().trim();
  
    if (!lowercaseQuery) {
      // If the query is empty, return an empty array
      return [];
    }
  
    const matchedResults = searchableContent.filter(item => {
      // Search in the title and content for matches
      const lowercaseTitle = item.title.toLowerCase();
      const lowercaseContent = item.description.toLowerCase();
      return lowercaseTitle.includes(lowercaseQuery) || lowercaseContent.includes(lowercaseQuery);
    });
  
    return matchedResults;
  };
  