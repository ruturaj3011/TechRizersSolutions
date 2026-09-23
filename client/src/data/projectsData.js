/**
 * TechRizers - Central Project Portfolio Data
 * Easily add a new project by appending an object to the 'projects' array.
 */

export const categories = [
  'ALL',
  'WEB & SAAS',
  'MOBILE APP',
  'HEALTHCARE',
  'FINTECH',
  'RETAIL'
];

export const projects = [
  // ==========================================
  // 1. HEALTHCARE
  // ==========================================
  {
    id: 'carepath-portal',
    slug: 'carepath-portal',
    title: 'CarePath Portal',
    category: 'HEALTHCARE',
    subCategory: 'CLINICAL MANAGEMENT PLATFORM',
    projectType: 'Web & SaaS Development',
    industry: 'Healthcare & Clinical Operations',
    description: 'Unified healthcare platform for patient appointments, encrypted records, and automated consultation reminders.',
    fullDescription: 'CarePath Portal is an enterprise-grade clinical management suite built for multi-branch clinic networks. It consolidates patient intake, doctor scheduling, electronic medical records (EMR), and automated WhatsApp/SMS reminders into a single HIPAA-aligned web application.',
    problem: 'Regional clinic networks were facing severe patient no-show rates (over 28%), error-prone manual record transfers between departments, and hours of administrative phone calls every morning.',
    solution: 'TechRizers engineered a centralized, role-protected web portal with two-way calendar synchronization, encrypted document vaults, and an automated event-driven notification engine that reduced scheduling friction.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis'],
    features: [
      'Two-way real-time doctor availability and calendar booking',
      'Encrypted patient health records (EMR) vault with audit logging',
      'Automated WhatsApp and SMS appointment confirmations & reminders',
      'Role-based access control (Admin, Doctor, Nurse, Receptionist, Patient)',
      'Multi-clinic branch administrative dashboard with exportable reports'
    ],
    architecture: 'Stateless React single-page frontend served via edge CDN, communicating with an Express/Node.js REST API gateway. PostgreSQL database with column-level AES-256 encryption for health records, Redis for distributed session caching and rate limiting, containerized with Docker on AWS ECS.',
    gallery: [
      {
        title: 'Doctor Schedule & Telemetry Dashboard',
        caption: 'Central calendar interface with multi-physician schedule coordination and live appointment status tracking.',
        color: '#1E293B',
        accent: '#38BDF8',
        tag: 'CALENDAR & ROSTER'
      },
      {
        title: 'Encrypted Patient EMR & Records Vault',
        caption: 'HIPAA-compliant medical history records with role-restricted viewing permissions and file attachment previews.',
        color: '#0F172A',
        accent: '#2563EB',
        tag: 'CLINICAL RECORDS'
      },
      {
        title: 'Automated Communication Engine',
        caption: 'Webhook-driven notification dispatch pipeline managing WhatsApp, SMS, and email consultation reminders.',
        color: '#172554',
        accent: '#60A5FA',
        tag: 'AUTOMATION PIPELINE'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: 'https://github.com/techrizers/carepath-portal-core',
    liveDemoUrl: 'https://carepath-demo.techrizers.com',
    status: 'Production Live'
  },
  {
    id: 'mediconnect',
    slug: 'mediconnect',
    title: 'MediConnect',
    category: 'HEALTHCARE',
    subCategory: 'TELEMEDICINE & VIRTUAL CARE',
    projectType: 'Web & SaaS Development',
    industry: 'Digital Health & Teleconsultation',
    description: 'Real-time WebRTC teleconsultation system with in-call vitals logging and digitally signed prescription dispatch.',
    fullDescription: 'MediConnect connects patients in remote areas with specialized medical consultants. Features sub-second WebRTC peer-to-peer audio/video streaming, interactive medical document sharing, and instant digital prescription generation with cryptographic verification.',
    problem: 'Specialty medical consultations were inaccessible to patients in tier-2 and rural regions, while doctors lacked secure, compliant tools to document diagnoses and issue legally valid digital prescriptions during remote calls.',
    solution: 'Engineered a low-latency WebRTC teleconsultation platform with fallback SFU routing, integrated encrypted chat, and an automated prescription generator with digital doctor signatures.',
    technologies: ['React', 'WebRTC', 'Node.js', 'MongoDB', 'Redis', 'Tailwind CSS'],
    features: [
      'Sub-second latency peer-to-peer video/audio with automatic bandwidth scaling',
      'In-call digital prescription builder with drug interaction warning alerts',
      'Cryptographically verified QR-code prescriptions with pharmacy dispatch',
      'Screen sharing for medical diagnostic imaging and lab report review',
      'Automated recording and encrypted cloud archive for compliance'
    ],
    architecture: 'React frontend leveraging native WebRTC APIs with Coturn STUN/TURN servers. Signaling server powered by Node.js and Socket.io with Redis pub/sub. MongoDB document store for flexible clinical forms, with S3 object storage for diagnostic media.',
    gallery: [
      {
        title: 'Virtual Consultation Video Room',
        caption: 'Low-bandwidth adaptive video consultation room with integrated patient history sidebar.',
        color: '#0F172A',
        accent: '#06B6D4',
        tag: 'WEBRTC STREAMING'
      },
      {
        title: 'Digital Prescription Generator',
        caption: 'Instant medication dosage lookup and digital signature workflow with pharmacy verification.',
        color: '#1E293B',
        accent: '#3B82F6',
        tag: 'E-PRESCRIPTION'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://mediconnect-preview.techrizers.com',
    status: 'Active SLA'
  },
  {
    id: 'healthdesk',
    slug: 'healthdesk',
    title: 'HealthDesk',
    category: 'HEALTHCARE',
    subCategory: 'CLINIC OPERATIONS & TRIAGE',
    projectType: 'Custom Software Development',
    industry: 'Outpatient Clinic Operations',
    description: 'Paperless clinic workflow automation system connecting front-desk intake, nursing vitals, and billing.',
    fullDescription: 'HealthDesk eliminates waiting room clipboards with contactless mobile QR intake, automated patient queuing, immediate nursing vitals capture, and streamlined insurance/cash billing settlement.',
    problem: 'Clinic waiting rooms were plagued by long queues, manual paper data entry errors, and disconnected billing counters requiring duplicate record retrieval.',
    solution: 'Implemented a tablet-optimized paperless workflow that tracks patient progression from arrival through triage, physician examination, pharmacy, and billing.',
    technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    features: [
      'Contactless QR code patient check-in with auto-demographic lookup',
      'Live waiting room triage monitor with automated queue prioritization',
      'Tablet interface for nurses to record vitals and allergy alerts',
      'Consolidated invoice generation with split insurance and co-pay support',
      'Nightly analytical reports on average consultation time and patient throughput'
    ],
    architecture: 'Next.js application backed by Python FastAPI microservices, PostgreSQL with connection pooling via PgBouncer, and asynchronous task queues for analytics aggregation.',
    gallery: [
      {
        title: 'Queue Triage & Flow Control',
        caption: 'Real-time patient flow monitor showing wait times, exam room assignments, and doctor availability.',
        color: '#172554',
        accent: '#38BDF8',
        tag: 'TRIAGE QUEUE'
      },
      {
        title: 'Nursing Vitals Capture Interface',
        caption: 'High-contrast tablet UI for rapid clinical vitals entry with immediate abnormal value alerts.',
        color: '#0F172A',
        accent: '#10B981',
        tag: 'NURSE TABLET'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: null,
    status: 'Delivered'
  },
  {
    id: 'patientflow',
    slug: 'patientflow',
    title: 'PatientFlow',
    category: 'HEALTHCARE',
    subCategory: 'HOSPITAL BED & RESOURCE ALLOCATION',
    projectType: 'Custom Software Development',
    industry: 'Hospital Administration & Critical Care',
    description: 'Hospital bed capacity management and emergency department transfer coordination platform.',
    fullDescription: 'PatientFlow provides hospital executives and charge nurses with real-time operational telemetry across ICU, general wards, and emergency departments, preventing bed bottlenecks and accelerating emergency transfers.',
    problem: 'Hospitals faced critical delays in moving admitted emergency room patients into inpatient beds due to manual phone check-ins and uncoordinated discharge cleaning.',
    solution: 'Built an event-driven bed logistics engine that alerts housekeeping instantly on discharge, predicts bed availability using historical discharge curves, and streamlines cross-ward transfers.',
    technologies: ['React', 'Node.js', 'Kafka', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'Interactive 3D hospital floorplan with real-time bed occupancy status',
      'Housekeeping dispatch triggers upon patient discharge with mobile task tracking',
      'ICU and step-down transfer workflow with physician sign-off steps',
      'Predictive discharge forecasting based on length-of-stay algorithms',
      'Comprehensive compliance and emergency surge telemetry dashboards'
    ],
    architecture: 'Microservices architecture with Apache Kafka event bus for instant state synchronization between admitting, wards, and housekeeping. React frontend with WebSocket real-time floorplan rendering.',
    gallery: [
      {
        title: 'Bed Capacity Matrix & Floorplan',
        caption: 'Ward-by-ward occupancy telemetry displaying clean, occupied, and maintenance-status beds.',
        color: '#1E293B',
        accent: '#6366F1',
        tag: 'FLOORPLAN TELEMETRY'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://patientflow-demo.techrizers.com',
    status: 'Delivered'
  },

  // ==========================================
  // 2. FINTECH
  // ==========================================
  {
    id: 'ledgerly-app',
    slug: 'ledgerly-app',
    title: 'Ledgerly App',
    category: 'FINTECH',
    subCategory: 'FINANCIAL TELEMETRY & REPORTING',
    projectType: 'Mobile App Development',
    industry: 'Fintech & Business Operations',
    description: 'Designed and launched a secure, cross-platform financial reporting and cashflow forecasting app for business owners.',
    fullDescription: 'Ledgerly gives founders and business executives real-time financial transparency. It consolidates multiple business accounts, parses transaction streams, categorizes expenses, and models future cashflow runway with zero spreadsheet complexity.',
    problem: 'Business owners spent countless weekend hours consolidating statements across bank accounts, dealing with delayed accounting feeds and unclear runway projections.',
    solution: 'TechRizers engineered a cross-platform Flutter application with biometric login, bank-grade encryption, automated categorization rules, and intuitive cashflow forecasting visualizers.',
    technologies: ['Flutter', 'Python', 'FastAPI', 'PostgreSQL', 'GCP', 'Redis'],
    features: [
      'Biometric authentication and local device secure enclave storage',
      'Automated transaction categorization with machine learning rules',
      'Real-time cashflow trajectory and financial runway simulation charts',
      'Multi-currency account aggregation with live exchange rate indexing',
      'Offline-first ledger synchronization across mobile and web'
    ],
    architecture: 'Flutter client leveraging local SQLite caching for sub-10ms response times. Authenticated against an asynchronous FastAPI backend deployed on Google Cloud Run, with PostgreSQL Cloud SQL and Redis caching.',
    gallery: [
      {
        title: 'Runway & Cashflow Telemetry Screen',
        caption: 'Real-time financial dashboard displaying burn rate, incoming receivables, and 6-month runway trajectory.',
        color: '#0F172A',
        accent: '#22C55E',
        tag: 'CASHFLOW MODELING'
      },
      {
        title: 'Automated Expense Categorization',
        caption: 'Transaction intelligence view with automatic vendor parsing, receipt tagging, and tax allocations.',
        color: '#1E293B',
        accent: '#38BDF8',
        tag: 'SMART CATEGORIZATION'
      },
      {
        title: 'Multi-Account Aggregation Hub',
        caption: 'Consolidated balance overview connecting operating accounts, payroll reserves, and credit lines.',
        color: '#172554',
        accent: '#2563EB',
        tag: 'MULTI-ACCOUNT'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: 'https://github.com/techrizers/ledgerly-mobile-app',
    liveDemoUrl: 'https://ledgerly-demo.techrizers.com',
    status: 'Production Live'
  },
  {
    id: 'financeflow',
    slug: 'financeflow',
    title: 'FinanceFlow',
    category: 'FINTECH',
    subCategory: 'PAYMENT RECONCILIATION & SETTLEMENTS',
    projectType: 'Web & SaaS Development',
    industry: 'Enterprise Fintech & B2B Payments',
    description: 'High-velocity payment settlement engine with automated multi-gateway reconciliation and audit logging.',
    fullDescription: 'FinanceFlow automates the complex reconciliation of thousands of daily transactions across UPI, PhonePe, Stripe, and direct bank transfers, highlighting mismatches instantly and generating audited settlement sheets.',
    problem: 'Finance teams were overwhelmed by manual spreadsheet reconciliations between gateway settlement files, bank statements, and internal order records, taking 3-4 days to close monthly books.',
    solution: 'Engineered an automated reconciliation pipeline that ingests webhook payloads and bank MT940 statements, matches records using fuzzy hash matching, and flags discrepancies in real time.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    features: [
      'Multi-gateway ingestion supporting PhonePe, Razorpay, Stripe, and NEFT/RTGS',
      'Automated 3-way reconciliation (Gateway vs Internal Ledger vs Bank Statement)',
      'Configurable dispute resolution and chargeback management workflows',
      'Automated GST and TDS tax deduction calculation with exportable vouchers',
      'Full cryptographic immutable audit trail for every status modification'
    ],
    architecture: 'High-throughput Node.js microservices with worker pools processing CSV/JSON statement batches. PostgreSQL partitioned tables for multi-million transaction histories, protected by AWS KMS encryption.',
    gallery: [
      {
        title: 'Settlement Reconciliation Matrix',
        caption: 'Side-by-side transaction audit view highlighting matched records, pending settlements, and fee variances.',
        color: '#1E293B',
        accent: '#F59E0B',
        tag: '3-WAY RECONCILIATION'
      },
      {
        title: 'Gateway Discrepancy Alert Monitor',
        caption: 'Real-time alert dashboard detecting uncaptured charges, refund anomalies, and settlement delays.',
        color: '#0F172A',
        accent: '#38BDF8',
        tag: 'GATEWAY AUDIT'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://financeflow-preview.techrizers.com',
    status: 'Active SLA'
  },
  {
    id: 'smartledger',
    slug: 'smartledger',
    title: 'SmartLedger',
    category: 'FINTECH',
    subCategory: 'AI INVOICE & TAX AUTOMATION',
    projectType: 'Custom Software Development',
    industry: 'Corporate Accounting & Tax Compliance',
    description: 'Intelligent invoice OCR parsing, GST reconciliation, and double-entry ledger bookkeeping suite.',
    fullDescription: 'SmartLedger combines OCR document intelligence with Indian GST tax validation rules, automatically extracting line items from vendor PDFs and updating ERP accounting books without manual typing.',
    problem: 'Accounts payable teams manually typed hundreds of vendor bills every week, leading to human error, missed input tax credits (ITC), and penalty risks.',
    solution: 'Built an AI-assisted document parser that extracts HSN codes, invoice dates, vendor GSTIN numbers, and tax splits directly into double-entry ledger journals.',
    technologies: ['Python', 'FastAPI', 'React', 'Tesseract OCR', 'PostgreSQL', 'Docker'],
    features: [
      'PDF and scanned image invoice OCR with table extraction accuracy',
      'Real-time GSTIN validation against GST portal verification APIs',
      'Automated Input Tax Credit (ITC) eligibility classification and matching',
      'Standard double-entry accounting ledger with general journal generation',
      'Direct one-click export to Tally, Zoho Books, and SAP formats'
    ],
    architecture: 'FastAPI service running deep learning and OCR computer vision pipelines in asynchronous Celery workers. React frontend featuring split-screen document preview and verified field editors.',
    gallery: [
      {
        title: 'Split-Screen Invoice Intelligence View',
        caption: 'Side-by-side original invoice PDF alongside automatically extracted structured tax and item fields.',
        color: '#172554',
        accent: '#10B981',
        tag: 'OCR EXTRACTION'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: null,
    status: 'Delivered'
  },
  {
    id: 'payment-analytics',
    slug: 'payment-analytics',
    title: 'Payment Analytics',
    category: 'FINTECH',
    subCategory: 'TRANSACTION TELEMETRY & FRAUD SHIELD',
    projectType: 'Web & SaaS Development',
    industry: 'Fintech Operations & Risk',
    description: 'Real-time transaction volume telemetry, conversion funnel drop-off analytics, and heuristic fraud detection.',
    fullDescription: 'A high-speed analytics platform providing payment aggregators with real-time insight into checkout drop-off rates, payment method performance, latency spikes, and fraudulent card testing patterns.',
    problem: 'Payment platforms were losing thousands in failed checkouts due to unnoticed gateway latency spikes and card velocity testing attacks.',
    solution: 'Delivered a sub-second telemetry dashboard powered by ClickHouse columnar storage and real-time anomaly detection alerts.',
    technologies: ['Next.js', 'Node.js', 'ClickHouse', 'Redis', 'Tailwind CSS'],
    features: [
      'Sub-second query performance over 50M+ historical transaction rows',
      'Payment method success rate heatmaps (UPI vs Cards vs Net Banking)',
      'Velocity abuse and card testing detection triggers with IP blacklisting',
      'Checkout drop-off funnel step-by-step conversion analytics',
      'Custom webhook alert rules dispatching to Slack and PagerDuty'
    ],
    architecture: 'ClickHouse columnar database designed for high-write analytical streaming. Node.js ingestion pipeline pushing events via Redis queues. Next.js dashboard with interactive SVG telemetry charts.',
    gallery: [
      {
        title: 'Real-Time Volume & Success Heatmap',
        caption: 'Live transaction velocity chart with immediate visual alerts on gateway latency degradation.',
        color: '#0F172A',
        accent: '#EF4444',
        tag: 'LIVE TELEMETRY'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://pay-analytics-demo.techrizers.com',
    status: 'Delivered'
  },

  // ==========================================
  // 3. RETAIL
  // ==========================================
  {
    id: 'northstar-commerce',
    slug: 'northstar-commerce',
    title: 'Northstar Commerce',
    category: 'RETAIL',
    subCategory: 'HEADLESS COMMERCE & INVENTORY ENGINE',
    projectType: 'Web & SaaS Development',
    industry: 'Retail & Multi-Channel Commerce',
    description: 'Automated multi-warehouse inventory synchronization and a high-speed headless storefront for a growing retail brand.',
    fullDescription: 'Northstar Commerce provides a lightning-fast headless shopping experience paired with an automated multi-location inventory synchronization engine, eliminating flash-sale stockouts and cart abandonment.',
    problem: 'The brand experienced slow page load times during promotional drops and recurring stock mismatches between physical retail outlets, warehouses, and digital storefronts.',
    solution: 'TechRizers engineered a high-performance Next.js storefront backed by webhook-driven inventory sync, sub-second edge caching, and integrated multi-channel checkout.',
    technologies: ['Next.js', 'Node.js', 'Shopify APIs', 'Redis', 'PostgreSQL', 'AWS'],
    features: [
      'Sub-second headless storefront performance with edge caching',
      'Automated multi-warehouse inventory synchronization with safety stock rules',
      'Integrated payment gateway supporting UPI, Cards, and Net Banking',
      'Custom order fulfillment and real-time courier tracking dashboard',
      'Personalized product recommendation engine based on browsing patterns'
    ],
    architecture: 'Edge-cached Next.js application running on Vercel/AWS. Ingestion queues on Redis for burst handling during flash sale drops. PostgreSQL transactional database with automated webhook listeners to physical POS systems.',
    gallery: [
      {
        title: 'Headless Product Showcase & Cart',
        caption: 'Sub-second responsive storefront interface optimized for high mobile conversion and rapid checkout.',
        color: '#1E293B',
        accent: '#38BDF8',
        tag: 'HEADLESS FRONTEND'
      },
      {
        title: 'Multi-Warehouse Inventory Matrix',
        caption: 'Live stock telemetry synchronizing warehouse bins, retail shelf quantities, and reserved cart items.',
        color: '#0F172A',
        accent: '#10B981',
        tag: 'STOCK ENGINE'
      },
      {
        title: 'Order Dispatch & Courier Tracking',
        caption: 'Fulfillment operations dashboard generating airway bills, shipping manifests, and customer tracking links.',
        color: '#172554',
        accent: '#2563EB',
        tag: 'FULFILLMENT PIPELINE'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: 'https://github.com/techrizers/northstar-commerce-edge',
    liveDemoUrl: 'https://northstar-demo.techrizers.com',
    status: 'Production Live'
  },
  {
    id: 'retailpulse',
    slug: 'retailpulse',
    title: 'RetailPulse',
    category: 'RETAIL',
    subCategory: 'OFFLINE-FIRST POINT OF SALE (POS)',
    projectType: 'Custom Software Development',
    industry: 'Brick-and-Mortar Retail & Franchises',
    description: 'Modern offline-first point of sale system with touch billing, barcode scanning, and central ERP sync.',
    fullDescription: 'RetailPulse guarantees uninterrupted billing at checkout counters even during complete internet outages, syncing transactions seamlessly once connectivity returns.',
    problem: 'Retail store counters frequently stalled during internet network drops, causing customer frustration, abandoned shopping baskets, and lost sales.',
    solution: 'Architected an offline-first desktop POS using Electron and local SQLite database, with an automatic background sync engine that securely commits transactions to cloud servers.',
    technologies: ['React', 'Electron', 'SQLite', 'Node.js', 'AWS', 'PostgreSQL'],
    features: [
      'Zero-latency offline billing with local SQLite transaction journal',
      'Hardware integration with thermal receipt printers, barcode scanners, and cash drawers',
      'Instant cloud synchronization with conflict resolution on internet reconnection',
      'Cashier shift management with float reconciliation and discrepancy reporting',
      'Customer loyalty points redemption and WhatsApp digital receipt dispatch'
    ],
    architecture: 'Electron application running React with local SQLite database. Background synchronization agent utilizing cryptographically signed change-logs to push delta records to centralized PostgreSQL cluster on AWS.',
    gallery: [
      {
        title: 'Fast-Touch Cashier POS Terminal',
        caption: 'Streamlined barcode and quick-key checkout interface designed for high throughput during peak store hours.',
        color: '#0F172A',
        accent: '#3B82F6',
        tag: 'TOUCH POS'
      },
      {
        title: 'Store Multi-Terminal Sync Monitor',
        caption: 'Real-time telemetry showing terminal connectivity status, offline queue depth, and cloud sync confirmation.',
        color: '#1E293B',
        accent: '#22C55E',
        tag: 'OFFLINE SYNC'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://retailpulse-demo.techrizers.com',
    status: 'Active SLA'
  },
  {
    id: 'inventory-intelligence',
    slug: 'inventory-intelligence',
    title: 'Inventory Intelligence',
    category: 'RETAIL',
    subCategory: 'PREDICTIVE REORDER & DEMAND FORECASTING',
    projectType: 'AI & Machine Learning Solutions',
    industry: 'Retail Distribution & Warehousing',
    description: 'Machine learning demand forecasting platform predicting SKU stockouts and generating automated supplier POs.',
    fullDescription: 'Inventory Intelligence analyzes historical sales velocity, seasonal trends, and supplier lead times to optimize warehouse stock levels and automate purchase orders.',
    problem: 'Retailers were constantly caught between holding excess dead stock in warehouses and suffering stockouts on high-margin fast-moving items.',
    solution: 'Developed a predictive analytics engine that forecasts SKU demand curves 30 days ahead and automatically generates draft purchase orders when thresholds are breached.',
    technologies: ['Python', 'FastAPI', 'React', 'Scikit-learn', 'PostgreSQL', 'Docker'],
    features: [
      'SKU-level 30/60/90-day demand trajectory forecasting using time-series models',
      'Automated safety stock and reorder point recalculation based on supplier lead times',
      'Dead inventory identifier highlighting capital tied up in slow-moving products',
      'One-click automated Purchase Order generation and vendor dispatch',
      'Multi-location stock balancing recommendations to prevent inter-store transfers'
    ],
    architecture: 'Python machine learning microservice running daily batch forecasting models. FastAPI backend serving predictions to a responsive React dashboard with interactive trend visualizers.',
    gallery: [
      {
        title: 'Demand Curve & Stockout Prediction View',
        caption: 'Visual forecast modeling expected sales demand against existing inventory runway.',
        color: '#172554',
        accent: '#8B5CF6',
        tag: 'DEMAND FORECAST'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: null,
    status: 'Delivered'
  },
  {
    id: 'storeflow',
    slug: 'storeflow',
    title: 'StoreFlow',
    category: 'RETAIL',
    subCategory: 'OMNICHANNEL SHIP-FROM-STORE',
    projectType: 'Web & SaaS Development',
    industry: 'Omnichannel Retail & Hyperlocal Delivery',
    description: 'Omnichannel order routing platform enabling retail stores to act as localized fulfillment hubs.',
    fullDescription: 'StoreFlow routes e-commerce orders to the nearest retail store with available stock, allowing same-day local delivery and cutting shipping costs by 40%.',
    problem: 'Brands were shipping e-commerce orders from distant central warehouses while identical inventory sat unsold on local store shelves.',
    solution: 'Created an intelligent order routing engine that analyzes customer geography and store inventory to assign pick-pack tasks to the optimal local store.',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'Google Maps API'],
    features: [
      'Geospatial order routing algorithm assigning orders to the nearest viable store',
      'Store associate mobile pick-and-pack checklist interface with barcode scan verification',
      'Automated integration with local courier APIs for instant rider dispatch',
      'Live customer SMS/WhatsApp tracking link with real-time delivery rider map',
      'Store manager dashboard showing order prep times and SLA compliance'
    ],
    architecture: 'Node.js event engine consuming orders from e-commerce channels, computing route matrices using Google Maps APIs, and dispatching real-time WebSocket alerts to in-store mobile devices.',
    gallery: [
      {
        title: 'Geospatial Store Routing Engine',
        caption: 'Map visualization showing customer order locations matched against regional store fulfillment radii.',
        color: '#0F172A',
        accent: '#06B6D4',
        tag: 'GEOSPATIAL ROUTING'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://storeflow-demo.techrizers.com',
    status: 'Delivered'
  },

  // ==========================================
  // 4. WEB & SAAS
  // ==========================================
  {
    id: 'saas-dashboard',
    slug: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    category: 'WEB & SAAS',
    subCategory: 'MULTI-TENANT METRICS & GOVERNANCE',
    projectType: 'Web & SaaS Development',
    industry: 'B2B Software & Cloud Platforms',
    description: 'Enterprise multi-tenant analytics and subscription governance dashboard with granular role permissions.',
    fullDescription: 'A modern, high-density SaaS management portal featuring real-time revenue telemetry (MRR, churn, LTV), automated Stripe and PhonePe subscription billing, and enterprise role-based access control.',
    problem: 'SaaS businesses struggle with fragmented billing tools, messy customer permission management, and lack of real-time visibility into usage-based metrics.',
    solution: 'Built a clean, responsive multi-tenant SaaS foundation with automated billing webhooks, workspace hierarchies, and high-performance charts.',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Tailwind CSS'],
    features: [
      'Comprehensive MRR, ARR, churn, and cohort retention telemetry visualizers',
      'Enterprise role-based access control (Owner, Admin, Member, Read-Only)',
      'Automated subscription lifecycle management with Stripe & PhonePe webhooks',
      'Granular API token generation and usage quota rate-limiting',
      'Exportable audit trails for SOC2 security and data governance compliance'
    ],
    architecture: 'Multi-tenant PostgreSQL database with row-level security (RLS) ensuring strict data isolation between customer workspaces. Next.js edge-rendered dashboard with WebSocket live metric pushes.',
    gallery: [
      {
        title: 'Executive Financial Telemetry',
        caption: 'High-density metric cards displaying active subscriptions, net retention, and expansion revenue.',
        color: '#0F172A',
        accent: '#38BDF8',
        tag: 'MRR & CHURN'
      },
      {
        title: 'Team Governance & Role Permissions',
        caption: 'Workspace member invitation and granular permission matrix with activity audit history.',
        color: '#1E293B',
        accent: '#60A5FA',
        tag: 'RBAC PERMISSIONS'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: 'https://github.com/techrizers/saas-dashboard-core',
    liveDemoUrl: 'https://saas-dashboard-demo.techrizers.com',
    status: 'Production Live'
  },
  {
    id: 'business-platform',
    slug: 'business-platform',
    title: 'Business Management Platform',
    category: 'WEB & SAAS',
    subCategory: 'INTERNAL ERP & OPERATIONS',
    projectType: 'Custom Software Development',
    industry: 'Corporate Operations & Workforce Management',
    description: 'All-in-one corporate business management platform for project allocation, milestone billing, and approval workflows.',
    fullDescription: 'Designed around proprietary enterprise operations, this platform consolidates resource allocation, timesheet approvals, customer project milestones, and departmental budget tracking into a unified interface.',
    problem: 'Enterprise departments operated in silos across spreadsheets, email approval chains, and disconnected accounting tools, creating severe tracking bottlenecks.',
    solution: 'TechRizers engineered a modular business operations suite featuring customizable approval chains, milestone delivery tracking, and live budget utilization.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'Custom multi-level approval workflows for expenditures, contracts, and leave',
      'Project milestone tracking with client acceptance sign-off forms',
      'Resource utilization heatmaps preventing team burnout and bench time',
      'Automated milestone invoicing with digital client authorization',
      'Comprehensive executive dashboards showing departmental gross margins'
    ],
    architecture: 'Modular Node.js backend using Domain-Driven Design (DDD). PostgreSQL relational store with audit triggers on all financial entities. Redis for real-time task queue processing.',
    gallery: [
      {
        title: 'Resource Allocation & Utilization Matrix',
        caption: 'Cross-project team staffing overview with capacity forecasting and bench allocation indicators.',
        color: '#172554',
        accent: '#2563EB',
        tag: 'RESOURCE ALLOCATION'
      },
      {
        title: 'Multi-Level Approval Chain Engine',
        caption: 'Interactive workflow designer allowing departments to configure hierarchical sign-off thresholds.',
        color: '#0F172A',
        accent: '#10B981',
        tag: 'APPROVAL WORKFLOW'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://business-platform-demo.techrizers.com',
    status: 'Active SLA'
  },
  {
    id: 'analytics-saas',
    slug: 'analytics-saas',
    title: 'Analytics SaaS',
    category: 'WEB & SAAS',
    subCategory: 'PRODUCT TELEMETRY & USER JOURNEYS',
    projectType: 'Web & SaaS Development',
    industry: 'Product Intelligence & Data Analytics',
    description: 'Privacy-focused product analytics SaaS tracking user funnels, session events, and feature engagement.',
    fullDescription: 'Analytics SaaS gives digital product teams real-time visibility into onboarding friction and user conversion journeys without violating GDPR or transmitting sensitive personal data.',
    problem: 'Standard analytics tools are increasingly blocked by privacy extensions, load heavy third-party tracking scripts, and sample large event volumes.',
    solution: 'Built a lightweight 4KB tracking script and a real-time event aggregation engine capable of ingesting millions of events with sub-second funnel querying.',
    technologies: ['Next.js', 'ClickHouse', 'Go', 'Redis', 'Tailwind CSS'],
    features: [
      'Ultralight 4KB tracking snippet with zero cookies and full GDPR/CCPA compliance',
      'Live user journey funnel visualizer with step-by-step drop-off inspection',
      'Feature flag engagement tracking measuring impact of new product releases',
      'Custom event segmentation and cohort retention comparison charts',
      'Real-time live visitor stream showing active user sessions and page paths'
    ],
    architecture: 'High-speed ingestion microservice written in Go pushing events to Apache Kafka / Redis streams, materialized into a ClickHouse columnar database for sub-second analytical aggregations.',
    gallery: [
      {
        title: 'Conversion Funnel & Drop-Off Inspector',
        caption: 'Multi-step user journey analysis identifying critical dropout points across registration and checkout.',
        color: '#1E293B',
        accent: '#F59E0B',
        tag: 'FUNNEL TELEMETRY'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://analytics-saas-demo.techrizers.com',
    status: 'Delivered'
  },
  {
    id: 'crm-platform',
    slug: 'crm-platform',
    title: 'CRM Platform',
    category: 'WEB & SAAS',
    subCategory: 'DEAL PIPELINE & SALES CADENCE',
    projectType: 'Web & SaaS Development',
    industry: 'Sales Operations & Lead Management',
    description: 'High-velocity sales CRM featuring Kanban pipeline boards, automated email sequences, and WhatsApp lead capture.',
    fullDescription: 'A modern CRM built for B2B sales teams. Features drag-and-drop opportunity pipelines, automated lead scoring, direct WhatsApp and telephony integration, and predictive deal closing forecasts.',
    problem: 'Sales reps wasted hours on administrative data entry across disconnected spreadsheets, resulting in forgotten follow-ups and lost pipeline revenue.',
    solution: 'Engineered an intuitive Kanban-driven CRM with automated two-way email tracking, WhatsApp lead capture triggers, and smart follow-up reminders.',
    technologies: ['React', 'Python', 'FastAPI', 'MongoDB', 'Celery', 'Redis'],
    features: [
      'Visual drag-and-drop deal pipeline with customizable stages and probability weights',
      'Instant lead capture via webhook integrations with landing pages and WhatsApp',
      'Automated email cadence engine with template variables and open/click tracking',
      'Activity timeline logging meetings, call notes, tasks, and contract revisions',
      'Sales performance leaderboard with quota attainment and revenue forecasting'
    ],
    architecture: 'React frontend with smooth drag-and-drop micro-interactions. FastAPI backend with MongoDB document storage for dynamic custom contact fields. Background Celery workers for scheduled email cadences.',
    gallery: [
      {
        title: 'Interactive Deal Pipeline Kanban',
        caption: 'Multi-stage sales pipeline board with deal value rollups and one-click stage progressions.',
        color: '#0F172A',
        accent: '#2563EB',
        tag: 'SALES PIPELINE'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: null,
    status: 'Delivered'
  },

  // ==========================================
  // 5. MOBILE APP
  // ==========================================
  {
    id: 'delivery-app',
    slug: 'delivery-app',
    title: 'Delivery App',
    category: 'MOBILE APP',
    subCategory: 'LAST-MILE LOGISTICS & DISPATCH',
    projectType: 'Mobile App Development',
    industry: 'On-Demand Logistics & Delivery',
    description: 'Cross-platform mobile delivery rider and customer tracking app with live GPS navigation and order routing.',
    fullDescription: 'Delivery App streamlines last-mile order fulfillment. Features real-time driver GPS tracking, battery-optimized turn-by-turn routing, instant proof-of-delivery photo capture, and customer arrival ETA alerts.',
    problem: 'Logistics fleets suffered from inefficient route choices, high customer support call volume regarding ETAs, and lost packages due to lack of digital delivery verification.',
    solution: 'Built dual cross-platform mobile apps for riders and customers using Flutter, backed by real-time WebSocket location telemetry and automated ETA push notifications.',
    technologies: ['Flutter', 'Node.js', 'Socket.io', 'Google Maps API', 'Firebase', 'PostgreSQL'],
    features: [
      'Live driver geolocation broadcasting with battery-conserving Kalman filters',
      'Turn-by-turn map navigation with real-time traffic obstacle rerouting',
      'Digital proof-of-delivery with customer signature and geotagged photo capture',
      'Dual-app architecture: Rider execution app and Customer tracking app',
      'Instant push notifications on order state changes (Dispatched, Nearby, Arrived)'
    ],
    architecture: 'Flutter codebase compiled natively for Android and iOS. Real-time location stream managed via Socket.io with Redis geospatial indexing, paired with Firebase Cloud Messaging for instant push notifications.',
    gallery: [
      {
        title: 'Driver Live Navigation & Route Overview',
        caption: 'Turn-by-turn delivery interface with optimized sequential stop ordering and traffic adjustments.',
        color: '#0F172A',
        accent: '#38BDF8',
        tag: 'GPS NAVIGATION'
      },
      {
        title: 'Customer Arrival Telemetry & ETA',
        caption: 'Customer view showing real-time rider motorbike movement and estimated minutes to arrival.',
        color: '#1E293B',
        accent: '#22C55E',
        tag: 'CUSTOMER TRACKING'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: 'https://github.com/techrizers/delivery-app-mobile',
    liveDemoUrl: 'https://delivery-app-demo.techrizers.com',
    status: 'Production Live'
  },
  {
    id: 'fitness-app',
    slug: 'fitness-app',
    title: 'Fitness App',
    category: 'MOBILE APP',
    subCategory: 'PERSONALIZED TRAINING & WEARABLE SYNC',
    projectType: 'Mobile App Development',
    industry: 'Health, Wellness & Mobile Training',
    description: 'Mobile workout companion app featuring guided exercise video streams, wearable biometric sync, and habit tracking.',
    fullDescription: 'Fitness App delivers personalized daily training programs, nutrition logging, and real-time heart rate synchronization from Apple Watch and Wear OS devices.',
    problem: 'Users abandon fitness apps due to generic non-adaptive workout routines, cumbersome manual calorie logging, and lack of visual progress momentum.',
    solution: 'Engineered an intuitive mobile application with adaptive workout progressions, Apple Health / Google Fit synchronization, and interactive strength trajectory charts.',
    technologies: ['React Native', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    features: [
      'Adaptive workout plan builder modifying rep/weight targets based on user feedback',
      'Biometric integration with Apple HealthKit and Google Health Connect',
      'Offline video caching allowing workout execution without internet connectivity',
      'Interactive strength and body composition progress trajectory visualizers',
      'Social community challenges and automated motivational push reminders'
    ],
    architecture: 'React Native application with native modules for HealthKit and Health Connect. GraphQL API gateway on AWS Lambda with cached CDN video delivery.',
    gallery: [
      {
        title: 'Daily Training & Rep Progression Screen',
        caption: 'Guided workout interface with exercise animation, rest timer, and set weight logging.',
        color: '#172554',
        accent: '#EF4444',
        tag: 'WORKOUT COMPANION'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://fitness-app-demo.techrizers.com',
    status: 'Delivered'
  },
  {
    id: 'booking-app',
    slug: 'booking-app',
    title: 'Service Booking App',
    category: 'MOBILE APP',
    subCategory: 'ON-DEMAND HOME & AUTO SERVICES',
    projectType: 'Mobile App Development',
    industry: 'Consumer Services & Marketplaces',
    description: 'On-demand service booking marketplace connecting consumers with verified technicians and instant mobile checkout.',
    fullDescription: 'Enables customers to book certified automotive and home technicians in their area, select service time slots, track technician arrival, and settle bills via UPI or Cards.',
    problem: 'Finding reliable service providers involved endless phone calls, unclear pricing, and uncertain appointment times.',
    solution: 'Built a customer booking app with upfront pricing, verified technician profiles, slot scheduling, and integrated payment escrow.',
    technologies: ['Flutter', 'Firebase', 'PhonePe PG', 'Node.js', 'PostgreSQL'],
    features: [
      'Multi-category service catalog with transparent itemized pricing estimates',
      'Real-time technician calendar availability and instant appointment booking',
      'In-app chat and VoIP calling between customer and assigned technician',
      'Secure payment gateway supporting PhonePe, UPI, and Credit/Debit Cards',
      'Post-service feedback, photographic inspection review, and warranty certificates'
    ],
    architecture: 'Flutter mobile application integrated with PhonePe mobile SDK. Node.js backend managing escrow payments, service provider dispatch, and PostgreSQL database records.',
    gallery: [
      {
        title: 'Service Catalog & Slot Selector',
        caption: 'Category exploration screen with dynamic date/time appointment picker and price summary.',
        color: '#0F172A',
        accent: '#3B82F6',
        tag: 'SERVICE SCHEDULING'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: null,
    status: 'Delivered'
  },
  {
    id: 'customer-app',
    slug: 'customer-app',
    title: 'Customer Loyalty App',
    category: 'MOBILE APP',
    subCategory: 'DIGITAL PASS & REWARD TIERS',
    projectType: 'Mobile App Development',
    industry: 'Retail & Hospitality Engagement',
    description: 'Digital membership pass, rewards redemption, and targeted push engagement mobile app for retail brands.',
    fullDescription: 'Replaces plastic loyalty cards with Apple Wallet / Google Wallet compatible digital passes, point balances, exclusive member discounts, and personalized promotional triggers.',
    problem: 'Retail brands suffered from low loyalty card retention as customers forgot plastic cards at home, reducing repeat visit frequency.',
    solution: 'Engineered a mobile loyalty application with barcode pass generation, real-time points ledger, and proximity-based promotional notifications.',
    technologies: ['React Native', 'Kotlin', 'Swift', 'AWS Amplify', 'Node.js'],
    features: [
      'Dynamic QR/Barcode membership pass compatible with retail POS optical scanners',
      'Tiered loyalty progression (Bronze, Silver, Gold, Platinum) with unlocked perks',
      'Instant points redemption voucher generator with countdown security timer',
      'Push notification engine triggering personalized offers based on visit recency',
      'Apple Wallet and Google Wallet one-tap pass export support'
    ],
    architecture: 'React Native cross-platform app leveraging native passbook APIs for iOS and Android. AWS Amplify backend with serverless Lambda microservices and DynamoDB reward ledger.',
    gallery: [
      {
        title: 'Digital Membership Card & Point Vault',
        caption: 'Clean digital membership card displaying tier status, scannable QR code, and available reward points.',
        color: '#1E293B',
        accent: '#F59E0B',
        tag: 'DIGITAL MEMBERSHIP'
      }
    ],
    results: 'Project outcome available on request.',
    githubUrl: null,
    liveDemoUrl: 'https://customer-pass-demo.techrizers.com',
    status: 'Delivered'
  }
];

// Helper functions for easy consumption
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug || p.id === slug) || null;
}

export function getProjectsByCategory(cat) {
  if (!cat || cat === 'ALL') return projects;
  return projects.filter((p) => p.category === cat);
}

export function getAdjacentProjects(currentSlug) {
  const index = projects.findIndex((p) => p.slug === currentSlug || p.id === currentSlug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0];
  return { prev, next };
}
