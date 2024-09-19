import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import './App.css';



const UserInfoForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, mobile });
  };

  return (
    <form onSubmit={handleSubmit} className="user-info-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile Number"
        required
      />
      <button type="submit" className="button">Start Test</button>
    </form>
  );
};



const Introduction = ({ onStart }) => (
  <div className="container">
    <h1 className="title">Welcome to the Personality Identifier Test by CyberSharp</h1>
    <h2 className="sub-title">How It Helps</h2>
    <p className="text">
      This test is based on Myers-Briggs Type Indicator (MBTI) framework and helps you understand your personality preferences. It can provide insights into your strengths, weaknesses, and potential career paths.
    </p>
    <h2 className="sub-title">How to Answer the Questions</h2>
    <p className="text">
      This test consists of 60 questions. For each question, choose the option that best describes you. There are no right or wrong answers, so be honest and go with your first instinct.
    <ul className="list">
          <li>Read each statement carefully</li>
          <li>Respond based on your genuine interests, not what you think you should like</li>
          <li>Choose the option that best represents your level of agreement</li>
          <li>Don't overthink – your first instinct is often the most accurate</li>
          <li>Answer all questions for the most accurate results</li>
    </ul>
    </p>
        <h2 className="subtitle">Please provide your information to start the test:</h2>
	<p className="text">
          Since we will be emailing you the results of the test, please ensure your contact details are filled correctly.
        </p>

    <UserInfoForm onSubmit={onStart} />
  </div>
);


const calculatePersonalityType = (scores) => {
  return (scores['E'] > scores['I'] ? 'E' : 'I') +
         (scores['S'] > scores['N'] ? 'S' : 'N') +
         (scores['T'] > scores['F'] ? 'T' : 'F') +
         (scores['J'] > scores['P'] ? 'J' : 'P');
};


