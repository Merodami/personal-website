export interface Technology {
  name: string;
  icon: string; // Can be an emoji, svg path, or icon class
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const technologies: Technology[] = [
  // Frontend
  { name: 'React', icon: '⚛️', color: '#61DAFB', size: 'lg' },
  { name: 'Vue', icon: '🟢', color: '#4FC08D', size: 'md' },
  { name: 'TypeScript', icon: '🔷', color: '#3178C6', size: 'lg' },
  { name: 'JavaScript', icon: '🟨', color: '#F7DF1E', size: 'md' },
  { name: 'HTML5', icon: '🟧', color: '#E34C26', size: 'sm' },
  { name: 'CSS3', icon: '🔵', color: '#1572B6', size: 'sm' },
  { name: 'Tailwind', icon: '🎨', color: '#06B6D4', size: 'md' },
  { name: 'Sass', icon: '🎀', color: '#CC6699', size: 'sm' },
  { name: 'Angular', icon: '🔺', color: '#DD0031', size: 'lg' },
  { name: 'Svelte', icon: '🔥', color: '#FF3E00', size: 'md' },
  { name: 'Alpine', icon: '🏔️', color: '#8BC0D0', size: 'sm' },
  { name: 'Remix', icon: '💿', color: '#000000', size: 'md' },

  // Backend
  { name: 'Node.js', icon: '🟩', color: '#339933', size: 'lg' },
  { name: 'Python', icon: '🐍', color: '#3776AB', size: 'md' },
  { name: 'Go', icon: '🐹', color: '#00ADD8', size: 'md' },
  { name: 'Rust', icon: '🦀', color: '#000000', size: 'sm' },
  { name: 'PHP', icon: '🐘', color: '#777BB4', size: 'md' },
  { name: 'Ruby', icon: '💎', color: '#CC342D', size: 'sm' },
  { name: 'Java', icon: '☕', color: '#007396', size: 'lg' },
  { name: 'C#', icon: '🔷', color: '#239120', size: 'md' },
  { name: 'Elixir', icon: '💧', color: '#4B275F', size: 'sm' },
  { name: 'Deno', icon: '🦕', color: '#000000', size: 'md' },

  // Database
  { name: 'PostgreSQL', icon: '🐘', color: '#4169E1', size: 'md' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', size: 'md' },
  { name: 'Redis', icon: '🔴', color: '#DC382D', size: 'sm' },
  { name: 'MySQL', icon: '🐬', color: '#4479A1', size: 'md' },
  { name: 'SQLite', icon: '🪶', color: '#003B57', size: 'sm' },
  { name: 'Cassandra', icon: '👁️', color: '#1287B1', size: 'sm' },
  { name: 'DynamoDB', icon: '🔷', color: '#4053D6', size: 'md' },
  { name: 'Supabase', icon: '⚡', color: '#3ECF8E', size: 'md' },

  // Tools & Services
  { name: 'Docker', icon: '🐳', color: '#2496ED', size: 'md' },
  { name: 'Kubernetes', icon: '☸️', color: '#326CE5', size: 'lg' },
  { name: 'Git', icon: '🔀', color: '#F05032', size: 'sm' },
  { name: 'AWS', icon: '☁️', color: '#FF9900', size: 'lg' },
  { name: 'Azure', icon: '☁️', color: '#0078D4', size: 'lg' },
  { name: 'GCP', icon: '☁️', color: '#4285F4', size: 'lg' },
  { name: 'GraphQL', icon: '◈', color: '#E10098', size: 'md' },
  { name: 'Next.js', icon: '▲', color: '#000000', size: 'md' },
  { name: 'Astro', icon: '🚀', color: '#FF5D01', size: 'lg' },
  { name: 'Vite', icon: '⚡', color: '#646CFF', size: 'md' },
  { name: 'Firebase', icon: '🔥', color: '#FFCA28', size: 'sm' },
  { name: 'Vercel', icon: '▲', color: '#000000', size: 'sm' },
  { name: 'Netlify', icon: '🔷', color: '#00C7B7', size: 'sm' },
  { name: 'Jest', icon: '🃏', color: '#C21325', size: 'sm' },
  { name: 'Cypress', icon: '🌲', color: '#17202C', size: 'md' },
  { name: 'Webpack', icon: '📦', color: '#8DD6F9', size: 'md' },
  { name: 'Rollup', icon: '🎯', color: '#FF6533', size: 'sm' },
  { name: 'Parcel', icon: '📦', color: '#21374B', size: 'sm' },
  { name: 'npm', icon: '📦', color: '#CB3837', size: 'sm' },
  { name: 'Yarn', icon: '🧶', color: '#2C8EBB', size: 'sm' },
  { name: 'pnpm', icon: '🚀', color: '#F69220', size: 'sm' },
  { name: 'Prisma', icon: '◼️', color: '#2D3748', size: 'md' },
  { name: 'Terraform', icon: '🏗️', color: '#7B42BC', size: 'md' },
  { name: 'Jenkins', icon: '🤖', color: '#D24939', size: 'sm' },
  { name: 'GitHub Actions', icon: '⚙️', color: '#2088FF', size: 'md' },
  { name: 'Linux', icon: '🐧', color: '#FCC624', size: 'md' },
  { name: 'Nginx', icon: '🟩', color: '#009639', size: 'sm' },
  { name: 'Apache', icon: '🪶', color: '#D22128', size: 'sm' },
];

// Function to get random technologies
export function getRandomTechnologies(count: number): Technology[] {
  const shuffled = [...technologies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
