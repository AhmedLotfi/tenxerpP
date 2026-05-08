export interface Faq {
  id: string;
  category: 'general' | 'pricing' | 'security' | 'integration' | 'support';
  question: string;
  answer: string;
}
