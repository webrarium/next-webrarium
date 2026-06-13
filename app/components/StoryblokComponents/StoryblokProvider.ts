"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import Page from "./Page";
import HeaderS from "./HeaderS";
import NavLink from "./NavLink";
import Hero from "./Hero/Hero";
import WorkTL from "./WorkTL/WorkTL";
import WorkTLCard from "./WorkTL/WorkTLCard";
import Stack from "./Stack/Stack";
import Focus from "./Focus/Focus";
import FocusCard from "./Focus/FocusCard";
import LatestProjects from "./LatestProjects/LatestProjects";
import ProjectCard from "./LatestProjects/LatestProjectsCard";
import Cta from "./Cta/Cta";
import Partners from "./Partners/Partners";
import PartnerLogo from "./Partners/PartnerLogo";
import Testimonials from "./Testimonials/Testimonials";
import TestimonialCard from "./Testimonials/TestimonialCard";
import Contact from "./Contact/Contact";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import ProjectPage from "./ProjectPage/ProjectPage";
import ProjectsGrid from "./Projects/ProjectsGrid";
import ServicePage from "./ServicePage/ServicePage";
import ServicesGrid from "./Services/ServicesGrid";
import h1Heading from "./h1_heading";
import ServiceDetails from "./ServicePage/ServiceDetails";
import ServiceDetailsCard from "./ServicePage/ServiceDetailsCard";
import ServiceNeed from "./ServicePage/ServiceNeed";
import ServiceNeedCard from "./ServicePage/ServiceNeedCard";
import ServiceInstruments from "./ServicePage/ServiceInstruments";
import ServiceInstrumentsCard from "./ServicePage/ServiceInstrumentsCard";
import ProjectHeadline from "./ProjectPage/ProjectHeadline";
import ProjectChallengeInstruments from "./ProjectPage/ProjectChallengeInstruments";
import ProjectResults from "./ProjectPage/ProjectResults";
import ProjectResultsCard from "./ProjectPage/ProjectResultsCard";
import ProjectRealization from "./ProjectPage/ProjectRealization";
import ProjectImplementation from "./ProjectPage/ProjectImplementation";
import Clutch from "./Clutch/Clutch";
import ServiceFAQ from "./ServicePage/ServiceFAQ";

const components = {
	page: Page,
	h1_heading: h1Heading,
	hero: Hero,
	header: HeaderS,
	nav_link: NavLink,
	work_tl: WorkTL,
	work_tl_card: WorkTLCard,
	stack: Stack,
	focus: Focus,
	focus_card: FocusCard,
	latest_projects: LatestProjects,
	project_card: ProjectCard,
	cta: Cta,
	partners: Partners,
	partner_logo: PartnerLogo,
	testimonials: Testimonials,
	testimonial_card: TestimonialCard,
	contact: Contact,
	privacy_policy: PrivacyPolicy,
	project: ProjectPage,
	projects_grid: ProjectsGrid,
	project_headline: ProjectHeadline,
	project_challenge_and_instruments: ProjectChallengeInstruments,
	project_results: ProjectResults,
	project_results_card: ProjectResultsCard,
	project_realization: ProjectRealization,
	service: ServicePage,
	services_grid: ServicesGrid,
	service_details: ServiceDetails,
	service_details_card: ServiceDetailsCard,
	service_need: ServiceNeed,
	service_need_card: ServiceNeedCard,
	service_instruments: ServiceInstruments,
	service_instruments_card: ServiceInstrumentsCard,
	project_implementation: ProjectImplementation,
	clutch: Clutch,
	service_faq: ServiceFAQ,
};

storyblokInit({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
	// accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	components,
});

export default function StoryblokProvider({ children }: any) {
	return children;
}
