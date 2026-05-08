import { Faq } from '../../models/faq.model';

export const MOCK_FAQS: Faq[] = [
  {
    id: 'q1',
    category: 'general',
    question: 'How long does a typical TenxERP deployment take?',
    answer:
      'For a single-entity, mid-sized deployment with 4–6 modules, plan on 8–12 weeks from kickoff to go-live. Multi-entity, multi-country deployments range from 4 to 9 months. We share a milestone plan in week one and stand by it.',
  },
  {
    id: 'q2',
    category: 'pricing',
    question: 'How is TenxERP priced?',
    answer:
      'Per-seat-per-month for each active module. Implementation, training and support are quoted separately based on scope. There are no per-feature unlocks — every feature within a module is included.',
  },
  {
    id: 'q3',
    category: 'pricing',
    question: 'Is there a free trial?',
    answer:
      'Yes — we provision a 30-day sandbox seeded with industry-relevant sample data. The sandbox is fully functional except for outbound integrations (email, payment gateways), which we enable on request.',
  },
  {
    id: 'q4',
    category: 'security',
    question: 'Where is our data hosted? Can we self-host?',
    answer:
      'TenxERP runs on AWS (Frankfurt, Singapore, Bahrain regions) by default. Self-hosting on your own AWS / Azure / GCP account or on-premise is supported under our Enterprise plan.',
  },
  {
    id: 'q5',
    category: 'security',
    question: 'What about data backup and disaster recovery?',
    answer:
      'Encrypted snapshots every 6 hours, retained for 35 days. Cross-region replication for Enterprise customers. Documented RPO of 6 hours, RTO of 4 hours, with a quarterly DR drill.',
  },
  {
    id: 'q6',
    category: 'integration',
    question: 'How do we integrate with our existing systems?',
    answer:
      'Every entity in TenxERP is exposed via REST. Webhooks fire on every business event. We ship pre-built connectors for Shopify, Salesforce, HubSpot, QuickBooks, Stripe, Microsoft 365, and Google Workspace. Custom integrations are typically 2–4 weeks.',
  },
  {
    id: 'q7',
    category: 'integration',
    question: 'Can we migrate from QuickBooks / Tally / SAP / NetSuite?',
    answer:
      'Yes — our migration team has run hundreds of these. We provide templates for chart of accounts, customers, vendors, items, open transactions, and historical data. Typical data migration takes 2–6 weeks depending on data quality.',
  },
  {
    id: 'q8',
    category: 'support',
    question: 'What does support look like?',
    answer:
      'All plans include email and in-app chat support during business hours (Mon–Fri 09:00–18:00 in your timezone). Priority and Enterprise plans add 24/7 phone support and a dedicated customer success manager.',
  },
  {
    id: 'q9',
    category: 'support',
    question: 'Do you offer training?',
    answer:
      'Implementation includes role-based training for all key users. Ongoing customers have access to TenxERP Academy — self-paced courses, monthly live workshops, and quarterly user conferences.',
  },
  {
    id: 'q10',
    category: 'general',
    question: 'Can we customise TenxERP without breaking upgrades?',
    answer:
      'Yes. Customisations live in a separate layer — custom fields, custom forms, custom reports, custom workflows — that survives platform upgrades. Heavy customisation (custom modules) is supported via our SDK.',
  },
];
