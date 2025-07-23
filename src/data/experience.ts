export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    company: 'Tech Company',
    position: 'Senior Frontend Developer',
    startDate: '2022',
    endDate: 'Present',
    description: 'Leading frontend development initiatives and mentoring junior developers.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    company: 'Digital Agency',
    position: 'Full Stack Developer',
    startDate: '2020',
    endDate: '2022',
    description: 'Built responsive web applications for various clients.',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    company: 'Startup Inc',
    position: 'Junior Developer',
    startDate: '2018',
    endDate: '2020',
    description: "Developed features for the company's main product.",
    technologies: ['JavaScript', 'React', 'Express', 'MongoDB'],
  },
];
