export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  phone?: string;
  interest: 'demo' | 'pricing' | 'migration' | 'partnership';
  message: string;
}
