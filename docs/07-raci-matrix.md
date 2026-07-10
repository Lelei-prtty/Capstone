# Chapter 7: RACI Matrix

## RACI Matrix Overview

The RACI matrix (Responsible, Accountable, Consulted, Informed) defines roles and responsibilities for project activities, ensuring clear ownership and collaboration.

**RACI Definitions:**
- **R - Responsible:** Does the work, performs the task
- **A - Accountable:** Has authority, makes final decisions, must sign-off
- **C - Consulted:** Provides input and expertise (two-way communication)
- **I - Informed:** Kept updated on progress (one-way communication)

---

## 1. Project Team Structure

### 1.1 Team Members & Roles

| Role | Name/Team | FTE | Responsibilities |
|------|-----------|-----|-----------------|
| **Project Manager** | TBD | 1.0 | Overall coordination, stakeholder management |
| **Tech Lead** | TBD | 1.0 | Architecture, technical decisions, code review |
| **Backend Lead** | TBD | 1.0 | Backend development, API design, database |
| **Frontend Lead** | TBD | 1.0 | Frontend architecture, UI/UX, component library |
| **ML Engineer** | TBD | 1.0 | ML model development, recommendation engine |
| **Backend Developer** | TBD | 1.0 | API implementation, business logic |
| **Frontend Developer** | TBD | 1.0 | UI implementation, component development |
| **QA Lead** | TBD | 1.0 | Test planning, quality strategy, test execution |
| **QA Engineer** | TBD | 0.5 | Test automation, bug tracking, test execution |
| **DevOps Engineer** | TBD | 0.5 | Infrastructure, deployment, monitoring |
| **Product Manager** | TBD | 0.5 | Requirements, user stories, prioritization |
| **Project Sponsor** | TBD | 0.1 | Strategic oversight, budget approval |

### 1.2 Stakeholders

**External Stakeholders:**
- Executive leadership
- Department heads
- End users (early adopters)
- Third-party service providers

---

## 2. RACI Matrix by Project Phase

### 2.1 Planning & Requirements Phase (Weeks 1-2)

| Activity | PM | Tech Lead | Product Mgr | QA Lead | Sponsor |
|----------|----|----|----|----|-------|
| **Define project scope** | A/R | C | R | I | A |
| **Identify requirements** | C | C | A/R | C | C |
| **Resource planning** | A/R | C | - | C | A |
| **Risk identification** | A/R | C | C | - | I |
| **Communication plan** | A/R | I | C | I | I |
| **Approval & kickoff** | R | C | C | C | A |

**Responsible Parties:**
- **PM:** Overall coordination, timeline, budget
- **Product Manager:** Requirements gathering, user stories
- **Tech Lead:** Feasibility assessment, architecture discussion
- **QA Lead:** Test strategy, quality requirements
- **Sponsor:** Final approval, budget sign-off

---

### 2.2 Design & Architecture Phase (Weeks 2-3)

| Activity | PM | Tech Lead | Backend Lead | Frontend Lead | ML Eng | QA Lead |
|----------|----|----|----|----|----|----|
| **System architecture design** | C | A/R | C | C | C | C |
| **Database schema design** | I | C | A/R | - | C | C |
| **API specification** | I | C | A/R | C | - | C |
| **UI/UX mockups** | I | I | - | A/R | - | C |
| **ML model design** | I | C | - | - | A/R | - |
| **Infrastructure planning** | I | C | C | C | - | - |
| **Design review & approval** | R | A | I | I | I | I |

**Responsible Parties:**
- **Tech Lead:** Architecture decisions, approval
- **Backend Lead:** API and database design
- **Frontend Lead:** UI/UX and component architecture
- **ML Engineer:** Model architecture and approach

---

### 2.3 Development Phase (Weeks 4-8)

| Activity | Tech Lead | Backend Dev | Frontend Dev | ML Eng | PM | QA Lead |
|----------|-----------|-----------|-----------|--------|-----|--------|
| **Backend API development** | C/A | A/R | - | - | I | C |
| **Frontend component development** | C/A | - | A/R | - | I | C |
| **ML model training & tuning** | C/A | - | - | A/R | I | C |
| **Database implementation** | C/A | A/R | - | - | I | C |
| **Code reviews** | A/R | R | R | R | - | - |
| **Unit testing** | C | A/R | A/R | A/R | - | C |
| **Documentation** | C | R | R | R | - | I |
| **Development status reports** | I | R | R | R | R | R |

**Responsible Parties:**
- **Backend Dev:** Implement backend features, APIs
- **Frontend Dev:** Implement UI components
- **ML Engineer:** Train and optimize models
- **Tech Lead:** Code reviews, architectural decisions
- **PM:** Track progress, manage blockers

---

