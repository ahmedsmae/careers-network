const job = {
  _id: '',
  owner: '',
  position: '',
  location_id: '',
  referance_number: '',
  status: 'AVAILABLE, TAKEN',
  applying_email: '',
  applying_link: '',
  responsibilities: '',
  requirements: '',
  min_salary: '',
  max_salary: '',
  currency: '',
  other_info: '',
  keywords: ['STRING'],
  expiry: 'DATE',
  questions: [
    {
      _id: '',
      question_type: 'MULTIBLE CHOICE, CHEK MANY, GIVE SHORT ANSWER',
      question_text: '',
      answer_options: [{ _id: '', answer_text: '' }]
    }
  ],
  timestamps: 'DATES'
};
// Give chance for the user to save the job on AsyncStorage before submitting it to the server
