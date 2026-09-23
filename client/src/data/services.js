export const services = [
	{
		id: 'web-saas',
		slug: 'web-saas',
		num: '01',
		name: 'Web & SaaS Development',
		short: 'Scalable websites, web applications and SaaS platforms designed for startups, businesses and growing products.',
		icon: '⌘',
		startingPrice: '₹15,000+',
		typicalTimeline: '2 to 10 weeks',
		overview:
			'TechRizers architects and engineers web platforms that combine high visual fidelity with enterprise-grade resilience. Whether you need a high-converting marketing site, a custom client portal, or a multi-tenant SaaS application, we deliver clean, maintainable software engineered to scale.',
		whatWeBuild: [
			'High-Conversion Landing Pages',
			'Corporate & Business Web Portals',
			'Full-Featured E-commerce Platforms',
			'Custom Web Applications & Dashboards',
			'SaaS Prototypes & MVPs',
			'Enterprise Multi-Tenant SaaS Systems'
		],
		features: [
			'Server-Side Rendering & Next/Vite Optimization',
			'Robust Role-Based Access Control (RBAC)',
			'REST & GraphQL API Architecture',
			'Automated Billing, Stripe/Razorpay/PhonePe Integration',
			'Real-Time WebSocket Data Streams',
			'Cloud Infrastructure & CI/CD Pipelines'
		],
		technology: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'],
		process: [
			{ step: '01', title: 'Architecture & Scope', desc: 'Define tech stack, data schemas, API contracts, and user flows.' },
			{ step: '02', title: 'UI/UX & Prototyping', desc: 'Craft modern Figma layouts and responsive interactive mockups.' },
			{ step: '03', title: 'Full-Stack Engineering', desc: 'Sprint-based frontend and backend implementation with clean code.' },
			{ step: '04', title: 'QA, Security & Launch', desc: 'Automated test suites, security hardening, and zero-downtime deployment.' }
		],
		capabilities: [
			'Landing Pages',
			'Business / Corporate Websites',
			'E-commerce Platforms',
			'Custom Web Applications',
			'SaaS MVP Development',
			'SaaS Product Development',
			'SaaS Dashboards',
			'Admin Panels',
			'API Development',
			'Backend Development',
			'Database Integration',
			'Authentication & Authorization',
			'Cloud Deployment',
			'Maintenance & Support'
		],
		packages: [
			['Basic / Landing Page', '₹15,000+'],
			['Business / Corporate Website', '₹40,000+'],
			['E-commerce Website', '₹60,000+'],
			['Custom Web Application', '₹1,50,000+'],
			['SaaS Prototype', '₹1.5L+'],
			['SaaS MVP', '₹3L+'],
			['Growth SaaS', '₹6L+'],
			['Production SaaS', '₹10L+'],
			['Enterprise SaaS', '₹20L+']
		],
		faqs: [
			{ q: 'Can you build a SaaS MVP from scratch?', a: 'Yes. We take your initial product vision from scope and architecture through to a production-ready MVP complete with user authentication, billing, database persistence, and deployment.' },
			{ q: 'Do you provide maintenance after launch?', a: 'Yes. We offer continuous support retainers covering performance monitoring, security updates, feature enhancements, and cloud optimization.' },
			{ q: 'Who owns the intellectual property and source code?', a: 'You retain 100% ownership of all source code, design assets, and intellectual property developed for your project.' }
		]
	},
	{
		id: 'mobile-app',
		slug: 'mobile-app',
		num: '02',
		name: 'Mobile App Development',
		short: 'Production-ready mobile applications designed for Android, iOS and cross-platform environments.',
		icon: '◫',
		startingPrice: '₹1.5L+',
		typicalTimeline: '4 to 12 weeks',
		overview:
			'We design and build fast, intuitive mobile applications that users love. Utilizing React Native and Flutter, we deliver unified native performance on both Android and iOS while maximizing code reuse and accelerating time to market.',
		whatWeBuild: [
			'Consumer & Social Mobile Apps',
			'B2B Operations & Logistics Tools',
			'E-commerce & On-Demand Delivery Apps',
			'Service Booking & Marketplace Platforms',
			'AI-Powered Mobile Assistants'
		],
		features: [
			'Cross-Platform Native Experience',
			'Offline-First Data Synchronization',
			'Biometric Authentication & Secure Storage',
			'Push Notification Infrastructure (FCM/APNS)',
			'Smooth 60fps Micro-Animations',
			'App Store & Play Store Publishing Support'
		],
		technology: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase', 'GraphQL', 'Fastlane'],
		process: [
			{ step: '01', title: 'User Journey Mapping', desc: 'Detail screen flows, tap targets, edge states, and device capabilities.' },
			{ step: '02', title: 'Interactive Wireframes', desc: 'Design mobile-native interfaces strictly adhering to Material 3 & iOS guidelines.' },
			{ step: '03', title: 'App Engineering', desc: 'Build reactive UI components, state management, and backend API integration.' },
			{ step: '04', title: 'App Store Submission', desc: 'End-to-end management of review guidelines, screenshots, and live deployment.' }
		],
		capabilities: [
			'Mobile MVP Development',
			'Business Applications',
			'Customer Applications',
			'Service Booking Apps',
			'E-commerce Apps',
			'Delivery / Logistics Apps',
			'Social & Community Apps',
			'AI-powered Mobile Apps',
			'API Integration',
			'Payment Integration',
			'Push Notifications',
			'Authentication',
			'Admin Dashboard',
			'App Deployment',
			'Maintenance & Updates'
		],
		packages: [
			['Basic Mobile MVP', '₹1.5L+'],
			['Business App', '₹3L+'],
			['Advanced App', '₹5L+'],
			['Android + iOS', '₹6L+']
		],
		faqs: [
			{ q: 'Should I build natively or use Flutter / React Native?', a: 'Cross-platform frameworks like Flutter and React Native offer near-native performance while cutting development and maintenance costs in half for most business applications.' },
			{ q: 'Do you help with App Store and Google Play approval?', a: 'Yes. We manage certificates, bundle identifiers, store assets, privacy policies, and review requirements to ensure seamless store approval.' }
		]
	},
	{
		id: 'ai-solutions',
		slug: 'ai-solutions',
		num: '03',
		name: 'AI Solutions & Chatbots',
		short: 'Practical AI systems that automate workflows, improve customer experiences and help businesses work smarter.',
		icon: '✦',
		startingPrice: '₹50,000+',
		typicalTimeline: '2 to 8 weeks',
		overview:
			'TechRizers moves generative AI from buzzwords into dependable production systems. We develop custom Retrieval-Augmented Generation (RAG) agents, conversational assistants, and automated document analysis pipelines designed strictly around your enterprise knowledge base.',
		whatWeBuild: [
			'Enterprise Knowledge Base RAG Chatbots',
			'Multi-Agent Decision Pipelines',
			'Intelligent Customer Support Co-Pilots',
			'Automated Document & Invoice Parsers',
			'AI-Enhanced Internal Business Search'
		],
		features: [
			'Hallucination Reduction & Source Grounding',
			'Private Vector Databases (Pinecone, Qdrant, Chroma)',
			'Multi-Model LLM Orchestration (Claude, GPT, Gemini)',
			'Context Window & Token Cost Optimization',
			'Enterprise RBAC on Knowledge Chunks',
			'Continuous Evaluation & Latency Benchmarking'
		],
		technology: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'Vector DBs', 'LlamaIndex', 'OpenAI', 'Gemini'],
		process: [
			{ step: '01', title: 'Data Audit & Use Case', desc: 'Identify high-impact business bottlenecks and audit enterprise document schemas.' },
			{ step: '02', title: 'Chunking & Embedding', desc: 'Build ingestion pipelines, hierarchical indexing, and semantic vector stores.' },
			{ step: '03', title: 'Agent Logic & Tool Calling', desc: 'Integrate prompt architectures, external API tools, and guardrails.' },
			{ step: '04', title: 'Benchmarking & Deployment', desc: 'RAG evaluation, latency tuning, and production monitoring dashboard.' }
		],
		capabilities: [
			'AI Chatbots',
			'Business Automation',
			'RAG Chatbots',
			'AI Assistants',
			'AI Agents',
			'Multi-Agent Systems',
			'AI SaaS MVP',
			'Enterprise AI Solutions',
			'Knowledge Base AI',
			'Document Intelligence',
			'AI Search',
			'Customer Support AI',
			'Internal Business AI',
			'Workflow Automation',
			'API / LLM Integration'
		],
		packages: [
			['AI Chatbot', '₹50,000+'],
			['Business Automation', '₹75,000+'],
			['RAG Chatbot', '₹1.5L+'],
			['AI Assistant', '₹1.5L+'],
			['AI Agent', '₹2L+'],
			['Multi-Agent System', '₹4L+'],
			['AI SaaS MVP', '₹5L+'],
			['Enterprise AI Solution', '₹10L+']
		],
		faqs: [
			{ q: 'Will our proprietary company data remain private?', a: 'Yes. We architect solutions with private vector indexes and enterprise API endpoints with zero-data-retention guarantees, ensuring your data is never used to train public foundation models.' },
			{ q: 'How do you prevent AI hallucinations?', a: 'We implement strict RAG constraints: system prompt guardrails, semantic similarity thresholds, citations with exact document page references, and fallback answers when confidence is below acceptable margins.' }
		]
	},
	{
		id: 'custom-software',
		slug: 'custom-software',
		num: '04',
		name: 'Custom Software Development',
		short: 'Custom-built software systems designed around your exact business processes, workflows and operational requirements.',
		icon: '▣',
		startingPrice: 'Scoped Individually',
		typicalTimeline: '6 to 16 weeks',
		overview:
			'Off-the-shelf software often forces you to alter your business processes. TechRizers builds bespoke internal management systems, ERP modules, custom CRMs, and operational software that adapt seamlessly to your exact organizational structure.',
		whatWeBuild: [
			'Enterprise Resource Planning (ERP) Systems',
			'Custom CRM & Lead Routing Pipelines',
			'Inventory & Supply Chain Trackers',
			'Automated Billing & Invoicing Systems',
			'Employee Portals & Internal Dashboards'
		],
		features: [
			'Domain-Driven Architecture',
			'Legacy System Data Migration',
			'Comprehensive Audit Trails & Permissions',
			'Modular Service Extensibility',
			'High-Concurrency Database Optimization',
			'Granular Reporting & Export Engines'
		],
		technology: ['Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Python', 'React', 'Kubernetes'],
		process: [
			{ step: '01', title: 'Workflow Mapping', desc: 'Shadow stakeholders to understand exact pain points and operational requirements.' },
			{ step: '02', title: 'System Architecture', desc: 'Design relational schemas, audit structures, and integration interfaces.' },
			{ step: '03', title: 'Iterative Engineering', desc: 'Milestone delivery with bi-weekly sprint demos and stakeholder validation.' },
			{ step: '04', title: 'Data Migration & Handover', desc: 'Safe legacy database migration, team training, and comprehensive documentation.' }
		],
		capabilities: [
			'Business Management Software',
			'CRM Systems',
			'ERP Solutions',
			'Inventory Management',
			'Billing & Invoicing Systems',
			'HRMS',
			'Internal Business Portals',
			'Admin Platforms',
			'Workflow Systems',
			'API Integrations',
			'Third-party Integrations',
			'Legacy System Modernization',
			'Custom Backend Systems',
			'Enterprise Software'
		],
		packages: [
			['Custom Quote', 'Scoped individually'],
			['Complex / Enterprise Applications', '₹8L – ₹15L+']
		],
		faqs: [
			{ q: 'Can you migrate data from our existing legacy systems?', a: 'Yes. We specialize in sanitizing, structuring, and migrating data from legacy databases, spreadsheets, and older ERP software with zero data loss.' }
		]
	},
	{
		id: 'ui-ux',
		slug: 'ui-ux',
		num: '05',
		name: 'UI/UX Design',
		short: 'Clean, intuitive and conversion-focused product experiences designed for modern digital businesses.',
		icon: '◇',
		startingPrice: '₹10,000+',
		typicalTimeline: '1 to 4 weeks',
		overview:
			'Exceptional software begins with thoughtful human-computer interaction. TechRizers designs clean, modern, and accessible user interfaces that make complex software feel effortless for end users.',
		whatWeBuild: [
			'Figma High-Fidelity Prototypes',
			'Multi-Tenant SaaS Dashboards',
			'Mobile Application Design Systems',
			'Conversion-Focused Marketing Pages',
			'Accessible Corporate Design Systems'
		],
		features: [
			'Design Tokens & Responsive Grids',
			'Micro-Interactions & Motion Design',
			'WCAG AA Accessibility Compliance',
			'Interactive Clickable Figma Prototypes',
			'Clean Developer Handoff with Auto-Layout'
		],
		technology: ['Figma', 'FigJam', 'Tokens Studio', 'Adobe CC', 'CSS3 Architecture'],
		process: [
			{ step: '01', title: 'User Research', desc: 'Analyze target audience, competitor benchmarks, and core task hierarchies.' },
			{ step: '02', title: 'Wireframing', desc: 'Low-fidelity layout exploration to establish information architecture.' },
			{ step: '03', title: 'Visual & System Design', desc: 'Create design tokens, component libraries, typography, and states.' },
			{ step: '04', title: 'Interactive Prototype', desc: 'Clickable prototype validation and developer documentation.' }
		],
		capabilities: [
			'User Research',
			'Information Architecture',
			'User Flow',
			'Wireframes',
			'UI Design',
			'Responsive Design',
			'Prototype',
			'Design System',
			'Developer Handoff'
		],
		packages: [
			['Landing Page UI', '₹10,000+'],
			['Website UI/UX', '₹25,000+'],
			['Mobile App UI/UX', '₹30,000+'],
			['SaaS Dashboard Design', '₹50,000+'],
			['Complete Product Design', '₹1L+'],
			['Design System', '₹50,000+']
		],
		faqs: [
			{ q: 'Do you provide developer-ready Figma files?', a: 'Yes. Every screen is organized with Figma Auto Layout, named components, design tokens, and clear responsive constraints for seamless engineering handoff.' }
		]
	},
	{
		id: 'automation',
		slug: 'automation',
		num: '06',
		name: 'Automation & Digital Systems',
		short: 'Automate repetitive business operations and connect your tools, teams and data into efficient digital workflows.',
		icon: '⚡',
		startingPrice: '₹30,000+',
		typicalTimeline: '2 to 6 weeks',
		overview:
			'Eliminate manual copy-pasting, disconnected spreadsheets, and communication lag. TechRizers builds automated digital pipelines that integrate your CRM, accounting, WhatsApp, and database systems into a cohesive engine.',
		whatWeBuild: [
			'Automated WhatsApp & Email Lead Notification Systems',
			'Cross-Platform CRM Data Synchronization',
			'Multi-Step Approval & Document Workflows',
			'Automated Invoicing & Payment Reconciliation',
			'Real-Time Business Telemetry & Alerting'
		],
		features: [
			'Webhook & Event-Driven Triggers',
			'Resilient Error Handling & Retries',
			'Encrypted Credentials & API Key Vaults',
			'Real-Time Audit Logging & Monitoring',
			'Custom Middleware Scripting'
		],
		technology: ['Node.js', 'Python', 'Redis', 'Webhooks', 'Zapier/Make APIs', 'WhatsApp Cloud API'],
		process: [
			{ step: '01', title: 'Process Discovery', desc: 'Map out existing manual steps, handoff points, and error risks.' },
			{ step: '02', title: 'Integration Architecture', desc: 'Design resilient event schemas, webhook listeners, and fallback paths.' },
			{ step: '03', title: 'Workflow Implementation', desc: 'Code and configure automated pipelines with rigorous error trapping.' },
			{ step: '04', title: 'Monitoring & Tuning', desc: 'Deploy automated alerts, audit logs, and performance dashboards.' }
		],
		capabilities: [
			'Business Process Automation',
			'Workflow Automation',
			'CRM Automation',
			'Lead Management Automation',
			'Email Automation',
			'WhatsApp Automation',
			'Notification Systems',
			'API Integrations',
			'Internal Tools',
			'Approval Workflows',
			'Reporting Automation',
			'Data Synchronization',
			'AI-powered Automation',
			'Digital Operations Systems'
		],
		packages: [
			['Basic Automation', '₹30,000+'],
			['Business Automation', '₹75,000+'],
			['Advanced Automation', '₹1.5L+'],
			['Enterprise Automation', 'Custom Quote']
		],
		faqs: [
			{ q: 'What happens if a third-party API service experiences downtime?', a: 'We build all automation pipelines with idempotent retries, persistent message queues, and immediate failure alerts, ensuring zero lost leads or transactions.' }
		]
	}
];

import { projects } from './projectsData';

export const cases = projects;
