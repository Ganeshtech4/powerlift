// src/data/teamMembers.js
const TeamImg1 = `${process.env.PUBLIC_URL}/images/team/team-1-1.jpg`;
const TeamImg2 = `${process.env.PUBLIC_URL}/images/team/team-1-2.jpg`;
const TeamImg3 = `${process.env.PUBLIC_URL}/images/team/team-1-3.jpg`;
const TeamImg4 = `${process.env.PUBLIC_URL}/images/team/team-1-4.jpg`;
const TeamImg5 = `${process.env.PUBLIC_URL}/images/team/team-1-5.jpg`;
const TeamImg6 = `${process.env.PUBLIC_URL}/images/team/team-1-6.jpg`;
const TeamImg7 = `${process.env.PUBLIC_URL}/images/team/team-1-7.jpg`;
const TeamImg8 = `${process.env.PUBLIC_URL}/images/team/team-1-8.jpg`;
const TeamImg9 = `${process.env.PUBLIC_URL}/images/team/team-1-9.jpg`;
const TeamImg10 = `${process.env.PUBLIC_URL}/images/team/team-1-10.jpg`;
const TeamImg11 = `${process.env.PUBLIC_URL}/images/team/team-1-11.jpg`;
const TeamImg12 = `${process.env.PUBLIC_URL}/images/team/team-1-12.jpg`;

