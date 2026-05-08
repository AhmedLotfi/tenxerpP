import { TeamMember } from '../../models/team.model';

const photo = (seed: string) => `https://i.pravatar.cc/320?u=team-${seed}`;

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'tm-001',
    name: 'Imran Bashir',
    role: 'Co-founder & CEO',
    bio: 'Former finance controller turned ERP product builder. Believes good software respects its users\' attention.',
    photo: photo('imran'),
  },
  {
    id: 'tm-002',
    name: 'Sara Noor',
    role: 'Co-founder & CTO',
    bio: 'Twenty years across Oracle, NetSuite and start-ups. Reads release notes for fun.',
    photo: photo('sara'),
  },
  {
    id: 'tm-003',
    name: 'David Mensah',
    role: 'VP of Product',
    bio: 'Designer-engineer hybrid. Has thoughts about every empty state.',
    photo: photo('david'),
  },
  {
    id: 'tm-004',
    name: 'Layla Hadid',
    role: 'Head of Engineering',
    bio: 'Distributed-systems lead. Believes uptime is a feature, not a metric.',
    photo: photo('layla'),
  },
  {
    id: 'tm-005',
    name: 'Anand Sharma',
    role: 'Director of Customer Success',
    bio: 'Former CFO who once survived three ERP implementations. Now makes sure ours feel different.',
    photo: photo('anand'),
  },
  {
    id: 'tm-006',
    name: 'Mei Wong',
    role: 'Head of Design',
    bio: 'Editorial typography nerd. Makes interfaces that don\'t shout.',
    photo: photo('mei'),
  },
];
