const job = {
  _id: '',
  position: '',
  employer_id: '',
  location_id: '', // or location > depends on the list of locations
  referance: '',
  status: 'AVAILABLE, TAKEN',
  applying_email: '',
  applying_link: '',
  responsibilities: '',
  requirements: '',
  salary_range: '',
  currency: '',
  other_info: '',
  keywords: ['STRING'],
  applying_expiry: 'DATE',
  questions: [
    {
      _id: '',
      question_type: 'MULTIBLE CHOICE, CHEK MANY, GIVE SHORT ANSWER',
      question: '',
      answer_options: [{ _id: '', answer_option: '' }]
    }
  ],
  timestamps: 'DATES'
};
// Give chance for the user to save the job on AsyncStorage before submitting it to the server