const teamMembers = [
  {
    id: 'rekha',
    name: "Inturi Rekha",
    role: "President, WPC Telangana | First Female International Referee",
    img: TeamImg1,
    description:
      "Inturi Rekha is a trailblazer in the world of powerlifting, recognized for her strength, resilience, and leadership...",
    achievements: [
      "World Powerlifting Champion (2023): Gold medal in the 75 kg open class.",
      "World Cup Best Lifter (2023, Kyrgyzstan)",
      "Strong Woman of India",
      "First Female International Referee"
    ],
    leadership:
      "She has established training facilities, mentors aspiring athletes, especially women, and advocates for better infrastructure.",
    philosophy:
      "Sports build physical strength, confidence, and leadership. Rekha inspires athletes to overcome barriers.",
    contact: {
      phone: "+91 73307 78111",
      email: "powerliftingassociationofts@gmail.com"
    }
  },
  {
    id: "kumari",
    name: "Inturi Kumari",
    role: "Chairman, WPC Telangana",
    img: TeamImg2,
    description:
      "Chairman of WPC Telangana and mother of Rekha. She's a mentor, leader, and champion for women's empowerment in powerlifting.",
    achievements: [],
    leadership:
      "Provides strategic direction and moral support to athletes and leadership.",
    philosophy:
      "Believes in supporting youth and building a stronger community through sports.",
  },
  {
    id: "pradeep",
    name: "Dr.H.A.Pradeep Kumar",
    role: "Vice Chairman, WPC Telangana",
    img: TeamImg3,
    description:
      "Vice President with over 30 years of international business experience. Medalist in Asian Powerlifting Championship.",
    achievements: [
      "Asian Powerlifting Medalist (2010, Mongolia)",
      "Karnataka Krista Rathna Award (2013)"
    ],
    leadership:
      "Guides strategy, builds athlete support systems, and promotes grassroots participation.",
    philosophy:
      "Uses sports to teach discipline, teamwork, and long-term success.",
  },
  {
    id: "vijay",
    name: "Mr.G.Vijay",
    role: "Treasurer, WPC Telangana",
    img: TeamImg7,
    description:
      "Managing Director of Comfort Wheels, responsible for financial planning and execution in WPC Telangana.",
    achievements: [],
    leadership:
      "Ensures transparency and efficient allocation of resources to support athletes.",
    philosophy:
      "Believes sound management leads to athletic success.",
  },
  {
    id: "guru",
    name: "Mr.Guru Parminder Singh",
    role: "State Secretary, WPC Telangana",
    img: TeamImg6,
    description:
      "Celebrity fitness trainer, Mr. India, Mr. South India, Mr. Telangana (Bodybuilding).",
    achievements: [
      "Mr. India",
      "Mr. South India",
      "Mr. Telangana"
    ],
    leadership:
      "Expands opportunities for state-level participation and trains athletes for top-tier competitions.",
    philosophy:
      "Holistic training and nutrition unlock full potential.",
    contact: {
      phone: "+91 9542642815",
      email: "wpctelanganastatesecretary@gmail.com"
    }
  },
  {
    id: "mazhar",
    name: "Mr.Mir Mazhar Ali Khan",
    role: "President - Hyderabad District, WPC Telangana",
    img: TeamImg10,
    description:
      "Model, lifestyle coach, and fitness advocate. Promotes youth participation and self-belief.",
    achievements: [],
    leadership:
      "Leads Hyderabad district competitions and empowers new athletes.",
    philosophy:
      "Confidence, fitness, and discipline change lives.",
  },
  {
    id: "abhilash",
    name: "Mr.Abhilash Babde",
    role: "President - Rangareddy, WPC Telangana",
    img: TeamImg9,
    description:
      "Wrestling & boxing coach, fitness consultant, and photographer. Encourages cross-discipline athlete development.",
    achievements: [],
    leadership:
      "Boosted district-level participation and structured growth.",
    philosophy:
      "Fitness + creativity = success. Aims to shape champions with heart and hustle.",
  },
  {
    id: "kiran",
    name: "Mr.Kiran Kumar",
    role: "President - Medchal, WPC Telangana",
    img: TeamImg12,
    description:
      "Mr. India, Mr. Asia, Mr. World titleholder. Partnered with his wife Maria Simran (powerlifting champion) to grow talent.",
    achievements: [
      "Mr. India",
      "Mr. Asia",
      "Mr. World"
    ],
    leadership:
      "Created robust talent pipelines in Medchal district.",
    philosophy:
      "Empower families and communities through shared sporting journeys.",
  },
  {
    id: "abdul",
    name: "Mr.Abdul Ateeq",
    role: "Secretary - Hyderabad, WPC Telangana",
    img: TeamImg5,
    description:
      "Certified trainer and wellness consultant. Focuses on holistic fitness and wellness.",
    achievements: [],
    leadership:
      "Organizes events, mentors athletes, and promotes nutrition and physical training.",
    philosophy:
      "Health is holistic. Strength starts from within.",
  },
  {
    id: "moneess",
    name: "Mr.Moneess Pulelu",
    role: "Secretary - Rangareddy, WPC Telangana",
    img: TeamImg4,
    description:
      "Entrepreneur, CrossFit Level 2 Trainer, and strength coach. Competed in WPC Open World & Asia Cup (2023/24).",
    achievements: [
      "2023/24 KGZ WPC Open World & Asia Cup Competitor"
    ],
    leadership:
      "Hosts competitions and provides hands-on athlete coaching.",
    philosophy:
      "Discipline + training = transformation. Champions are made, not born.",
  },
  {
    id: "manoj",
    name: "Mr.Deeti Manoj Kumar",
    role: "State Media Coordinator, WPC Telangana",
    img: TeamImg8,
    description:
      "Physiotherapist, athletic trainer, and Asian powerlifting champion. Supports athletes with rehab and training.",
    achievements: [
      "Asian Powerlifting Champion",
      "International Powerlifting Player"
    ],
    leadership:
      "Communicates athlete stories and coordinates media for WPC Telangana.",
    philosophy:
      "Visibility fuels inspiration. Showcasing success matters.",
  },
  {
    id: "sukanya",
    name: "Ms.Sukanya Chowdary",
    role: "State Media Coordinator, WPC Telangana",
    img: TeamImg11,
    description:
      "Founder of Inkspirestorie, author, and parent of champion daughters. Designs WPC media and graphics.",
    achievements: [],
    leadership:
      "Guides athletes as a parent and communicator, focusing on stories that inspire.",
    philosophy:
      "Support, storytelling, and passion power the next generation of athletes.",
  },
];

export default teamMembers;
