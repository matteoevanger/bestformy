import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  categories,
  industries,
  getCategoryBySlug,
  getIndustryBySlug,
  getTopToolsForCategory,
  comparisons,
  tools,
} from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import FAQ from '@/components/FAQ';
import type { FAQItem } from '@/components/FAQ';
import ScoreBadge from '@/components/ScoreBadge';

function getIndustryInsight(categorySlug: string, industrySlug: string): string {
  const categoryContexts: Record<string, Record<string, string>> = {
    crm: {
      plumbing: 'For plumbing businesses, a CRM helps track service calls, manage repeat customers, and follow up on estimates for larger jobs like repiping or water heater replacements. Automated reminders for annual maintenance visits can turn one-time emergency calls into recurring revenue.',
      electrical: 'Electrical contractors benefit from CRM tools that track job history per property, manage permit documentation, and schedule follow-ups for panel upgrades or inspection reminders. Keeping detailed records of past wiring work at each location builds trust and speeds up future service calls.',
      hvac: 'HVAC companies rely on CRM software to manage seasonal maintenance contracts, track equipment warranty dates, and automate tune-up reminders before peak heating and cooling seasons. A good CRM turns your install base into a predictable revenue stream through service agreement renewals.',
      dental: 'Dental practices use CRM to track patient retention, manage recall appointments, and monitor treatment plan acceptance rates. Automated birthday greetings and cleaning reminders keep patients engaged between visits and reduce no-show rates.',
      'real-estate': 'Real estate agents depend on CRM to nurture long sales cycles, track property preferences, and manage referral networks. The best CRMs for real estate automatically pull in listing data and trigger follow-ups when market conditions match a buyer\'s criteria.',
      fitness: 'Fitness businesses use CRM to track member engagement, identify at-risk cancellations, and manage trial-to-membership conversion funnels. Automated check-in tracking and milestone celebrations help reduce churn in an industry where retention is everything.',
      construction: 'Construction firms need CRM to manage complex bid pipelines, track subcontractor relationships, and maintain client communication across multi-month projects. Linking CRM data to project timelines helps prevent the revenue gaps that kill growing contractors.',
      restaurants: 'Restaurant CRM helps track guest preferences, manage loyalty programs, and coordinate catering leads. Integrating reservation data with purchase history lets you personalize marketing and turn occasional diners into regulars.',
      landscaping: 'Landscaping companies benefit from CRM that tracks seasonal service schedules, manages property-specific notes, and automates renewal quotes for annual contracts. Mapping customer locations helps optimize route planning and crew assignments.',
      cleaning: 'Cleaning businesses use CRM to manage recurring service schedules, track client property access details, and automate rebooking reminders. Quality tracking tied to specific cleaners helps maintain consistency as your team grows.',
      roofing: 'Roofing contractors need CRM to manage storm-driven lead surges, track insurance claim timelines, and follow up on inspection-generated estimates. The ability to handle high-volume leads after weather events can make or break your busiest seasons.',
      'pest-control': 'Pest control companies rely on CRM to manage recurring treatment schedules, track pest history by property, and automate seasonal prevention reminders. Route-optimized scheduling tied to customer records helps maximize daily service capacity.',
      'auto-repair': 'Auto repair shops use CRM to track vehicle service history, send maintenance reminders based on mileage intervals, and manage warranty claim follow-ups. Customers who receive timely oil change or tire rotation reminders return 40% more frequently.',
      veterinary: 'Veterinary practices benefit from CRM that tracks pet health records, vaccination schedules, and multi-pet household relationships. Automated wellness reminders and prescription refill alerts keep pets healthy and practices profitable.',
      photography: 'Photography businesses use CRM to manage booking pipelines, track client preferences and past session details, and automate delivery timelines. Seasonal rebooking campaigns for annual portraits or headshot updates keep your calendar full.',
      'wedding-planning': 'Wedding planners need CRM to manage vendor relationships, track client decision timelines, and coordinate dozens of moving pieces per event. A visual pipeline showing each couple\'s journey from inquiry to day-of keeps nothing falling through the cracks.',
      'insurance-agency': 'Insurance agencies depend on CRM to track policy renewal dates, manage cross-selling opportunities, and maintain compliance documentation. Automated renewal reminders 90 days before expiration dramatically improve retention rates.',
      'financial-advisor': 'Financial advisors use CRM to track client portfolio milestones, manage compliance-required communication logs, and schedule periodic reviews. Integration with financial planning tools ensures every touchpoint is informed by current portfolio data.',
      'law-firm': 'Law firms need CRM to manage client intake pipelines, track matter-specific communications, and monitor referral sources. Conflict checking integrated with contact records prevents ethical issues before they arise.',
      consulting: 'Consulting firms use CRM to manage proposal pipelines, track engagement history, and identify upsell opportunities within existing accounts. Linking project outcomes to client records helps demonstrate ROI during renewal conversations.',
    },
    'project-management': {
      construction: 'Construction projects involve complex dependencies between trades, weather delays, and permit timelines that generic task lists can\'t handle. Project management software with Gantt charts and resource leveling helps prevent the cascading delays that blow budgets.',
      landscaping: 'Landscaping companies juggle dozens of concurrent jobs across crews, making visual scheduling and route-based task assignment critical. Project management tools that support recurring task templates save hours of weekly planning for maintenance contracts.',
      'real-estate': 'Real estate teams managing transactions need project management to track closing checklists, coordinate between agents, lenders, and title companies. Template-based workflows ensure no step is missed across simultaneous deals.',
      cleaning: 'Cleaning companies use project management to coordinate crew schedules, track supply inventory per location, and manage quality checklists. Recurring task automation eliminates the daily scheduling overhead that limits growth.',
      roofing: 'Roofing contractors need project management to coordinate material deliveries, crew scheduling, and inspection milestones across weather-dependent timelines. Tracking photo documentation at each stage protects against disputes and supports insurance claims.',
      plumbing: 'Plumbing businesses managing larger renovation or new construction projects benefit from task tracking that coordinates between estimating, permitting, rough-in, and finish phases. Linking tasks to specific job addresses keeps field crews aligned.',
      electrical: 'Electrical contractors use project management to track permit applications, inspection scheduling, and multi-phase installation timelines. Panel schedules and load calculations linked to project tasks ensure nothing is energized before sign-off.',
      hvac: 'HVAC installation projects require coordination between equipment ordering, ductwork fabrication, and multi-day install crews. Project management tools that handle equipment lead times alongside labor scheduling prevent costly idle crew days.',
      dental: 'Dental practices use project management for office renovation coordination, new technology rollouts, and multi-location expansion planning. Task tracking across clinical staff, vendors, and contractors keeps complex projects on schedule.',
      fitness: 'Fitness businesses use project management for new location buildouts, program launches, and seasonal marketing campaigns. Coordinating between trainers, marketing, and facilities teams ensures smooth class schedule rollouts.',
      restaurants: 'Restaurant project management covers menu development cycles, renovation coordination, and multi-location consistency initiatives. Kitchen equipment installation timelines tied to permit and inspection milestones prevent costly opening delays.',
      consulting: 'Consulting firms rely on project management to track deliverables across multiple client engagements, manage team utilization, and coordinate research phases. Resource allocation views prevent overcommitting senior consultants across overlapping projects.',
      'staffing-agency': 'Staffing agencies use project management to coordinate large-scale placements, onboarding processes, and client fulfillment timelines. Tracking candidate pipelines alongside client deadlines ensures positions are filled before contracts are at risk.',
      'interior-design': 'Interior designers juggle procurement timelines, contractor schedules, and client approval cycles across multiple projects. Project management with visual boards and deadline tracking prevents the budget overruns that come from delayed material orders.',
      'wedding-planning': 'Wedding planners manage hundreds of tasks per event across 6-18 month timelines. Project management templates for vendor booking deadlines, payment schedules, and day-of logistics keep every celebration running smoothly.',
      'home-staging': 'Home staging companies coordinate furniture inventory, delivery logistics, and staging timelines aligned to listing dates. Project management ensures staged properties are photo-ready before the listing goes live.',
      photography: 'Photography businesses use project management to track shoot preparation, editing workflows, and delivery timelines across concurrent clients. Template-based post-production checklists ensure consistent quality at scale.',
      catering: 'Catering companies need project management to coordinate menu planning, ingredient procurement, staff scheduling, and equipment logistics for each event. Timeline views showing prep, transport, and service phases prevent day-of chaos.',
      'moving': 'Moving companies use project management to coordinate crew assignments, truck availability, and customer timelines across multiple daily jobs. Route optimization tied to scheduling ensures efficient loading sequences and on-time arrivals.',
      'solar-installation': 'Solar installation companies manage multi-week projects spanning site assessment, permitting, equipment procurement, installation, and utility interconnection. Project management that tracks regulatory approval timelines prevents crews from showing up before permits are ready.',
    },
    invoicing: {
      plumbing: 'Plumbing businesses need invoicing that handles both flat-rate service calls and time-and-materials billing for larger projects. The ability to photograph completed work and attach it to invoices reduces payment disputes on drain cleaning and leak repair jobs.',
      landscaping: 'Landscaping companies benefit from invoicing with recurring billing for maintenance contracts and variable line items for seasonal add-ons like mulching or leaf removal. Batch invoicing at month-end saves hours when managing 50+ weekly accounts.',
      cleaning: 'Cleaning businesses rely on invoicing that supports recurring schedules with automatic billing, add-on charges for deep cleans, and easy client payment portals. Integrating time tracking with invoicing ensures accurate billing for hourly contracts.',
      construction: 'Construction invoicing requires progress billing tied to project milestones, retention tracking, and change order documentation. AIA-format billing support is essential for commercial projects that require standardized pay applications.',
      photography: 'Photography businesses need invoicing that handles deposits, session fees, and print/digital product packages with clear payment schedules. Professional invoice presentation reinforces your creative brand and encourages timely payment.',
      consulting: 'Consulting firms need invoicing that supports hourly billing with detailed time entries, retainer billing, and expense pass-through. Clear breakdowns of hours by project phase help clients understand value and approve invoices faster.',
      'law-firm': 'Law firms require invoicing that handles trust account compliance, detailed time-entry billing, and LEDES format for corporate clients. Accurate time capture linked to billing codes ensures maximum revenue recovery.',
      freelance: 'Freelancers benefit from invoicing tools that track multiple client projects, support milestone-based payments, and send automatic payment reminders. Professional invoices with clear payment terms improve cash flow predictability.',
      electrical: 'Electrical contractors need invoicing that itemizes materials, labor rates by journeyman level, and permit fees. Mobile invoicing from the job site eliminates the end-of-week billing backlog that delays cash flow.',
      hvac: 'HVAC businesses benefit from invoicing that links to service agreements, tracks equipment warranty billing, and handles seasonal payment plans for large installations. Presenting financing options on invoices increases close rates on $10K+ system replacements.',
      'pest-control': 'Pest control companies need invoicing for recurring treatment plans with automatic billing cycles and seasonal service add-ons. Clear treatment documentation attached to invoices supports regulatory compliance and customer transparency.',
      'auto-repair': 'Auto repair shops need invoicing that integrates with parts catalogs, supports labor time guides, and itemizes warranty vs. customer-pay work. Digital invoices with photos of worn parts build trust and justify repair recommendations.',
      catering: 'Catering businesses need invoicing that handles deposits, per-person pricing, rental fees, and service charges in a clear format. Event-specific invoices with itemized menus help clients approve charges and plan budgets for future events.',
      'financial-advisor': 'Financial advisory firms need invoicing that calculates asset-based fees, supports quarterly billing cycles, and maintains compliance-ready billing records. Transparent fee breakdowns build client trust and simplify regulatory audits.',
      'staffing-agency': 'Staffing agencies require invoicing that handles weekly timesheet billing, markup calculations, and multi-rate billing for different job classifications. Automated invoice generation from approved timesheets eliminates manual calculation errors.',
    },
    'email-marketing': {
      dental: 'Dental practices use email marketing to send appointment reminders, promote teeth whitening specials, and share oral health tips that keep patients engaged between visits. Segmenting by treatment history lets you target patients due for cleanings or overdue for recommended procedures.',
      fitness: 'Fitness businesses rely on email marketing to reduce membership churn through workout tips, class schedule updates, and re-engagement campaigns for lapsed members. Automated welcome sequences for new members significantly improve 90-day retention rates.',
      restaurants: 'Restaurant email marketing drives repeat visits through weekly specials, event announcements, and birthday promotions. Segmenting by dining frequency and average spend lets you target high-value regulars differently from occasional visitors.',
      'real-estate': 'Real estate agents use email marketing to nurture buyer and seller leads with market updates, new listing alerts, and neighborhood guides. Drip campaigns that educate prospects over months convert at higher rates than cold outreach.',
      'wedding-planning': 'Wedding planners use email marketing to nurture newly engaged couples through the planning journey with seasonal booking reminders and vendor spotlights. Automated sequences triggered by inquiry date keep your services top-of-mind during the decision window.',
      photography: 'Photography businesses use email marketing to showcase recent work, promote seasonal mini-sessions, and send anniversary or milestone session reminders. Portfolio-rich emails that display well on mobile drive higher booking conversion rates.',
      'insurance-agency': 'Insurance agencies leverage email marketing for policy renewal reminders, coverage education, and cross-selling campaigns based on life events. Compliance-friendly templates with proper disclaimers protect your agency while maximizing engagement.',
      'financial-advisor': 'Financial advisors use email marketing for market commentary, quarterly portfolio summaries, and educational content that demonstrates expertise. SEC and FINRA compliant email workflows build trust while maintaining regulatory standards.',
      landscaping: 'Landscaping companies use email marketing to promote seasonal services — spring cleanup, summer lawn programs, fall aeration, and winter snow removal. Timely campaigns sent 2-3 weeks before each season capture bookings before competitors.',
      cleaning: 'Cleaning businesses use email marketing to upsell deep cleaning services, promote referral incentives, and send holiday scheduling reminders. Targeted campaigns for commercial vs. residential clients ensure relevant messaging.',
      consulting: 'Consulting firms use email marketing to share thought leadership, case studies, and industry insights that position them as experts. Segmented campaigns by industry vertical and service line generate qualified inbound leads.',
      'law-firm': 'Law firms use email marketing to share legal updates, client newsletters, and practice area expertise. Automated nurture sequences for consultation inquiries keep prospects engaged through often lengthy decision-making processes.',
      'auto-repair': 'Auto repair shops use email marketing to send service reminders based on mileage or time intervals, promote seasonal specials like tire changes, and share car care tips. Automated maintenance reminder emails drive 25-35% of recurring revenue.',
      veterinary: 'Veterinary practices use email marketing for vaccination reminders, wellness plan enrollment campaigns, and new service announcements. Pet birthday emails and seasonal health tips keep your practice top-of-mind between visits.',
      'pet-grooming': 'Pet grooming businesses use email marketing to send rebooking reminders based on breed-specific grooming schedules and promote seasonal services like de-shedding treatments. Automated reminders at optimal grooming intervals maximize booking frequency.',
    },
    accounting: {
      construction: 'Construction accounting requires job costing, progress billing, and retention tracking that general accounting tools often handle poorly. The ability to track costs and revenue by project, phase, and cost code is non-negotiable for profitable contracting.',
      restaurants: 'Restaurant accounting must handle daily sales reconciliation, food cost tracking, tip reporting, and multi-location consolidation. Integration with your POS system eliminates hours of manual data entry and gives real-time visibility into food cost percentages.',
      'real-estate': 'Real estate accounting needs to track commission splits, escrow accounts, and property management income across multiple entities. Trust account reconciliation and 1099 generation for agents are critical compliance requirements.',
      landscaping: 'Landscaping companies need accounting that tracks revenue and costs by service type — maintenance contracts vs. installation projects have very different margins. Seasonal cash flow forecasting prevents the winter cash crunches that hurt growing operations.',
      cleaning: 'Cleaning businesses benefit from accounting that tracks profitability per client or location, manages payroll for distributed teams, and handles the sales tax complexity of service businesses across multiple jurisdictions.',
      plumbing: 'Plumbing businesses need accounting that supports job costing for installations, tracks inventory of common parts and fixtures, and manages subcontractor payments for specialized work like gas line installation.',
      electrical: 'Electrical contractors require accounting with strong job costing, prevailing wage tracking for government work, and certified payroll reporting. Material cost tracking against estimates helps identify which job types are actually profitable.',
      hvac: 'HVAC companies need accounting that handles equipment inventory valuation, manufacturer rebate tracking, and service agreement deferred revenue. Seasonal revenue patterns make cash flow projection features especially important.',
      dental: 'Dental practice accounting must integrate with insurance billing systems, track collections by provider, and manage equipment depreciation for expensive imaging and treatment technology. Cash vs. accrual flexibility matters for tax planning.',
      consulting: 'Consulting firm accounting needs strong time-based revenue recognition, project profitability analysis, and multi-currency support for international engagements. Tracking utilization rates alongside financial metrics reveals your true per-consultant economics.',
      'law-firm': 'Law firm accounting requires trust account (IOLTA) management, partner distribution tracking, and matter-based revenue recognition. Compliance with bar association financial requirements is non-negotiable and general tools often fall short.',
      'financial-advisor': 'Financial advisory accounting handles fee-based revenue recognition, regulatory reserve requirements, and commission reconciliation across custodian platforms. Integration with portfolio management systems streamlines AUM-based billing calculations.',
      'insurance-agency': 'Insurance agency accounting must track commission income by carrier, manage contingency bonus accruals, and reconcile policy-level revenue. The delayed and variable nature of insurance commissions makes revenue forecasting particularly challenging.',
      fitness: 'Fitness business accounting needs to handle membership revenue recognition, equipment lease tracking, and personal training revenue allocation. Deferred revenue from annual memberships and prepaid packages requires careful monthly recognition.',
      catering: 'Catering business accounting must track event-level profitability, manage food cost percentages, and handle deposit and final payment reconciliation. Seasonal revenue patterns and large event deposits require careful cash flow management.',
    },
    scheduling: {
      dental: 'Dental scheduling must handle different appointment durations by procedure type, manage hygienist vs. dentist availability, and minimize chair downtime. Automated recall scheduling for cleanings every 6 months is a revenue lifeline for dental practices.',
      veterinary: 'Veterinary scheduling needs to accommodate varied appointment lengths — a wellness check takes 15 minutes, a surgery consultation takes 45. Species-specific scheduling and emergency slot management keep the clinic running smoothly.',
      chiropractic: 'Chiropractic offices benefit from scheduling that handles recurring weekly or bi-weekly adjustments, manages multiple treatment rooms, and sends automated appointment reminders. Easy online rebooking for maintenance patients reduces front desk workload.',
      'physical-therapy': 'Physical therapy scheduling must manage recurring sessions across treatment plans, track authorization visit counts, and coordinate multiple therapist specialties. Patient self-scheduling for follow-up visits improves adherence to care plans.',
      optometry: 'Optometry scheduling handles varied appointment types from quick contact lens pickups to comprehensive eye exams, with proper time blocking for dilation appointments. Integration with optical inventory helps convert exams into same-day eyewear purchases.',
      fitness: 'Fitness businesses need scheduling that handles class bookings with capacity limits, personal training appointments, and waitlist management. Real-time availability and easy cancellation rebooking maximize class utilization rates.',
      'pet-grooming': 'Pet grooming scheduling must account for breed-specific service durations, manage multiple grooming stations, and handle drop-off and pickup time windows. Automated rebooking at breed-appropriate intervals keeps the appointment book full.',
      photography: 'Photography scheduling manages session bookings with travel time buffers, coordinates location availability, and handles seasonal demand spikes for holiday and graduation portraits. Client self-scheduling with package selection streamlines the booking process.',
      'hair-salon': 'Salon scheduling must handle multiple service providers with different specialties, manage combined services like color-and-cut appointments, and track stylist utilization. Online booking with real-time availability reduces no-shows by 30-40%.',
      plumbing: 'Plumbing businesses need scheduling that balances emergency service calls with planned appointments, manages technician dispatch zones, and handles estimated arrival windows. Customer-facing booking with service type selection helps triage urgency.',
      electrical: 'Electrical contractors use scheduling to coordinate between service calls and project-based work, manage apprentice-to-journeyman crew ratios, and track permit inspection windows. Buffer time between jobs accounts for unpredictable troubleshooting.',
      hvac: 'HVAC scheduling manages seasonal demand surges — AC in summer, heating in winter — alongside year-round maintenance agreement visits. Smart scheduling that routes technicians by zone and skill level maximizes daily service capacity.',
      'wedding-planning': 'Wedding planner scheduling coordinates vendor meetings, venue walkthroughs, and client consultations across a 12-18 month planning timeline. Calendar blocking for wedding weekends and rehearsal dinners ensures you never double-book your most important dates.',
      consulting: 'Consulting scheduling manages client meeting availability across time zones, coordinates team workshop sessions, and protects focused work blocks. Calendar link sharing with automated timezone conversion reduces the back-and-forth of booking calls.',
      'auto-repair': 'Auto repair scheduling needs to manage bay availability, account for estimated repair durations, and handle both appointments and walk-ins. Loaner car or shuttle scheduling tied to longer repair jobs improves the customer experience.',
    },
    'field-service': {
      plumbing: 'Plumbing businesses need field service software that handles emergency dispatching, tracks parts inventory on service trucks, and generates on-site estimates with photo documentation. GPS-based technician routing and real-time job status updates keep both office staff and homeowners informed.',
      electrical: 'Electrical contractors rely on field service tools to manage service calls, track permitting requirements per jurisdiction, and document panel schedules with photos. Digital forms for safety checklists and inspection reports replace the paper processes that slow down compliance.',
      hvac: 'HVAC companies depend on field service software to manage seasonal maintenance programs, track equipment serial numbers and warranty status, and dispatch the right technician based on certification level. Flat-rate pricing books linked to the mobile app eliminate estimate hesitation in the field.',
      landscaping: 'Landscaping businesses use field service management to optimize crew routes, track time per property, and manage seasonal service transitions. GPS tracking and job costing per property help identify which accounts are actually profitable.',
      cleaning: 'Cleaning companies need field service tools that manage recurring schedules, provide client-specific access instructions, and track cleaning supply usage by location. Mobile check-in/out with geotagging provides accountability for distributed cleaning crews.',
      'pest-control': 'Pest control companies require field service software that tracks treatment history by property, manages EPA-mandated documentation, and schedules recurring quarterly treatments. Mobile access to property history lets technicians make informed treatment decisions on-site.',
      roofing: 'Roofing contractors use field service tools to document storm damage with photos and measurements, generate insurance-ready estimates, and track crew assignments across weather-dependent timelines. Aerial measurement integration eliminates the need for dangerous manual roof measurements.',
      'auto-repair': 'Auto repair shops benefit from field service features for mobile mechanic operations, roadside assistance dispatching, and fleet maintenance scheduling. Digital vehicle inspection reports with photos and videos build customer trust and increase average repair order values.',
      'pool-service': 'Pool service companies need field service software to manage weekly route schedules, track chemical readings and treatments, and photograph water test results for compliance records. Route optimization across dozens of weekly stops directly impacts technician productivity.',
      'solar-installation': 'Solar installation companies use field service tools to coordinate site assessments, manage multi-day installation crews, and track post-install monitoring and maintenance visits. Integration with design tools and permitting workflows keeps projects moving from sale to interconnection.',
      'garage-door': 'Garage door companies need field service software for same-day emergency dispatching, spring and opener inventory tracking, and on-site estimate generation with good-better-best pricing. Quick photo-based quoting from the truck speeds up the sales process.',
      'appliance-repair': 'Appliance repair businesses use field service management to dispatch technicians by appliance specialty, track common parts inventory on trucks, and manage manufacturer warranty claim processes. Diagnostic notes linked to appliance model numbers help technicians arrive prepared.',
      handyman: 'Handyman businesses use field service tools to manage diverse job types ranging from 30-minute fixes to full-day projects, track materials and time per job, and generate clear invoices. Simple scheduling with customer communication keeps the solo operator organized as the business grows.',
      'window-cleaning': 'Window cleaning companies need field service software to manage route-based scheduling, track building-specific access requirements, and handle seasonal commercial contracts. Job photos documenting before and after results support quality guarantees and premium pricing.',
      'pressure-washing': 'Pressure washing businesses use field service tools to manage weather-dependent scheduling, track equipment and chemical usage per job, and handle before/after photo documentation. Route optimization for neighborhood blitzes maximizes daily job capacity during peak season.',
    },
    'social-media': {
      restaurants: 'Restaurants depend on social media to showcase daily specials, share behind-the-scenes kitchen content, and respond to reviews that directly impact foot traffic. Scheduling tools that support food photography and video perform best for the visual-heavy content that drives restaurant discovery.',
      fitness: 'Fitness businesses use social media to share transformation stories, promote class schedules, and build community that reduces membership churn. Consistent posting of workout tips and member spotlights drives organic reach in a visually driven industry.',
      'real-estate': 'Real estate agents rely on social media for property showcases, market update videos, and community spotlight content that builds local expertise. Scheduling tools with strong video support and analytics help identify which content types generate the most leads.',
      photography: 'Photography businesses use social media as their primary portfolio and lead generation channel. Scheduling tools that handle high-resolution image posting, maintain aspect ratios across platforms, and track engagement by content type help photographers grow their brand.',
      'wedding-planning': 'Wedding planners use social media to showcase real weddings, share planning tips, and attract newly engaged couples during peak engagement season. Instagram and Pinterest scheduling with strong visual capabilities is essential for this aspirational industry.',
      dental: 'Dental practices use social media to share patient testimonials (with consent), promote cosmetic services, and educate about preventive care. Consistent, professional content builds trust and makes dental visits feel less intimidating to anxious patients.',
      'interior-design': 'Interior designers use social media as a visual portfolio that drives client inquiries. Before-and-after reveals, design process content, and room tours perform exceptionally well, making scheduling tools with strong image and video support essential.',
      landscaping: 'Landscaping companies use social media to showcase seasonal transformations, share lawn care tips, and post before-and-after project galleries. Timing posts for spring and fall when homeowners are planning outdoor projects maximizes lead generation.',
      cleaning: 'Cleaning businesses use social media to share cleaning tips, before-and-after results, and customer testimonials that build trust. Consistent posting helps overcome the inherent trust barrier of letting strangers into your home or business.',
      consulting: 'Consulting firms use social media for thought leadership content, industry analysis, and team expertise showcasing. LinkedIn-focused scheduling with article publishing and engagement tracking helps consultants build the personal brands that drive inbound leads.',
      'law-firm': 'Law firms use social media to share legal insights, case results, and community involvement that humanizes the practice. Compliance-conscious scheduling that supports review workflows ensures posts meet bar association advertising rules.',
      catering: 'Catering companies use social media to showcase event setups, menu presentations, and client celebrations. Seasonal content calendars timed to wedding season, holiday parties, and corporate event planning cycles maximize inquiry volume.',
      'pet-grooming': 'Pet grooming businesses thrive on social media with adorable before-and-after photos and videos that generate shares and referrals. Scheduling tools that make it easy to post daily transformations build a loyal following that translates directly to bookings.',
      'auto-repair': 'Auto repair shops use social media to share maintenance tips, explain common repairs with photos, and build the transparency that overcomes consumer distrust of mechanics. Educational content that demystifies car care builds a loyal customer base.',
      veterinary: 'Veterinary practices use social media to share pet health tips, celebrate patient milestones, and showcase the compassionate care that differentiates your practice. Pet content naturally generates high engagement, making social media one of the most cost-effective marketing channels for vets.',
    },
    'website-builder': {
      restaurants: 'Restaurant websites need seamless menu display, online ordering integration, and reservation widgets that work on mobile. Speed matters — hungry customers searching on their phones will bounce from a slow-loading site to the next result in seconds.',
      'real-estate': 'Real estate websites need IDX listing integration, property search functionality, and lead capture forms that connect to your CRM. Agent profile pages with market expertise content help build the local authority that drives organic traffic.',
      photography: 'Photography websites are visual portfolios first, requiring fast-loading galleries, responsive image display, and easy client proofing integration. Design quality directly reflects your professional aesthetic and influences hiring decisions.',
      fitness: 'Fitness business websites need class schedule displays, membership signup forms, and instructor profile pages. Integration with booking and payment systems creates a frictionless path from website visitor to paying member.',
      dental: 'Dental practice websites need online appointment booking, insurance information pages, and before-and-after galleries for cosmetic services. HIPAA-conscious contact forms and patient portal links are essential trust-building elements.',
      plumbing: 'Plumbing business websites need prominent phone numbers, service area pages for local SEO, and emergency call-to-action buttons. Mobile-first design is critical since most plumbing emergencies generate phone searches from homeowners.',
      'wedding-planning': 'Wedding planner websites need stunning visual galleries, inquiry forms with event date fields, and vendor partner pages. The site itself demonstrates your aesthetic sensibility, making design quality a make-or-break factor for bookings.',
      consulting: 'Consulting firm websites need case study showcases, team credential pages, and thought leadership blogs that establish expertise. Clean, professional design with clear service descriptions helps visitors quickly determine if you\'re the right fit.',
      'law-firm': 'Law firm websites need practice area landing pages, attorney bio pages, and consultation booking forms. Content demonstrating expertise in specific legal areas drives the organic search traffic that generates qualified client inquiries.',
      landscaping: 'Landscaping business websites need project gallery pages organized by service type, service area coverage maps, and seasonal promotion landing pages. Before-and-after sliders showcase your work quality better than text descriptions.',
      'interior-design': 'Interior design websites are portfolio-first, requiring beautiful project galleries with room-by-room navigation, design process descriptions, and inquiry forms. The website\'s own design quality serves as your first audition piece.',
      cleaning: 'Cleaning business websites need instant quote calculators, service area pages, and trust signals like insurance verification and background check badges. Easy online booking converts website visitors into scheduled appointments.',
      'auto-repair': 'Auto repair shop websites need appointment scheduling, service menu pages, and customer review integration. Transparent pricing pages and technician certification displays help overcome the trust gap that keeps customers shopping around.',
      electrical: 'Electrical contractor websites need service area pages optimized for local search, emergency contact features, and license/insurance credential displays. Portfolio pages showing commercial and residential work help attract the right project types.',
      'insurance-agency': 'Insurance agency websites need quote request forms, coverage explanation pages, and carrier partner listings. Educational content about coverage types helps SEO while building the trust that converts visitors into policyholders.',
    },
    payroll: {
      restaurants: 'Restaurant payroll must handle tipped employees, tip credit calculations, split shifts, and varying overtime rules that differ by state. Accurate tip pooling distribution and tip reporting compliance prevent the labor violations that can shut down a restaurant.',
      construction: 'Construction payroll requires certified payroll reporting for prevailing wage jobs, union benefit tracking, and multi-state compliance for crews working across state lines. Job costing integration ties labor costs to specific projects for accurate bidding.',
      dental: 'Dental practice payroll handles salaried dentists, hourly hygienists, and production-based compensation structures that can vary month to month. Benefits administration for health insurance and retirement plans is especially important for attracting skilled clinicians.',
      'real-estate': 'Real estate payroll manages commission splits, draws against future commissions, and 1099 vs. W-2 classification for agents. Automated commission calculation tied to closing data reduces the manual work that causes payment delays and agent frustration.',
      cleaning: 'Cleaning company payroll manages distributed hourly workers across multiple locations, tracks mileage reimbursement between job sites, and handles the workers\' compensation classification that varies by service type.',
      landscaping: 'Landscaping payroll handles seasonal workers, H-2B visa employee documentation, and variable overtime across 50+ hour peak-season weeks. Accurate time tracking integration prevents the wage-and-hour claims that increasingly target landscaping companies.',
      plumbing: 'Plumbing company payroll must handle different pay rates for apprentices, journeymen, and master plumbers, plus prevailing wage requirements for government contracts. Overtime calculation for on-call emergency work requires careful compliance tracking.',
      electrical: 'Electrical contractor payroll manages union and non-union pay scales, apprenticeship wage progression, and per diem for out-of-town projects. Certified payroll reporting for public works projects is a common compliance requirement.',
      hvac: 'HVAC company payroll handles seasonal overtime spikes, performance-based bonuses for maintenance agreement sales, and spiff programs for equipment upgrades. Multi-state compliance is important for HVAC companies that cross state lines for commercial work.',
      fitness: 'Fitness business payroll manages a mix of salaried managers, hourly front-desk staff, and independent contractor trainers — each with different classification requirements. Misclassifying trainers as contractors is one of the most common and costly mistakes in the fitness industry.',
      'law-firm': 'Law firm payroll handles partner distributions, associate bonuses, and paralegal overtime across often complex compensation structures. Year-end bonus processing and K-1 preparation for partners add seasonal complexity.',
      'staffing-agency': 'Staffing agency payroll is the core of the business — processing hundreds of weekly timesheets across multiple client pay rates, managing benefits for placed workers, and handling the multi-state compliance that comes with placing workers at client locations nationwide.',
      catering: 'Catering company payroll manages event-based scheduling with variable hours, handles tipped employee calculations for service staff, and processes same-day hires for large events. Overtime compliance across back-to-back event weekends requires careful tracking.',
      'auto-repair': 'Auto repair shop payroll handles flat-rate technician compensation, hourly service writers, and performance-based bonuses. Accurate flagged-hour tracking that ties to the shop management system ensures technicians are paid correctly for their productivity.',
      'financial-advisor': 'Financial advisory firm payroll manages base-plus-commission structures, AUM-based compensation tiers, and deferred compensation plans. Compliance with industry-specific compensation regulations adds complexity beyond standard payroll processing.',
    },
  };

  const categoryData = categoryContexts[categorySlug];
  if (categoryData && categoryData[industrySlug]) {
    return categoryData[industrySlug];
  }

  // Deterministic fallback: generate a context-aware description from category + industry
  const categoryNames: Record<string, string> = {
    crm: 'CRM',
    'project-management': 'project management',
    invoicing: 'invoicing',
    'email-marketing': 'email marketing',
    accounting: 'accounting',
    scheduling: 'scheduling',
    'field-service': 'field service management',
    'social-media': 'social media management',
    'website-builder': 'website builder',
    payroll: 'payroll',
  };

  const industryTraits: Record<string, string> = {
    landscaping: 'seasonal service cycles and crew coordination',
    plumbing: 'emergency service calls and repeat maintenance customers',
    electrical: 'permit tracking and multi-phase project timelines',
    hvac: 'seasonal demand surges and equipment warranty management',
    roofing: 'weather-dependent scheduling and insurance claim workflows',
    dental: 'patient retention and appointment compliance',
    'real-estate': 'long sales cycles and relationship nurturing',
    fitness: 'member retention and class scheduling',
    construction: 'job costing and subcontractor coordination',
    restaurants: 'daily operations and perishable inventory management',
    cleaning: 'recurring service schedules and distributed workforce management',
    'pest-control': 'recurring treatment plans and regulatory compliance',
    moving: 'logistics coordination and seasonal demand',
    painting: 'estimate management and project scheduling',
    flooring: 'material procurement and installation timelines',
    'auto-repair': 'vehicle service history and parts inventory',
    veterinary: 'patient records and vaccination scheduling',
    chiropractic: 'recurring appointments and treatment plan tracking',
    'physical-therapy': 'treatment authorization tracking and session management',
    optometry: 'exam scheduling and optical inventory',
    pharmacy: 'prescription management and regulatory compliance',
    'home-staging': 'inventory tracking and real estate agent coordination',
    'interior-design': 'project timelines and vendor procurement',
    photography: 'booking management and client delivery workflows',
    'wedding-planning': 'vendor coordination and long-term event timelines',
    tutoring: 'session scheduling and student progress tracking',
    daycare: 'enrollment management and parent communication',
    'pet-grooming': 'breed-specific scheduling and rebooking automation',
    'lawn-care': 'route optimization and seasonal service transitions',
    'pool-service': 'chemical tracking and weekly route management',
    'solar-installation': 'permitting workflows and multi-phase installations',
    'garage-door': 'emergency dispatching and parts inventory',
    fencing: 'material estimation and project scheduling',
    'tree-service': 'safety compliance and seasonal demand management',
    'pressure-washing': 'weather-dependent scheduling and route optimization',
    locksmith: 'emergency dispatching and mobile service management',
    'appliance-repair': 'parts tracking and warranty claim processing',
    'carpet-cleaning': 'route scheduling and equipment maintenance',
    'window-cleaning': 'route-based scheduling and building access coordination',
    'junk-removal': 'truck capacity management and disposal logistics',
    handyman: 'diverse job types and flexible scheduling',
    'insurance-agency': 'policy renewal tracking and carrier relationships',
    'mortgage-broker': 'loan pipeline management and compliance documentation',
    'financial-advisor': 'client portfolio tracking and regulatory compliance',
    'tax-preparation': 'seasonal workload management and document collection',
    'law-firm': 'matter tracking and compliance requirements',
    consulting: 'client engagement management and utilization tracking',
    'staffing-agency': 'candidate placement and timesheet processing',
    catering: 'event logistics and menu costing',
    'food-truck': 'location scheduling and inventory management',
  };

  const catName = categoryNames[categorySlug] || categorySlug.replace(/-/g, ' ');
  const trait = industryTraits[industrySlug] || 'day-to-day operations and customer management';
  const indName = industrySlug.replace(/-/g, ' ');

  return `${catName.charAt(0).toUpperCase() + catName.slice(1)} software is particularly valuable for ${indName} businesses that need to streamline ${trait}. The right tool helps you spend less time on administrative tasks and more time growing your business and serving customers.`;
}

