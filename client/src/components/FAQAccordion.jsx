import { useState } from 'react';

const FAQS = [
	{
		q: 'How does the project process work?',
		a: 'We follow a structured 4-stage engineering lifecycle: (1) Discovery & Architecture Scope, (2) UI/UX Design & Clickable Prototyping, (3) Sprint-based Full-Stack Development with bi-weekly demos, and (4) QA, Security Auditing & Zero-Downtime Deployment. You maintain direct visibility through a shared project dashboard and dedicated WhatsApp channel.'
	},
	{
		q: 'How much does a website cost?',
		a: 'Landing pages and foundational business websites start from ₹15,000 to ₹40,000. Custom web applications, e-commerce platforms, and SaaS MVPs range from ₹60,000 to ₹3,00,000+ depending on architectural complexity, third-party integrations, auth hierarchies, and database requirements.'
	},
	{
		q: 'How long does development take?',
		a: 'Focused landing pages typically take 1 to 2 weeks. Corporate websites and standard applications take 3 to 6 weeks. Complex SaaS MVPs, mobile applications, and enterprise custom software typically range from 6 to 12 weeks.'
	},
	{
		q: 'Do you build custom SaaS products?',
		a: 'Yes. SaaS development is one of our primary core disciplines. We engineer multi-tenant databases, Stripe/PhonePe recurring subscription models, usage-based metering, role-based access control (RBAC), and scalable containerized backends.'
	},
	{
		q: 'Do you provide AI solutions?',
		a: 'Yes. We build production-ready AI systems including private Retrieval-Augmented Generation (RAG) chatbots grounded in enterprise documents, intelligent document/invoice parsers, autonomous agents, and custom LLM tool-calling integrations.'
	},
	{
		q: 'Can you integrate existing systems?',
		a: 'Yes. We routinely connect legacy databases, proprietary ERPs, third-party CRM platforms, payment gateways, and WhatsApp Business Cloud APIs into modern, consolidated interfaces.'
	},
	{
		q: 'Do you provide maintenance?',
		a: 'Yes. We offer proactive maintenance and SLA support packages that cover 24/7 uptime monitoring, security patching, cloud optimization, database backups, and iterative feature development.'
	},
	{
		q: 'How do payments work?',
		a: 'We work on transparent milestone-based schedules (typically 40% kickoff deposit, 30% after core sprint demo, and 30% upon final acceptance testing and deployment). We support UPI, PhonePe, Cards, and Net Banking with automated invoicing.'
	},
	{
		q: 'Do you work with startups?',
		a: 'Yes. We partner extensively with early-stage founders to scope and launch high-impact MVPs rapidly, ensuring clean architecture that doesn\'t have to be rewritten when scaling to thousands of users.'
	},
	{
		q: 'Do you work with international clients?',
		a: 'Yes. While based in Pune, India, TechRizers serves businesses across North America, Europe, the Middle East, and the Asia-Pacific region with smooth async communication and milestone delivery.'
	}
];

export default function FAQAccordion() {
	const [openIdx, setOpenIdx] = useState(0);

	const toggle = (idx) => {
		setOpenIdx(openIdx === idx ? -1 : idx);
	};

	return (
		<div className="faq-list">
			{FAQS.map((item, idx) => {
				const isOpen = openIdx === idx;
				return (
					<div
						key={idx}
						className={`faq-item ${isOpen ? 'open' : ''}`}
						onClick={() => toggle(idx)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								toggle(idx);
							}
						}}
						role="button"
						tabIndex={0}
						aria-expanded={isOpen}
					>
						<div className="faq-question">
							<h3>{item.q}</h3>
							<span className="faq-icon" aria-hidden="true">
								{isOpen ? '−' : '+'}
							</span>
						</div>
						{isOpen && (
							<div className="faq-answer">
								<p>{item.a}</p>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
