const initialServices = [
	{
		_id: 'srv-web-saas',
		id: 'srv-web-saas',
		slug: 'web-saas',
		num: '01',
		name: 'Web & SaaS Development',
		short: 'Scalable websites, web applications and SaaS platforms designed for startups, businesses and growing products.',
		icon: '⌘',
		order: 1,
		status: 'published'
	},
	{
		_id: 'srv-mobile-app',
		id: 'srv-mobile-app',
		slug: 'mobile-app',
		num: '02',
		name: 'Mobile App Development',
		short: 'Production-ready mobile applications designed for Android, iOS and cross-platform environments.',
		icon: '◫',
		order: 2,
		status: 'published'
	},
	{
		_id: 'srv-ai-solutions',
		id: 'srv-ai-solutions',
		slug: 'ai-solutions',
		num: '03',
		name: 'AI Solutions & Chatbots',
		short: 'Practical AI systems that automate workflows, improve customer experiences and help businesses work smarter.',
		icon: '✦',
		order: 3,
		status: 'published'
	},
	{
		_id: 'srv-custom-software',
		id: 'srv-custom-software',
		slug: 'custom-software',
		num: '04',
		name: 'Custom Software Development',
		short: 'Custom-built software systems designed around your exact business processes, workflows and operational requirements.',
		icon: '▣',
		order: 4,
		status: 'published'
	},
	{
		_id: 'srv-ui-ux',
		id: 'srv-ui-ux',
		slug: 'ui-ux',
		num: '05',
		name: 'UI/UX Design',
		short: 'Clean, intuitive and conversion-focused product experiences designed for modern digital businesses.',
		icon: '◇',
		order: 5,
		status: 'published'
	},
	{
		_id: 'srv-automation',
		id: 'srv-automation',
		slug: 'automation',
		num: '06',
		name: 'Automation & Digital Systems',
		short: 'Automate repetitive business operations and connect your tools, teams and data into efficient digital workflows.',
		icon: '⚡',
		order: 6,
		status: 'published'
	}
];

const initialCases = [
	{
		_id: 'case-carepath-portal',
		id: 'case-carepath-portal',
		slug: 'carepath-portal',
		title: 'CarePath Portal',
		category: 'HEALTHCARE PLATFORM',
		description: 'Unified patient appointments, records and reminders into one accessible web platform.',
		tech: ['React', 'Node.js', 'AWS'],
		outcome: 'Project outcome available on request.',
		status: 'published'
	},
	{
		_id: 'case-northstar-commerce',
		id: 'case-northstar-commerce',
		slug: 'northstar-commerce',
		title: 'Northstar Commerce',
		category: 'RETAIL INTELLIGENCE',
		description: 'Automated inventory signals and a refined storefront for a growing retail brand.',
		tech: ['Next.js', 'Shopify', 'AI workflows'],
		outcome: 'Project outcome available on request.',
		status: 'published'
	},
	{
		_id: 'case-ledgerly-app',
		id: 'case-ledgerly-app',
		slug: 'ledgerly-app',
		title: 'Ledgerly App',
		category: 'FINTECH EXPERIENCE',
		description: 'Designed and launched a secure, intuitive reporting app for business owners.',
		tech: ['Flutter', 'Python', 'GCP'],
		outcome: 'Project outcome available on request.',
		status: 'published'
	}
];

export const memory = {
	users: [],
	contacts: [],
	projects: [],
	payments: [],
	services: [...initialServices],
	cases: [...initialCases],
	testimonials: [],
	settings: []
};

export function isMongo() {
	return globalThis.__mongoReady === true;
}
