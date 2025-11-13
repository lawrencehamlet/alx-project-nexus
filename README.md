 # 🗳️ PollPulse — Online Poll System  

## 📘 Overview of the ProDev Front-End Engineering Program  

The **ProDev Front-End Engineering Program** is an immersive journey into the world of software development. It focuses on equipping learners with the technical and professional skills required to build scalable, modern, and user-focused digital products.  

Throughout the program, learners explore both the **technical** and **non-technical** aspects of software engineering — from system design and implementation to collaboration, communication, and leadership.  

### 🚀 Major Learnings  

#### 🧠 Key Technologies Covered
- **Web Development:** HTML, CSS, JavaScript, React, TypeScript, Next.js  
- **Mobile & PWA Development:** Responsive UI design, Progressive Web Apps (PWA)  
- **API Integration:** RESTful APIs, GraphQL  
- **UI Frameworks:** Tailwind CSS, DaisyUI  
- **Version Control:** Git & GitHub  

#### 💡 Important Frontend Development Concepts
- **Next.js Architecture & Routing**
- **React State Management (Context API, Redux)**
- **System Design & Requirement Analysis**
- **TypeScript for Scalable Code**
- **API Integration and Custom Hooks**
- **Performance Optimization & Accessibility**

#### ⚔️ Challenges and Solutions
| Challenge | Solution |
|------------|-----------|
| Managing complex application state | Implemented **Context API** for predictable global state management |
| Real-time updates simulation | Used React hooks and local mock APIs to simulate dynamic polling |
| UI responsiveness | Leveraged **Tailwind CSS** and media queries for seamless device adaptation |
| Project organization and modularity | Adopted folder-based architecture and reusable components |

#### 🧭 Best Practices & Personal Takeaways
- **Plan before you code:** Clear requirements and architecture improve efficiency.  
- **Keep it modular:** Reusable, self-contained components save time.  
- **Type safety matters:** TypeScript reduces runtime errors and improves maintainability.  
- **Collaboration counts:** Peer feedback enhances design and logic quality.  
- **Document everything:** Good documentation clarifies your thinking and helps others.  

---

## 🧩 Product Requirements Document (PRD)

### 📘 Product Overview
**Product Name:** PollPulse  
**Purpose:** PollPulse is a lightweight web app that enables users to participate in online polls, vote on questions, and view live results through interactive charts.  
**Goal:** Deliver an intuitive and engaging platform that demonstrates real-time interactivity and modern front-end development practices.

### 👥 Target Users
- General users who wish to vote on polls.  
- Content creators who want to collect audience insights.  
- Developers and students learning front-end design and state management.

### 🎯 Objectives
- Enable users to vote on polls dynamically.  
- Display live poll results visually without reloading.  
- Ensure a clean, responsive, and accessible user experience.

### ⚙️ Key Features
| Feature | Description | Priority |
|----------|--------------|----------|
| Poll List Page | Display all polls fetched from an API | High |
| Voting System | Users can vote on a poll once | High |
| Live Results Chart | Visualize results dynamically | High |
| Poll Creation (Optional) | Admin or user can create a poll | Medium |
| Responsive Design | Seamless use across devices | High |

### 🧭 User Flow
1. User lands on the Home page (Poll List).  
2. User selects a poll and views its details.  
3. User casts a vote.  
4. Live chart updates instantly with results.  

### 🧮 Success Metrics
- < 1 second page load time.  
- Instant vote updates reflected in chart.  
- >90% performance score on Lighthouse.  

### 💻 Technical Constraints
- Built with **React + TypeScript**  
- Uses **Context API** for state management  
- Charting via **Recharts**  
- Mock API used for data simulation  
- Deployed with **Vercel**

---

## 🧠 Software Requirements Document (SRD)

### 🧩 System Overview
PollPulse is a single-page application built with React and TypeScript. It simulates a real-time voting experience using local state and mock APIs.

### ⚙️ Functional Requirements
| ID | Requirement | Description |
|----|--------------|-------------|
| FR-1 | Display Poll List | Fetch and render available polls |
| FR-2 | Vote on Poll | Allow one vote per user per poll |
| FR-3 | Live Results | Display poll results dynamically |
| FR-4 | Data Management | Manage votes and polls with Context API |
| FR-5 | Responsive UI | Adapt layout for all screen sizes |

### 🧱 Non-Functional Requirements
| ID | Requirement | Description |
|----|--------------|-------------|
| NFR-1 | Performance | Page load < 1s, update < 200ms |
| NFR-2 | Usability | Simple, intuitive interface |
| NFR-3 | Scalability | Easily connectable to real backend |
| NFR-4 | Maintainability | Clean, modular code structure |
| NFR-5 | Accessibility | WCAG-compliant and keyboard-friendly |

### 🧰 System Architecture
**Architecture Type:** Component-based SPA  

**Layers:**
- **Presentation Layer:** UI Components  
- **Logic Layer:** Context API + Hooks  
- **Data Layer:** Mock data simulating API calls  

### 🧩 Component Breakdown
| Component | Purpose |
|------------|----------|
| App.tsx | Root component and context provider |
| PollList.tsx | Displays all polls |
| PollCard.tsx | Shows question and options |
| PollResult.tsx | Renders live results chart |
| PollContext.tsx | Manages global state and voting logic |

### 🔁 Data Flow
1. Poll data fetched (mocked) → displayed in list  
2. User votes → vote updates in context  
3. Context triggers re-render → chart updates live  

### 🧮 Data Model
```ts
interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}