const questions = [
  
  { text: "You find it easy to introduce yourself to other people.", category: "E/I" },
  { text: "You do not usually initiate conversations", category: "I/E" },
  { text: "You are usually highly motivated and energetic.", category: "E/I" },
  { text: "You prefer to work on projects alone rather than in a team", category: "I/E" },
  { text: "You enjoy being the center of attention at social gatherings.", category: "E/I" },
  { text: "You often take initiative in social situations.", category: "E/I" },
  { text: "You find it draining to be in social situations for too long.", category: "I/E" },
  { text: "You enjoy having a wide circle of acquaintances.", category: "E/I" },
  { text: "You prefer small, intimate gatherings over large parties.", category: "I/E" },
  { text: "You feel comfortable in unfamiliar situations.", category: "E/I" },
  { text: "You find it difficult to introduce yourself to other people.", category: "I/E" },
  { text: "You enjoy giving presentations or speeches.", category: "E/I" },
  { text: "You tend to avoid drawing attention to yourself.", category: "I/E" },
  { text: "You find it energizing to be in busy, social environments.", category: "E/I" },
  { text: "You prefer to listen rather than to speak in group discussions.", category: "I/E" },

  { text: "You often get so lost in thoughts that you ignore or forget your surroundings.", category: "S/N" },
  { text: "You rarely do something just out of sheer curiosity.", category: "S/N" },
  { text: "You tend to focus more on the big picture rather than the details.", category: "N/S" },
  { text: "You often rely on your experience rather than theoretical concepts.", category: "S/N" },
  { text: "You enjoy thinking about abstract theories and ideas.", category: "N/S" },
  { text: "You prefer practical solutions over innovative but untested ideas.", category: "S/N" },
  { text: "You are more interested in future possibilities than immediate realities.", category: "N/S" },
  { text: "You are more of a realist than a visionary.", category: "S/N" },
  { text: "You often contemplate the complexity of life.", category: "N/S" },
  { text: "You enjoy discussing various interpretations of a book/movie.", category: "N/S" },
  { text: "You tend to focus on facts rather than possibilities.", category: "S/N" },
  { text: "You often think about how things could be improved.", category: "N/S" },
  { text: "You enjoy exploring new ideas and concepts.", category: "N/S" },
  { text: "You often rely on your intuition when making decisions.", category: "N/S" },
  { text: "You are more interested in what is actual than what is possible.", category: "S/N" },

  { text: "You find it easy to stay relaxed even when there is some pressure.", category: "T/F" },
  { text: "You feel superior to other people.", category: "T/F" },
  { text: "Winning a debate matters less to you than making sure no one gets upset.", category: "T/F" },
  { text: "In decision making, you prioritize logic over emotions.", category: "T/F" },
  { text: "You find it easy to empathize with people's feelings.", category: "F/T" },
  { text: "You value objective truth over personal feelings.", category: "T/F" },
  { text: "You often make decisions based on your emotions.", category: "F/T" },
  { text: "You believe efficiency is more important than cooperation.", category: "T/F" },
  { text: "You find it easy to see things from someone else's point of view.", category: "F/T" },
  { text: "You believe that truth is more important than people's sensitivities.", category: "T/F" },
  { text: "You prefer to follow your heart rather than your head.", category: "F/T" },
  { text: "You find it easy to stay calm in stressful situations.", category: "T/F" },
  { text: "You make decisions with your head rather than your heart.", category: "T/F" },
  { text: "You find it difficult to work on emotional problems.", category: "T/F" },
  { text: "You find it easy to recognize others' feelings.", category: "F/T" },

  { text: "You try to respond to your e-mails as soon as possible and cannot stand a messy inbox.", category: "J/P" },
  { text: "Being organized is more important to you than being adaptable.", category: "J/P" },
  { text: "You prefer to have a structured daily routine.", category: "J/P" },
  { text: "You like to keep your options open rather than make definite plans.", category: "P/J" },
  { text: "You prefer to have a to-do list for your day.", category: "J/P" },
  { text: "You are comfortable with last-minute changes to plans.", category: "P/J" },
  { text: "You like to plan your vacations in detail.", category: "J/P" },
  { text: "You often do things spontaneously.", category: "P/J" },
  { text: "You always have a backup plan.", category: "J/P" },
  { text: "You like to finish one project before starting another.", category: "J/P" },
  { text: "You prefer flexible work environments over structured ones.", category: "P/J" },
  { text: "You prefer to have detailed instructions for tasks.", category: "J/P" },
  { text: "You prefer to go with the flow rather than have a set schedule.", category: "P/J" },
  { text: "You like to have everything in its proper place.", category: "J/P" },
  { text: "You prefer to have a flexible schedule rather than a structured routine.", category: "P/J" }

];

const Question = ({ question, onAnswer }) => (
  <div className="container">
    <h2 className="question-text">{question.text}</h2>
    <div className="answer-container">
      <button onClick={() => onAnswer(2)} className="answer-button strongly-agree">Strongly Agree</button>
      <button onClick={() => onAnswer(1)} className="answer-button agree">Agree</button>
      <button onClick={() => onAnswer(0)} className="answer-button neutral">Neutral</button>
      <button onClick={() => onAnswer(-1)} className="answer-button disagree">Disagree</button>
      <button onClick={() => onAnswer(-2)} className="answer-button strongly-disagree">Strongly Disagree</button>
    </div>
  </div>
);