### 2.4 Integration Phase (Weeks 8-9)

| Activity | Tech Lead | Backend Dev | Frontend Dev | QA Lead | PM |
|----------|-----------|-----------|-----------|---------|-----|
| **System integration** | A | R | R | C | I |
| **API integration testing** | A | R | C | R | I |
| **Database integration** | A | R | - | C | I |
| **ML model integration** | A | C | C | R | I |
| **Environment setup** | R | C | C | - | I |
| **Integration documentation** | - | R | R | - | I |

**Responsible Parties:**
- **Tech Lead:** Overall integration architecture
- **Backend/Frontend Devs:** Execute integration
- **QA Lead:** Design and execute integration tests

---

### 2.5 Testing Phase (Weeks 9-10)

| Activity | QA Lead | QA Engineer | Developers | Tech Lead | PM |
|----------|---------|---------|-----------|-----------|-----|
| **Test plan development** | A/R | C | - | I | I |
| **Test case creation** | A/R | R | C | - | I |
| **Unit testing** | C | C | A/R | - | I |
| **Integration testing** | A/R | R | C | C | I |
| **System testing** | A/R | R | - | C | I |
| **Performance testing** | A/R | R | - | C | I |
| **Security testing** | A/R | R | C | C | I |
| **UAT preparation** | A/R | R | C | I | A |
| **Bug reporting** | I | A/R | C | C | I |
| **Test reporting** | A/R | R | - | I | A |

**Responsible Parties:**
- **QA Lead:** Overall test strategy and coordination
- **QA Engineer:** Test execution and reporting
- **Developers:** Unit testing, fixing bugs
- **Tech Lead:** Reviewing critical test failures

---

### 2.6 Deployment & Release Phase (Weeks 11-14)

| Activity | PM | Tech Lead | Backend Lead | DevOps | QA Lead |
|----------|-----|-----------|-----------|--------|---------|
| **Deployment planning** | A/R | C | C | C | C |
| **Release notes** | C | C | R | - | R |
| **Staging deployment** | I | C | C | A/R | I |
| **Production deployment** | I | A | R | R | C |
| **Rollback planning** | C | A | C | R | C |
| **Monitoring setup** | I | C | C | A/R | I |
| **Documentation update** | C | C | R | R | I |
| **User communication** | A/R | I | - | - | I |

**Responsible Parties:**
- **PM:** Deployment coordination and communication
- **DevOps:** Infrastructure and deployment execution
- **Backend Lead:** Code and database deployment
- **Tech Lead:** Approval and monitoring

---

### 2.7 Launch & Post-Launch (Weeks 14-16)

| Activity | PM | Product Mgr | DevOps | QA Lead | Tech Lead |
|----------|-----|-----------|--------|---------|-----------|
| **Launch readiness** | A/R | C | C | A | C |
| **Go/no-go decision** | R | C | A | C | A |
| **User support setup** | A/R | R | - | - | I |
| **Monitoring & incident response** | I | I | A/R | R | A |
| **Performance optimization** | C | I | R | C | A |
| **Issue triage & resolution** | R | C | C | R | A |
| **Lessons learned** | A/R | C | I | C | C |
| **Project closure** | A/R | - | - | - | - |

**Responsible Parties:**
- **PM:** Overall launch coordination and closure
- **Product Manager:** User support and feedback
- **QA Lead:** Issue triage and quality monitoring
- **DevOps:** Production operations
- **Tech Lead:** Technical decision-making

---

## 3. RACI by Functional Areas

### 3.1 Backend Development

| Task | Backend Lead | Backend Dev | Tech Lead | PM |
|------|--------|---------|-----------|-----|
| **API design & specification** | A/R | C | A | I |
| **API implementation** | A | R | C | I |
| **Database schema design** | A/R | C | C | I |
| **Database implementation** | A | R | C | I |
| **Business logic development** | A | R | C | I |
| **Error handling** | A | R | C | - |
| **Logging & monitoring** | A | R | C | - |
| **Backend testing** | C | A/R | C | I |
| **Performance optimization** | A | R | C | I |
| **Security implementation** | A | R | A | I |
| **Documentation** | R | R | C | - |

**Decision Rights:**
- Backend Lead makes final decisions on backend architecture
- Tech Lead approves major architecture changes
- Backend Dev escalates blockers to Backend Lead

---

### 3.2 Frontend Development

| Task | Frontend Lead | Frontend Dev | Tech Lead | Designer |
|------|--------|---------|-----------|----------|
| **UI/UX design** | C | - | - | A/R |
| **Component architecture** | A/R | C | A | - |
| **Component development** | A | R | C | C |
| **Styling & theming** | A | R | - | C |
| **State management** | A | R | C | - |
| **API integration** | A | R | - | - |
| **Responsiveness** | A | R | - | C |
| **Accessibility** | A | R | - | C |
| **Performance optimization** | A | R | C | - |
| **Frontend testing** | C | A/R | - | - |
| **Documentation** | R | R | C | - |

