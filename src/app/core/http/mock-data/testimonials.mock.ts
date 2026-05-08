import { Testimonial } from '../../models/testimonial.model';

const av = (seed: string) => `https://i.pravatar.cc/160?u=${seed}`;

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-001',
    quote:
      'We replaced four different systems with TenxERP in a single quarter. The month-end close, which used to take eleven days and three Diet Cokes per accountant, now takes four days and a calmer office.',
    author: 'Hina Qureshi',
    role: 'Chief Financial Officer',
    company: 'Mehran Textile Mills',
    avatar: av('hina'),
  },
  {
    id: 't-002',
    quote:
      "What sold us was the audit trail. Every journal line links back to the invoice, the PO, the GRN — and the auditor finished in three days instead of three weeks.",
    author: 'Daniel Okafor',
    role: 'Group Controller',
    company: 'Pelagia Distribution',
    avatar: av('daniel'),
  },
  {
    id: 't-003',
    quote:
      'The HR & Payroll module just works. Six countries, four currencies, six different sets of statutory rules — and our team of two runs the whole thing.',
    author: 'Aliya Rahman',
    role: 'VP of People',
    company: 'Kestrel Logistics',
    avatar: av('aliya'),
  },
  {
    id: 't-004',
    quote:
      'I used to spend Mondays building reports for the board. Now I open a dashboard, screenshot it, and the meeting is over by 10:15.',
    author: 'Marcus Chen',
    role: 'COO',
    company: 'Northwind Foods',
    avatar: av('marcus'),
  },
  {
    id: 't-005',
    quote:
      'TenxERP\'s manufacturing module handles our mixed-mode operation — discrete assembly and continuous process — without the workarounds we needed in our last ERP.',
    author: 'Salma El-Khoury',
    role: 'Director of Operations',
    company: 'Levant Pharmaceuticals',
    avatar: av('salma'),
  },
  {
    id: 't-006',
    quote:
      "Our field service techs used to call back three times per job for parts info. Now everything\'s on the mobile app — first-time-fix rate jumped 22%.",
    author: 'Olu Adeyemi',
    role: 'Service Director',
    company: 'CoolTech HVAC',
    avatar: av('olu'),
  },
];