const personalityDescriptions = {
  'ISTJ': 'ISTJs are responsible, loyal, and practical individuals. They are organized and dependable, with a strong sense of duty. They excel in creating and maintaining order in both their personal and professional lives. ISTJs are detail-oriented and prefer to work within established systems and traditions. They value stability, honesty, and clear expectations. In the workplace, they are often the backbone of organizations, ensuring that tasks are completed efficiently and correctly.',

  'ISFJ': 'ISFJs are caring, reliable, and observant individuals. They have a strong sense of responsibility and are dedicated to fulfilling their duties. ISFJs are attentive to the needs of others and often put others well-being before their own. They have an excellent memory for details, especially those related to people they care about. In work environments, ISFJs thrive in supportive roles and are known for their patience, precision, and ability to create harmonious atmospheres.',

  'INFJ': 'INFJs are insightful, idealistic, and deeply compassionate. They have a unique ability to understand complex patterns in human behavior and are often described as having an almost psychic intuition about others. INFJs are driven by a strong sense of purpose and a desire to make the world a better place. They are creative problem-solvers who can see multiple perspectives. In their careers, INFJs often gravitate towards roles that allow them to help others and contribute to society in meaningful ways.',

  'INTJ': 'INTJs are strategic, innovative, and independent thinkers. They excel at seeing the big picture and developing long-term plans to achieve their goals. INTJs are naturally curious and enjoy theoretical and complex concepts. They have high standards for themselves and others, always striving for improvement and efficiency. In their professional lives, INTJs are often drawn to fields that challenge them intellectually and allow them to implement their innovative ideas.',

  'ISTP': 'ISTPs are adaptable, action-oriented, and practical problem-solvers. They have a keen understanding of how things work and enjoy hands-on experiences. ISTPs are often described as "quiet observers" until a problem arises, at which point they jump into action. They value efficiency and logic, and are skilled at finding quick solutions to practical challenges. In their careers, ISTPs often excel in fields that require troubleshooting, quick thinking, and practical application of skills.',

  'ISFP': 'ISFPs are gentle, sensitive, and imaginative individuals. They have a strong aesthetic sense and often express themselves through art or other creative pursuits. ISFPs live in the moment and are open to new experiences. They have a deep appreciation for beauty in nature and in human creations. In the workplace, ISFPs thrive in environments that allow them to express their creativity and work on projects that align with their personal values.',

  'INFP': 'INFPs are idealistic, empathetic, and value-driven individuals. They have a deep sense of personal ethics and are always striving to live in alignment with their values. INFPs are creative and often have a gift for language and writing. They are interested in understanding people and helping them reach their potential. In their careers, INFPs often seek out roles that allow them to make a positive impact on others and contribute to causes they believe in.',

  'INTP': 'INTPs are logical, creative, and analytical thinkers. They excel at spotting patterns and developing innovative theories. INTPs have a thirst for knowledge and enjoy exploring complex ideas and possibilities. They value precision in thought and language. In the workplace, INTPs are often drawn to fields that challenge them intellectually and allow them to use their problem-solving skills to develop new systems or theories.',

  'ESTP': 'ESTPs are energetic, action-oriented, and pragmatic individuals. They are natural problem-solvers who excel in crisis situations. ESTPs live in the moment and are skilled at reading people and situations. They enjoy taking risks and have a talent for persuasion. In their careers, ESTPs often thrive in fast-paced environments that require quick thinking and adaptability.',

  'ESFP': 'ESFPs are outgoing, friendly, and spontaneous individuals. They have a zest for life and enjoy being the center of attention. ESFPs are practical and grounded in the present moment, with a talent for making the most out of any situation. They have a natural ability to entertain and bring joy to others. In the workplace, ESFPs often excel in roles that allow them to interact with people and use their creativity and enthusiasm.',

  'ENFP': 'ENFPs are enthusiastic, creative, and people-oriented individuals. They have a contagious energy and are skilled at inspiring others. ENFPs are imaginative and always looking for new possibilities and connections. They value personal growth and helping others reach their potential. In their careers, ENFPs often gravitate towards roles that allow them to use their creativity, work with people, and contribute to causes they believe in.',

  'ENTP': 'ENTPs are innovative, strategic, and debative thinkers. They enjoy intellectual challenges and are skilled at seeing possibilities and connections that others might miss. ENTPs are quick-witted and enjoy engaging in spirited debates. They are adaptable and always eager to explore new ideas. In the workplace, ENTPs often excel in roles that allow them to innovate, solve complex problems, and challenge conventional thinking.',

  'ESTJ': 'ESTJs are organized, practical, and decisive individuals. They have a talent for managing people and resources efficiently. ESTJs value tradition, security, and clear structures. They are dependable and take their responsibilities seriously. In their careers, ESTJs often thrive in leadership positions where they can implement systems, maintain order, and achieve concrete results.',

  'ESFJ': 'ESFJs are warm, conscientious, and cooperative individuals. They have a strong desire to be of service to others and create harmony in their environment. ESFJs are attentive to the needs of others and skilled at creating a sense of belonging. They value tradition and security. In the workplace, ESFJs often excel in roles that allow them to work directly with people, organize events or projects, and contribute to a positive team atmosphere.',

  'ENFJ': 'ENFJs are charismatic, empathetic, and natural leaders. They have a gift for understanding and inspiring others. ENFJs are driven by a desire to help people reach their potential and often take on a mentoring role. They are skilled at building consensus and fostering cooperation. In their careers, ENFJs often gravitate towards roles in education, counseling, or organizational development where they can have a positive impact on others.',

  'ENTJ': 'ENTJs are strategic, assertive, and natural leaders. They have a talent for seeing the big picture and developing long-term plans to achieve goals. ENTJs are decisive and enjoy taking charge of situations. They value competence and logical thinking. In the workplace, ENTJs often excel in leadership positions where they can implement their vision, drive change, and maximize efficiency.'

};