**Decision Rights:**
- Frontend Lead makes final UX/component decisions
- Tech Lead approves state management and integration approaches
- Designer approves visual design

---

### 3.3 ML Development

| Task | ML Engineer | Backend Dev | Tech Lead | QA Lead |
|------|-----------|-----------|-----------|---------|
| **Data collection & preparation** | A/R | - | C | - |
| **Model architecture** | A/R | - | C | - |
| **Model training** | A/R | - | - | - |
| **Model validation** | A/R | - | C | C |
| **Model tuning** | A/R | - | C | - |
| **Model integration** | A/R | A/R | C | - |
| **Recommendation logic** | A/R | C | C | - |
| **ML monitoring** | A/R | R | C | C |
| **Performance metrics** | A/R | - | C | C |
| **Documentation** | A/R | - | C | - |

**Decision Rights:**
- ML Engineer makes decisions on algorithms and model training
- Tech Lead approves integration approach
- QA Lead validates performance metrics

---

### 3.4 Testing & QA

| Task | QA Lead | QA Engineer | Developers | Tech Lead |
|------|---------|---------|-----------|-----------|
| **Test strategy** | A/R | C | - | C |
| **Test plan** | A/R | R | C | - |
| **Test case design** | A/R | R | C | - |
| **Unit testing** | C | - | A/R | - |
| **Integration testing** | A/R | R | C | - |
| **System testing** | A/R | R | - | - |
| **Performance testing** | A/R | R | - | C |
| **Security testing** | A/R | R | C | A |
| **UAT coordination** | A/R | R | - | - |
| **Bug tracking** | C | A/R | - | - |
| **Test reporting** | A/R | R | - | I |

**Decision Rights:**
- QA Lead determines test coverage and quality gates
- QA Engineer decides on automation approach
- Developers responsible for fixing bugs they created

---

### 3.5 Infrastructure & DevOps

| Task | DevOps Engineer | Backend Dev | Tech Lead | PM |
|------|---------|-----------|-----------|-----|
| **Infrastructure design** | A/R | C | A | I |
| **Cloud setup** | A/R | - | C | I |
| **CI/CD pipeline** | A/R | C | C | I |
| **Deployment automation** | A/R | C | C | I |
| **Monitoring setup** | A/R | C | - | I |
| **Backup & recovery** | A/R | C | C | - |
| **Security infrastructure** | A/R | C | A | - |
| **Scaling & optimization** | A/R | C | C | I |
| **Incident response** | A/R | R | A | R |
| **Documentation** | A/R | - | C | - |

**Decision Rights:**
- DevOps Engineer decides on infrastructure and tools
- Tech Lead approves architecture decisions
- PM informed of infrastructure status and scaling needs

---

## 4. Decision-Making Authority Matrix

### 4.1 Major Decision Authority

| Decision | Owner | Approver | Consulted |
|----------|-------|----------|-----------|
| **Technology selection** | Tech Lead | Sponsor | All technical leads |
| **Architecture changes** | Tech Lead | Sponsor | Relevant team leads |
| **Scope changes** | PM | Sponsor | Product Manager, Tech Lead |
| **Timeline adjustments** | PM | Sponsor | Tech Lead, QA Lead |
| **Budget changes** | PM | Sponsor | Finance |
| **Resource allocation** | PM | Manager | Tech Lead |
| **Quality gate approval** | QA Lead | Tech Lead | Developers |
| **Deployment approval** | Tech Lead | Sponsor | DevOps, QA |
| **Risk acceptance** | PM | Sponsor | Tech Lead |
| **Bug priority/severity** | QA Lead | Tech Lead | Developers |

### 4.2 Escalation Path

```
Issue/Decision
       ↓
Responsible Person Decides
       ↓
Can decide? → YES → Decision Made
   ↓ NO
Accountable Person Consulted
       ↓
Within authority? → YES → Decision Made
   ↓ NO
Manager/Sponsor Escalated
       ↓
Final Decision Made
```

---

## 5. Delegation & Authority Limits

### 5.1 Project Manager Authority
**Can Decide:**
- Daily task allocation
- Meeting scheduling
- Status reporting
- Minor timeline adjustments (<3 days)
- Team coordination
- Vendor communication

**Requires Escalation:**
- Budget over $1,000
- Scope changes
- Timeline changes > 3 days
- Resource changes
- Major risks

### 5.2 Tech Lead Authority
**Can Decide:**
- Architecture decisions (within scope)
- Code review approval/rejection
- Technical approach
- Tool selection
- Testing requirements

