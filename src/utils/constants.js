export const titleConstants = {
  dashboardTitle: 'GCC - Travellers Tracker',
};

export const headerTabsTitle = {
  pipeline: 'Pipeline',
  reports: 'Reports',
};

export const statsComponentLabels = {
  contacted: 'CONTACTED',
  notReachable: 'NOT REACHABLE',
  dataMissing: 'DATA MISSING',
  symptomatic: 'SYMPTOMATIC',
};

export const apiUrls = {
  login: '/medicaltracker/auth/login',
  getZones: '/medicaltracker/dashboard/zones',
  resetPassword: '/medicaltracker/auth/password',
  getPersonsByWard: '/medicaltracker/dashboard/wards/',
  getPersonsDetails: '/medicaltracker//form/persons/:id',
  addContractedPersons: '/medicaltracker/form/persons',
  locationsByType: '/medicaltracker/form/locations/street_name',
  updateContractedPersons: '/medicaltracker/form/persons/:id',
};
