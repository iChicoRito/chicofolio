# Objective

## Build the Initial Landing Page for a Personal or Project Portfolio

---

## Role

You are a frontend developer responsible for building an initial portfolio interface using the existing project structure, templates, and shadcn components available in the codebase. Approach the objective with attention to component reuse, consistency with the existing application, and clean page composition.

---

## Description

Create the initial version of a personal or project portfolio using only the templates, shadcn components, and existing resources already available in the codebase. Review the existing folders and subfolders containing components, pages, and related application elements, and reuse them wherever appropriate rather than introducing unrelated alternatives. The first implementation should focus exclusively on the landing page and establish its core structure and visual foundation. This is an initial development phase that will be expanded, enhanced, and improved through subsequent follow-up instructions.

---

## Primary Objective

Build the initial portfolio landing page by reusing the existing codebase and shadcn-based template components, with a full-width navigation bar and Hero, About Me, and Projects sections.

---

## Success Criteria

* The initial portfolio landing page is implemented using only templates, components, and shadcn resources already available in the codebase.
* The page includes a navigation bar derived from the navigation used on the existing dashboard pages.
* The navigation bar spans the full available width.
* No sidebar is included on the landing page.
* The initial landing page contains a Hero section, an About Me section, and a Projects section.
* The implementation remains suitable for further enhancement and additional content in subsequent development iterations.

---

## Constraints

* Use only the existing template, shadcn components, and reusable resources available within the current codebase.
* Do not add a sidebar to the landing page.
* Do not implement additional portfolio content beyond the initial sections requested at this stage.

---

## Out of Scope

* Dashboard sidebars must not be included on the portfolio landing page.
* Additional portfolio sections or content beyond the Hero, About Me, and Projects sections are not part of this initial implementation.
* Further enhancements and improvements are deferred to later follow-up instructions.

---

## Context & Dependencies

* The existing codebase contains multiple folders and subfolders for components, pages, and other application resources that should be reviewed and reused.
* Existing dashboard pages contain a navigation bar that should serve as the source or reference for the landing-page navigation.
* This implementation represents the initial development phase of the portfolio and is expected to receive additional content and refinement later.

---

## Supporting Tasks

### Existing Codebase Review

* [Tag: Sequential] Inspect the current folder and subfolder structure to identify reusable templates, shadcn components, page elements, and related resources.
* [Tag: Sequential] Locate the navigation bar implementation used by the existing dashboard pages.
* Identify the existing components that can support the Hero, About Me, and Projects sections without introducing unnecessary replacements.

### Landing Page Structure

* [Tag: Sequential] Create or assemble the portfolio landing page using the existing project architecture.
* Reuse the dashboard navigation bar or its applicable components for the landing page.
* Ensure the navigation bar spans the full width of the page.
* Exclude all dashboard sidebar elements from the landing-page layout.

### Initial Portfolio Sections

* Create the Hero section as the first primary content section.
* Create the About Me section following the Hero section.
* Create the Projects section following the About Me section.
* Keep the implementation focused on the initial structure so that additional sections and refinements can be incorporated later.

---

## Multi-Agent Feasibility Assessment

**Assessment:** YES. The objective contains several distinct work streams that can be handled in parallel after the existing codebase structure and reusable components are identified. Navigation adaptation, portfolio-section preparation, and existing component discovery can be distributed independently, with final integration performed after those work streams are complete.

**Parallelization Opportunities:**

* Inspect the existing codebase to identify reusable shadcn components, templates, and relevant page structures.
* Analyze the dashboard navigation implementation and determine how to reuse it without the sidebar.
* Prepare the Hero section using existing compatible components.
* Prepare the About Me section using existing compatible components.
* Prepare the Projects section using existing compatible components.

**Dependencies to Manage:**

* All agents must use only components, templates, and resources already present in the codebase.
* The navigation implementation must remain consistent with the dashboard navigation while excluding sidebar-related dependencies.
* Independently prepared sections must be integrated into a single landing page in the required order: navigation, Hero, About Me, and Projects.
* Final integration should preserve the existing project structure and component conventions.

**Named Sub-Agent Assignments:**

* **Codebase Scout** (Repository and Component Analysis): Inspect the project structure and identify reusable templates, shadcn components, pages, and existing layout patterns relevant to the portfolio.
* **Navigation Specialist** (Layout and Navigation): Analyze the dashboard navigation and adapt the applicable navigation components into a full-width landing-page navigation without any sidebar.
* **Hero Specialist** (Landing Page UI): Prepare the Hero section using only compatible resources already available in the codebase.
* **About Section Specialist** (Content Section UI): Prepare the About Me section using existing project components and conventions.
* **Projects Section Specialist** (Portfolio UI): Prepare the Projects section using existing project components and conventions.
* **Integration Agent** (Frontend Integration): Combine the navigation and portfolio sections into the initial landing page while preserving the requested order, layout constraints, and existing codebase conventions.

---

## Detailed Breakdown

### Existing Template and Component Usage

The portfolio must be constructed from the templates, shadcn components, and reusable elements that already exist within the project. Inspect the available component, page, and supporting directories before implementing new page structures. Reuse appropriate existing elements instead of introducing unrelated UI systems or external design patterns.

### Navigation Bar

Use the navigation bar found on the existing dashboard pages as the basis for the landing-page navigation. Preserve the relevant navigation structure and styling while separating it from any sidebar-related layout. The resulting navigation bar must span the full width of the landing page and must not include a sidebar.

### Landing Page Content Order

The first version of the landing page should contain the requested content in a clear sequence. Begin with the Hero section, followed by the About Me section, and then the Projects section. These sections form the initial portfolio foundation and should remain compatible with later additions.

### Initial Development Scope

Treat this implementation as the first iteration rather than a finalized portfolio. Focus on establishing the requested landing-page structure and correctly reusing the existing codebase. Additional content, enhancements, and improvements will be provided through later follow-up instructions.
