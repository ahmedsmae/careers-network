const employee = {
  _id: '',
  owner: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: 'Male OR FEMALE',
  birth_date: 'DATE',
  nationality: 'CHOOSE from countries list',
  religion: 'CHOOSE from list',
  marital_status: 'CHOOSE from list',
  number_of_dependents: 'Number',
  residence_country: 'CHOOSE FROM COUNTRIES LIST',
  visa_type: 'CHOOSE FROM Options',
  location_id: '',
  contact_number: '',
  driving_licences: '',
  has_a_car: 'Boolean',
  bio: '',
  avatar: 'BINARY BUFFER',
  educations: [
    {
      _id: '',
      subject: '',
      institute: '',
      location_id: '',
      description: '',
      from: 'DATE',
      current: 'Boolean',
      to: 'DATE',
      certificate_image: 'BINARY BUFFER'
    }
  ],
  experiences: [
    {
      _id: '',
      position: '',
      organization: '',
      location_id: '',
      description: '',
      salary: '',
      currency: '',
      from: 'DATE',
      current: 'Boolean',
      to: 'DATE',
      certificate_image: 'BINARY BUFFER'
    }
  ],
  trainings_certifications: [
    {
      _id: '',
      kind: 'TRAINING OR CERTIFICATE',
      subject: '',
      institute: '',
      location_id: '',
      description: '',
      from: 'DATE',
      current: 'Boolean',
      to: 'DATE',
      certificate_image: 'BINARY BUFFER'
    }
  ],
  languages: [
    {
      _id: '',
      language: 'Choose from languages list',
      level: 'choose from options'
    }
  ],
  skills: [
    {
      _id: '',
      skill: '',
      level: ''
    }
  ],
  interests: [
    {
      _id: '',
      interest: '',
      awards: ''
    }
  ],
  references: [
    {
      _id: '',
      name: '',
      position: '',
      company: '',
      email: '',
      contact_number: ''
    }
  ],
  social_profiles: {
    website: '',
    linkedin: 'URL',
    twitter: 'URL',
    github: 'URL',
    stackoverflow: 'URL',
    facebook: 'URL',
    instagram: 'URL',
    youtube: 'URL'
  },
  prefered_jobs_settings: {
    keywords: ['String'],
    location_ids: ['ids']
  },
  timestamp: 'DATES'
};
