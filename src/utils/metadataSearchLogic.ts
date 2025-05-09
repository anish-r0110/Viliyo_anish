// utils/metadataSearchLogic.ts

// Data for the "Behavioral" training topics
const siteSearchList = [
  {
    title: 'Dashboard',
    description: '',
    route: './dashboard',
    params: '',
    traineeRoute: './dashboard',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Overview',
    description: 'Dashboard > Overview',
    route: './dashboard',
    params: '',
    traineeRoute: './dashboard',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Pending',
    description: 'Dashboard > Pending Tasks',
    route: './task-list',
    params: '',
    traineeRoute: './task-list',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Tasks',
    description: 'Dashboard > Pending Tasks',
    route: './task-list',
    params: '',
    traineeRoute: './task-list',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Programme',
    description: 'Dashboard > Latest Programmes',
    route: './viewAllPrograms',
    params: '',
    traineeRoute: './viewAllPrograms',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Help',
    description: 'Help',
    route: './help',
    params: '',
    traineeRoute: './help',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Center',
    description: 'Help > Help Centre',
    route: './help',
    params: '',
    traineeRoute: './help',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Tutorials',
    description: 'Help > Viliyo Tutorials',
    route: './help?tab=viliyo-tutorials',
    params: 'tutorials',
    traineeRoute: './help?tab=viliyo-tutorials',
    status: true,
    moduleId: 0,
  },
  {
    title: 'FAQs',
    description: 'Help > FAQs',
    route: './help?tab=faq',
    params: 'faqs',
    traineeRoute: './help?tab=faq',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Queries',
    description: 'Help > Queries & Feedback',
    route: './help?tab=queries-feedback',
    params: 'queries-feedback',
    traineeRoute: './help?tab=queries-feedback',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Feedback',
    description: 'Help > Queries & Feedback',
    route: './help?tab=queries-feedback',
    params: 'queries-feedback',
    traineeRoute: './help?tab=queries-feedback',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Feature Request',
    description: 'Help > Feature Request',
    route: './help?feature-request',
    params: 'feature-request',
    traineeRoute: './help?tab=feature-request',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Contact Support',
    description: 'Help > Contact Support',
    route: './help?tab=contact-support',
    params: 'contact-support',
    traineeRoute: './help?tab=contact-support',
    status: true,
    moduleId: 0,
  },  
  {
    title: 'Profile',
    description: 'Visit the my profile page',
    route: './profile',
    params: '',
    traineeRoute: './profile',
    status: true,
    moduleId: 0,
  },
  {
    title: 'Queries',
    description: 'Visit my Queries page',
    route: './help?tab=queries-feedback',
    params: '',
    traineeRoute: './help?tab=queries-feedback',
    status: true,
    moduleId: 0,
  }, 
  {
    title: 'Calendar',
    description: 'View your schedules',
    route: './calendar',
    traineeRoute: './calendar',
    status: true,
    moduleId: 0,
  },
 
  //History
  {
    title: 'History',
    description: 'History',
    route: './history',
    traineeRoute: './history',
    status: true,
    moduleId: 0,
  },  

];
  

  
  // Combine all the training data into a single array
  export const searchableMetadata: Array<{
    title: string,
    description: string,
    route: string,
    traineeRoute: string,
    status: boolean,
    moduleId: number,
    params?: string,
  }> = [
    ...siteSearchList,
  ];
  
  // Function to perform metadata search
  export const performMetadataSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase().trim();
  
    if (!lowercaseQuery) {
      return [];
    }
  
    const matchedResults = searchableMetadata.filter((item) => {
      const lowercaseTitle = item.title.toLowerCase();
      const lowercaseContent = item.description.toLowerCase();
      return lowercaseTitle.includes(lowercaseQuery) || lowercaseContent.includes(lowercaseQuery);
    });
  
    return matchedResults;
  };
  