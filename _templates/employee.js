const employee = {
  _id: '',
  owner: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  contact_number: '',
  location_id: '', // or location > depends on the list of locations
  website: '',
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
      from: 'DATE',
      current: 'Boolean',
      to: 'DATE',
      certificate_image: 'BINARY BUFFER'
    }
  ],
  interesrs: ['String'],
  skills: [
    {
      _id: '',
      skill: '',
      level: ''
    }
  ],
  timestamp: 'DATES'
};