const careerResources = [
  { name: 'National Career Service', url: 'https://www.ncs.gov.in/' },
  { name: 'Ministry of Skill Development and Entrepreneurship', url: 'https://www.msde.gov.in/' },
  { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/' },
  { name: 'Naukri.com', url: 'https://www.naukri.com/' },
  { name: 'Indeed India', url: 'https://in.indeed.com/' },
];

const Result = ({ scores, onSave, onShare, userInfo }) => {
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const data = sortedScores.map(([name, value]) => ({ name, value }));

  const getPersonalityType = () => {
    return (scores['E'] > scores['I'] ? 'E' : 'I') +
           (scores['S'] > scores['N'] ? 'S' : 'N') +
           (scores['T'] > scores['F'] ? 'T' : 'F') +
           (scores['J'] > scores['P'] ? 'J' : 'P');
  };

  const personalityType = getPersonalityType();


  const careerSuggestions = {
   'ISTJ': [
    'Chartered Accountant',
    'Bank Manager',
    'Tax Consultant',
    'Civil Servant (IAS, IPS)',
    'Military Officer',
    'Lawyer',
    'Judge',
    'Financial Analyst',
    'Project Manager',
    'Quality Assurance Manager',
    'Systems Analyst',
    'Logistics Coordinator',
    'Compliance Officer',
    'Database Administrator',
    'Forensic Accountant'
   ],
  
   'ISFJ': [
    'Teacher',
    'Nurse',
    'Social Worker',
    'Human Resources Specialist',
    'Librarian',
    'Counselor',
    'Nutritionist',
    'Veterinarian',
    'Dental Hygienist',
    'Office Manager',
    'Paralegal',
    'Pharmacist',
    'Medical Laboratory Technician',
    'Bank Teller',
    'Customer Service Representative'
   ],
  
   'INFJ': [
    'Psychologist',
    'Writer',
    'Life Coach',
    'NGO Worker',
    'Spiritual Leader',
    'Career Counselor',
    'Human Rights Advocate',
    'Environmental Scientist',
    'Art Therapist',
    'User Experience Designer',
    'Corporate Trainer',
    'Social Media Manager',
    'Wellness Consultant',
    'Education Consultant',
    'Organizational Development Specialist'
   ],
  
   'INTJ': [
    'Management Consultant',
    'Investment Banker',
    'Data Scientist',
    'Software Architect',
    'Research Scientist',
    'Economist',
    'Cybersecurity Analyst',
    'Strategic Planner',
    'Financial Advisor',
    'Robotics Engineer',
    'Intellectual Property Lawyer',
    'Neurosurgeon',
    'Artificial Intelligence Specialist',
    'Business Analyst',
    'University Professor'
   ],
  
   'ISTP': [
    'Mechanical Engineer',
    'Forensic Scientist',
    'Pilot',
    'Emergency Medical Technician',
    'Automotive Technician',
    'Civil Engineer',
    'Firefighter',
    'Electrical Engineer',
    'Architect',
    'Police Detective',
    'Computer Hardware Engineer',
    'Agriculture Specialist',
    'Structural Engineer',
    'Robotics Technician',
    'Sports Physiotherapist'
   ],
  
   'ISFP': [
    'Graphic Designer',
    'Fashion Designer',
    'Chef',
    'Photographer',
    'Interior Designer',
    'Makeup Artist',
    'Landscape Architect',
    'Physical Therapist',
    'Yoga Instructor',
    'Veterinary Technician',
    'Jewellery Designer',
    'Music Therapist',
    'Occupational Therapist',
    'Textile Designer',
    'Film Editor'
   ],
  
   'INFP': [
    'Content Writer',
    'Journalist',
    'Poet',
    'Psychotherapist',
    'Environmental Activist',
    'Social Media Influencer',
    'Translator',
    'Anthropologist',
    'Librarian',
    'Music Composer',
    'Art Director',
    'Meditation Instructor',
    'Non-profit Organizer',
    'Guidance Counselor',
    'Holistic Health Practitioner'
   ],
  
   'INTP': [
    'Software Developer',
    'Theoretical Physicist',
    'Mathematician',
    'Systems Analyst',
    'Biomedical Researcher',
    'Economist',
    'Philosopher',
    'University Professor',
    'Data Analyst',
    'Aerospace Engineer',
    'Artificial Intelligence Researcher',
    'Game Developer',
    'Cryptographer',
    'Quantum Computing Researcher',
    'Nanotechnologist'
   ],
  
   'ESTP': [
    'Entrepreneur',
    'Sales Manager',
    'Sports Coach',
    'Real Estate Agent',
    'Emergency Room Doctor',
    'Stockbroker',
    'Detective',
    'Advertising Account Executive',
    'Tour Guide',
    'Event Planner',
    'Professional Athlete',
    'Firefighter',
    'Paramedic',
    'Flight Attendant',
    'Construction Manager'
   ],
  
   'ESFP': [
    'Actor',
    'TV Host',
    'Event Planner',
    'Travel Agent',
    'Personal Trainer',
    'Salesperson',
    'Flight Attendant',
    'Restaurant Owner',
    'Preschool Teacher',
    'Tour Guide',
    'Public Relations Specialist',
    'Brand Ambassador',
    'Wedding Planner',
    'Social Media Influencer',
    'Customer Experience Manager'
   ],
  
   'ENFP': [
    'Journalist',
    'Advertising Creative Director',
    'Motivational Speaker',
    'Human Resources Manager',
    'Marketing Specialist',
    'Entrepreneur',
    'Life Coach',
    'Actor',
    'Public Relations Specialist',
    'TV Producer',
    'Social Media Manager',
    'Educational Consultant',
    'Art Director',
    'Brand Strategist',
    'Corporate Trainer'
   ],
  
   'ENTP': [
    'Startup Founder',
    'Lawyer',
    'Political Consultant',
    'Venture Capitalist',
    'Creative Director',
    'Management Consultant',
    'Software Developer',
    'Innovation Manager',
    'Market Research Analyst',
    'Product Manager',
    'Ethical Hacker',
    'Futurist',
    'Technology Evangelist',
    'Business Development Manager',
    'Intellectual Property Lawyer'
   ],
  
   'ESTJ': [
    'Chief Executive Officer',
    'Project Manager',
    'School Principal',
    'Military Officer',
    'Judge',
    'Financial Manager',
    'Operations Manager',
    'Police Officer',
    'Auditor',
    'Hotel Manager',
    'Insurance Agent',
    'Real Estate Developer',
    'Logistics Manager',
    'Bank Manager',
    'Corporate Lawyer'
   ],
  
   'ESFJ': [
    'Human Resources Manager',
    'Nurse',
    'Elementary School Teacher',
    'Event Planner',
    'Sales Representative',
    'Social Worker',
    'Public Relations Specialist',
    'Dietitian',
    'Office Manager',
    'Customer Service Manager',
    'Fundraiser',
    'Hotel Manager',
    'Wedding Planner',
    'Healthcare Administrator',
    'Community Organizer'
   ],
  
   'ENFJ': [
    'Teacher',
    'Corporate Trainer',
    'Human Resources Director',
    'Politician',
    'Life Coach',
    'Non-profit Executive',
    'Counselor',
    'Organizational Development Consultant',
    'Public Relations Manager',
    'Customer Experience Manager',
    'Motivational Speaker',
    'College Admissions Counselor',
    'Diversity and Inclusion Specialist',
    'Brand Manager',
    'Social Entrepreneur'
   ],
  
   'ENTJ': [
    'Chief Executive Officer',
    'Management Consultant',
    'Entrepreneur',
    'Lawyer',
    'Investment Banker',
    'Business Development Director',
    'Political Strategist',
    'Executive Coach',
    'University Dean',
    'Corporate Strategist',
    'Technology Executive',
    'Venture Capitalist',
    'International Business Consultant',
    'Chief Information Officer',
    'Organizational Change Consultant'
   ]
  };


  return (
    <div className="container">
      <h1 className="title">Your Results</h1>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Personality" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {sortedScores.map(([category, score]) => (
        <p key={category} className="score-text">
          {category}: {score.toFixed(2)}%
        </p>
      ))}
      <h2 className="subtitle">Your Personality Type: {personalityType}</h2>
      <p className="description">
        {personalityDescriptions[personalityType]}
      </p>
      <h2 className="subtitle">Suggested Careers in India:</h2>
      <ul className="career-list">
        {careerSuggestions[personalityType].map((career, index) => (
          <li key={index} className="career-text">{career}</li>
        ))}
      </ul>
      <h2 className="subtitle">Career Resources:</h2>
      <ul className="resource-list">
        {careerResources.map((resource, index) => (
          <li key={index}>
            <a href={resource.url} className="link-text" target="_blank" rel="noopener noreferrer">
              {resource.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={onSave} className="button save-button">Save Results</button>
        <button onClick={onShare} className="button share-button">Share Results</button>
      </div>
     </div>
    );
  };


const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [userInfo, setUserInfo] = useState(null);
  const [scores, setScores] = useState({
    'E': 0, 'I': 0, 'S': 0, 'N': 0, 'T': 0, 'F': 0, 'J': 0, 'P': 0
  });

  const handleStart = (info) => {
    setUserInfo(info);
    setCurrentQuestion(0);
  };

  const handleAnswer = (answer) => {
    const question = questions[currentQuestion];
    const [category1, category2] = question.category.split('/');
    setScores(prevScores => ({
      ...prevScores,
      [category1]: prevScores[category1] + answer,
      [category2]: prevScores[category2] - answer
    }));
    setCurrentQuestion(currentQuestion + 1);
  };

  const calculateFinalScores = () => {
    const maxScore = questions.length * 2; // Maximum possible score for each category
    const finalScores = {};
    for (let category in scores) {
      finalScores[category] = ((scores[category] + maxScore) / (2 * maxScore)) * 100;
    }
    return finalScores;
  };

  const handleSave = () => {
    const finalScores = calculateFinalScores();
    const personalityType = calculatePersonalityType(finalScores);

    const dataToSave = {
      userInfo,
      scores: finalScores,
      personalityType
    };
    localStorage.setItem('mbtiResults', JSON.stringify(dataToSave));
    alert('Results saved successfully!');
  };


  const handleShare = () => {
    const finalScores = calculateFinalScores();
    const personalityType = calculatePersonalityType(finalScores);

    const message = `${userInfo.name}'s MBTI Results:\nPersonality Type: ${personalityType}\n${Object.entries(finalScores).map(([key, value]) => `${key}: ${value.toFixed(2)}%`).join('\n')}`;
    if (navigator.share) {
      navigator.share({
        title: 'My MBTI Results',
        text: message,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser. You can copy the following text:\n\n' + message);
    }
  };


if (currentQuestion === -1) {
    return <Introduction onStart={handleStart} />;
  }

  if (currentQuestion < questions.length) {
    return <Question question={questions[currentQuestion]} onAnswer={handleAnswer} />;
  }

  return <Result 
    scores={calculateFinalScores()} 
    onSave={handleSave} 
    onShare={handleShare}
    userInfo={userInfo}
  />;
};



export default App;