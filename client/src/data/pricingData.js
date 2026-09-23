export const pricingCategories = [
	{
		id: 'cat-web-saas',
		num: '01',
		name: 'Web & SaaS Development',
		description: 'Modern, high-velocity websites and SaaS platforms built with React, Node.js, and cloud scale.',
		items: [
			{ name: 'Basic / Landing Page', price: '₹15,000+', popular: false, desc: 'High-converting responsive landing page with SEO optimization and analytics.' },
			{ name: 'Business / Corporate Website', price: '₹40,000+', popular: true, desc: 'Multi-page corporate website with CMS, inquiry forms, and speed tuning.' },
			{ name: 'E-commerce Website', price: '₹60,000+', popular: false, desc: 'Full-featured online storefront with product catalog, cart, and payment gateway.' },
			{ name: 'Custom Web Application', price: '₹1,50,000+', popular: false, desc: 'Tailored web portals, client dashboards, and custom business logic.' },
			{ name: 'SaaS Prototype', price: '₹1.5L+', popular: false, desc: 'Interactive working prototype to pitch investors and validate market demand.' },
			{ name: 'SaaS MVP', price: '₹3L+', popular: true, desc: 'Production-ready Minimum Viable Product with auth, billing, and core features.' },
			{ name: 'Growth SaaS', price: '₹6L+', popular: false, desc: 'Scale architecture with multi-tenancy, reporting, and webhook integrations.' },
			{ name: 'Production SaaS', price: '₹10L+', popular: false, desc: 'High-availability SaaS system with microservices and automated CI/CD pipelines.' },
			{ name: 'Enterprise SaaS', price: '₹20L+', popular: false, desc: 'Custom enterprise solution with SOC2 compliance, audit logs, and SLA support.' }
		]
	},
	{
		id: 'cat-mobile-app',
		num: '02',
		name: 'Mobile App Development',
		description: 'Smooth, native-feeling mobile applications built for Android, iOS, and cross-platform ecosystems.',
		items: [
			{ name: 'Basic Mobile MVP', price: '₹1.5L+', popular: false, desc: 'Fast MVP app for initial user validation with essential screens and APIs.' },
			{ name: 'Business App', price: '₹3L+', popular: true, desc: 'End-to-end business mobile application with push notifications and user auth.' },
			{ name: 'Advanced App', price: '₹5L+', popular: false, desc: 'Complex apps with real-time sync, offline storage, and interactive animations.' },
			{ name: 'Android + iOS', price: '₹6L+', popular: false, desc: 'Dual-platform release published to both Google Play Store and Apple App Store.' }
		]
	},
	{
		id: 'cat-ai-solutions',
		num: '03',
		name: 'AI Solutions & Chatbots',
		description: 'Enterprise generative AI, intelligent agents, and custom LLM workflows that solve concrete business challenges.',
		items: [
			{ name: 'AI Chatbot', price: '₹50,000+', popular: false, desc: 'Smart conversational bot for customer support and lead qualification.' },
			{ name: 'Business Automation', price: '₹75,000+', popular: false, desc: 'Automated document processing, email classification, and repetitive workflow triggers.' },
			{ name: 'RAG Chatbot', price: '₹1.5L+', popular: true, desc: 'Retrieval-Augmented Generation system grounded strictly in your private documents.' },
			{ name: 'AI Assistant', price: '₹1.5L+', popular: false, desc: 'Internal productivity co-pilot integrated into your CRM, ERP, or internal tools.' },
			{ name: 'AI Agent', price: '₹2L+', popular: false, desc: 'Autonomous agent capable of reasoning, tool execution, and multi-step task completion.' },
			{ name: 'Multi-Agent System', price: '₹4L+', popular: false, desc: 'Coordinated agent swarm handling cross-functional workflows and decision pipelines.' },
			{ name: 'AI SaaS MVP', price: '₹5L+', popular: false, desc: 'Complete AI-powered SaaS product with token quotas, streaming, and monetization.' },
			{ name: 'Enterprise AI Solution', price: '₹10L+', popular: false, desc: 'Private fine-tuned models, on-premise/VPC deployment, and strict data governance.' }
		]
	},
	{
		id: 'cat-custom-software',
		num: '04',
		name: 'Custom Software Development',
		description: 'Purpose-built software systems designed around your proprietary business workflows and operations.',
		items: [
			{ name: 'Custom Quote', price: 'Scoped Individually', popular: false, desc: 'Initial architecture assessment, proof-of-concept, and granular milestone roadmap.' },
			{ name: 'Complex / Enterprise Applications', price: '₹8L – ₹15L+', popular: true, desc: 'ERP, custom CRM, inventory management, and high-security transactional portals.' }
		]
	},
	{
		id: 'cat-ui-ux',
		num: '05',
		name: 'UI/UX Design',
		description: 'Intuitive, research-backed digital product design that converts visitors and delights users.',
		items: [
			{ name: 'Landing Page UI', price: '₹10,000+', popular: false, desc: 'Modern responsive landing page UI with interactive prototypes in Figma.' },
			{ name: 'Website UI/UX', price: '₹25,000+', popular: false, desc: 'Complete multi-page website wireframes, high-fidelity mockups, and mobile layouts.' },
			{ name: 'Mobile App UI/UX', price: '₹30,000+', popular: true, desc: 'Intuitive iOS & Android app design systems with full user flows and tap targets.' },
			{ name: 'SaaS Dashboard Design', price: '₹50,000+', popular: false, desc: 'Information-dense analytics dashboards, navigation schemas, and data visualizers.' },
			{ name: 'Complete Product Design', price: '₹1L+', popular: false, desc: 'End-to-end product discovery, wireframing, UX journey, and dev-ready asset kits.' },
			{ name: 'Design System', price: '₹50,000+', popular: false, desc: 'Unified component library, design tokens, color ramps, typography, and Figma kits.' }
		]
	},
	{
		id: 'cat-automation',
		num: '06',
		name: 'Automation & Digital Systems',
		description: 'Connect internal tools, synchronize data streams, and eliminate manual bottlenecks.',
		items: [
			{ name: 'Basic Automation', price: '₹30,000+', popular: false, desc: 'Simple webhook integrations, lead routing to CRM, and notification alerts.' },
			{ name: 'Business Automation', price: '₹75,000+', popular: true, desc: 'Multi-stage approval workflows, invoice generation, and customer onboarding automation.' },
			{ name: 'Advanced Automation', price: '₹1.5L+', popular: false, desc: 'High-throughput ETL pipelines, database sync, and distributed background jobs.' },
			{ name: 'Enterprise Automation', price: 'Custom Quote', popular: false, desc: 'Mission-critical enterprise orchestration with failover, retry queues, and compliance logging.' }
		]
	}
];

export const pricingDisclaimer =
	'Final pricing depends on project scope, features, integrations, complexity and timeline. Cloud, hosting, API and third-party service costs may be billed separately.';