**Requires Escalation:**
- Major architecture changes
- Technology changes
- Significant scope changes
- Cross-team decisions
- Strategic technical decisions

### 5.3 QA Lead Authority
**Can Decide:**
- Test case design
- Test automation approach
- Bug severity classification
- Release readiness (technical QA)
- Testing methodology

**Requires Escalation:**
- Quality gate waiver
- Scope of testing changes
- Test environment changes
- Major tool changes
- Release decision (business)

---

## 6. Accountability Framework

### 6.1 Individual Accountability

**Each team member is accountable for:**
- Quality of their work
- Meeting deadlines
- Communicating blockers early
- Following processes and standards
- Continuous improvement
- Supporting team members

**Accountability Measures:**
- Weekly progress tracking
- Sprint metrics
- Code review feedback
- Test results
- Incident response
- Peer feedback

### 6.2 Team Lead Accountability

**Backend Lead:**
- API quality and performance
- Backend stability
- Team productivity
- Code quality
- Mentoring backend team

**Frontend Lead:**
- UI/UX quality
- Component reliability
- Performance (page load)
- Accessibility compliance
- Team productivity

**Tech Lead:**
- Overall system architecture
- Technical decisions
- Cross-team coordination
- Quality standards
- Technical risk management

### 6.3 Project-Level Accountability

**Project Manager:**
- Schedule adherence
- Budget management
- Stakeholder satisfaction
- Risk management
- Resource management
- Team morale

**Quality Assurance Lead:**
- Test coverage
- Bug identification
- Quality metrics
- Release readiness
- Testing process

---

## 7. Communication Responsibilities

### 7.1 Reporting Responsibilities

| Role | Reports To | Frequency | Content |
|------|-----------|-----------|---------|
| **Backend Dev** | Backend Lead | Daily | Progress, blockers, completed tasks |
| **Frontend Dev** | Frontend Lead | Daily | Progress, blockers, completed tasks |
| **ML Engineer** | Tech Lead | Daily | Model progress, metrics, blockers |
| **QA Engineer** | QA Lead | Daily | Test results, bugs, coverage |
| **DevOps** | Tech Lead | Daily | Infrastructure status, deployments |
| **Backend Lead** | Tech Lead | Daily | Team status, risks, dependencies |
| **Frontend Lead** | Tech Lead | Daily | Team status, risks, dependencies |
| **QA Lead** | Tech Lead | Daily | Test status, quality metrics |
| **Tech Lead** | PM | Daily | Technical status, risks |
| **PM** | Sponsor | Weekly | Overall status, risks, budget |

### 7.2 Escalation Paths

**Technical Issues:**
```
Developer → Backend/Frontend Lead → Tech Lead → Sponsor
```

**Quality Issues:**
```
QA Engineer → QA Lead → Tech Lead → PM → Sponsor
```

**Schedule/Budget:**
```
PM → Project Sponsor
```

**Critical Issues:**
```
Discoverer → Team Lead → Tech Lead/PM → Sponsor (immediately)
```

---

## 8. RACI Compliance & Monitoring

### 8.1 Compliance Checks

**Weekly:**
- Verify assigned owners for ongoing tasks
- Check for unclear RACI roles
- Review escalations and decisions

**Monthly:**
- RACI effectiveness review
- Identify role conflicts or gaps
- Gather feedback from team

**Quarterly:**
- Full RACI matrix review
- Organizational changes
- Process improvements

### 8.2 Common RACI Mistakes to Avoid

❌ **Too many Accountable:** Creates confusion
✓ **One Accountable per task:**  Ensures clear ownership

❌ **No Responsible:** No one does the work
✓ **Clear Responsible parties:** Work gets completed

❌ **Over-consulting:** Slows decisions
✓ **Selective consulting:** Timely input from experts

❌ **Informed is over-used:** Creates noise
✓ **Essential informed only:** Relevant info distribution

---

## 9. RACI Matrix Sign-Off

This RACI matrix has been reviewed and approved by all parties:

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Manager | _____________ | _____________ | _______ |
| Tech Lead | _____________ | _____________ | _______ |
| Product Manager | _____________ | _____________ | _______ |
| QA Lead | _____________ | _____________ | _______ |
| Project Sponsor | _____________ | _____________ | _______ |

---

## 10. RACI Matrix Evolution

### 10.1 Change Log

| Version | Date | Changes | Updated By |
|---------|------|---------|-----------|
| 1.0 | 2026-07-15 | Initial creation | PM |
| | | | |

### 10.2 Review Schedule

- **Initial Review:** Before project kickoff ✓
- **After Kickoff:** Week 1 (after team meets)
- **Quarterly:** Strategic review
- **As-Needed:** Major organizational changes

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Owner:** Project Manager  
**Next Review:** After Week 1 (team formation)