interface Props {
  params: { category: string; industry: string };
}

export function generateStaticParams() {
  const params: { category: string; industry: string }[] = [];
  for (const cat of categories) {
    for (const ind of industries) {
      params.push({ category: cat.slug, industry: ind.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.category);
  const industry = getIndustryBySlug(params.industry);
  if (!category || !industry) return {};
  const title = `Best ${category.name} Software for ${industry.name} in 2026`;
  const description = `Compare the top ${category.name} tools for ${industry.name} businesses. Expert reviews, pricing, and feature comparisons to help you choose.`;
  return {
    title,
    description,
    alternates: {
      canonical: `https://bestformy.com/best/${category.slug}/for/${industry.slug}`,
    },
    openGraph: { title, description },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);
  const industry = getIndustryBySlug(params.industry);
  if (!category || !industry) notFound();

  const topTools = getTopToolsForCategory(category.slug);

  const faqItems: FAQItem[] = [
    {
      question: `What is the best ${category.name} software for ${industry.name}?`,
      answer: `Based on our analysis, ${topTools[0]?.name} is the top-rated ${category.name} tool for ${industry.name} businesses in 2026, scoring ${topTools[0]?.score.toFixed(1)}/10. However, the best choice depends on your specific needs, team size, and budget.`,
    },
    {
      question: `How much does ${category.name} software cost for ${industry.name} businesses?`,
      answer: `${category.name} software pricing varies widely. Free tiers are available from some providers, while premium plans range from $10 to $300+ per month. Most ${industry.name} businesses find a good fit in the $15-$50/month range.`,
    },
    {
      question: `Do ${industry.name} businesses need specialized ${category.name} software?`,
      answer: `While general ${category.name} tools work for most ${industry.name} businesses, industry-specific features like job scheduling, field service management, and industry-specific templates can improve efficiency significantly.`,
    },
    {
      question: `Can I switch ${category.name} tools later?`,
      answer: `Yes, most modern ${category.name} tools support data import/export. However, switching costs time, so it's worth evaluating your options carefully before committing.`,
    },
  ];

  const relatedComparisons = comparisons.filter((c) => {
    const toolA = tools.find((t) => t.slug === c.toolA);
    const toolB = tools.find((t) => t.slug === c.toolB);
    return toolA?.category === category.slug || toolB?.category === category.slug;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600">
            Home
          </Link>{' '}
          / <span>{category.name}</span> /{' '}
          <span>{industry.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Best {category.name} Software for {industry.name} in 2026
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">
          We analyzed and compared the top {category.name} tools to find the
          best options for {industry.name} businesses. Here are our top picks
          based on features, pricing, ease of use, and value.
        </p>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
          {getIndustryInsight(category.slug, industry.slug)}
        </p>

        {/* Top Picks */}
        <section className="space-y-6 mb-12">
          {topTools.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} rank={i + 1} />
          ))}
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="text-left p-4 font-semibold">Tool</th>
                  <th className="text-left p-4 font-semibold">Score</th>
                  <th className="text-left p-4 font-semibold">Starting Price</th>
                  <th className="text-left p-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {topTools.map((tool) => (
                  <tr
                    key={tool.slug}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-4">
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="font-semibold text-primary-600 dark:text-primary-300 hover:underline"
                      >
                        {tool.name}
                      </Link>
                    </td>
                    <td className="p-4">
                      <ScoreBadge score={tool.score} />
                    </td>
                    <td className="p-4">{tool.pricing[0].price}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {tool.pros[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Comparisons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedComparisons.map((comp) => {
                const tA = tools.find((t) => t.slug === comp.toolA);
                const tB = tools.find((t) => t.slug === comp.toolB);
                return (
                  <Link
                    key={comp.slug}
                    href={`/compare/${comp.slug}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tA?.name} vs {tB?.name}
                    </span>
                    <span className="text-primary-600 dark:text-primary-300 text-sm ml-2">
                      &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Other Industries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {category.name} for Other Industries
          </h2>
          <div className="flex flex-wrap gap-2">
            {industries
              .filter((ind) => ind.slug !== industry.slug)
              .map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/best/${category.slug}/for/${ind.slug}`}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:border-primary-300 transition-colors"
                >
                  {category.name} for {ind.name}
                </Link>
              ))}
          </div>
        </section>

        <FAQ items={faqItems} />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Best ${category.name} for ${industry.name}`,
            itemListElement: topTools.map((tool, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'SoftwareApplication',
                name: tool.name,
                description: tool.description,
                applicationCategory: category.name,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: tool.score,
                  bestRating: 10,
                  worstRating: 0,
                },
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
