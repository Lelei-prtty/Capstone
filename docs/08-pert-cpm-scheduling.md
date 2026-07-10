# Chapter 8: PERT and CPM Scheduling

## PERT & CPM Overview

This chapter develops the Program Evaluation and Review Technique (PERT) and Critical Path Method (CPM) to estimate project duration, identify task dependencies, determine the critical path, and analyze project scheduling.

---

## 1. Project Scheduling Fundamentals

### 1.1 Objectives
1. Identify all project tasks
2. Determine task dependencies
3. Estimate task durations
4. Identify the critical path
5. Manage schedule contingencies
6. Optimize resource allocation
7. Track actual progress against plan

### 1.2 Key Definitions

**Critical Path:** The longest sequence of dependent tasks that determines minimum project duration

**Slack/Float:** Extra time available for a task without delaying the project

**Milestone:** Significant event or completion point

**Dependency:** Relationship between tasks (Finish-to-Start, Start-to-Start, etc.)

---

## 2. Work Breakdown Structure (WBS)

### 2.1 Project Phases & Tasks

```
Capstone Project (16 weeks)
│
├── Phase 1: Planning & Requirements (2 weeks)
│   ├── Define project scope
│   ├── Requirements gathering
│   ├── Resource planning
│   ├── Risk identification
│   └── Project kickoff
│
├── Phase 2: Design & Architecture (2 weeks)
│   ├── System architecture design
│   ├── Database schema design
│   ├── API specification
│   ├── UI/UX mockups
│   ├── ML model design
│   └── Design review & approval
│
├── Phase 3: Development (5 weeks)
│   ├── Backend API development
│   ├── Frontend development
│   ├── ML model training
│   ├── Database implementation
│   ├── Code review & refactoring
│   └── Unit testing
│
├── Phase 4: Integration & Testing (3 weeks)
│   ├── System integration
│   ├── Integration testing
│   ├── System testing
│   ├── Performance testing
│   ├── Security testing
│   └── Bug fixes
│
├── Phase 5: Deployment (2 weeks)
│   ├── Deployment planning
│   ├── Staging deployment
│   ├── UAT preparation
│   ├── Production deployment
│   └── Launch support
│
└── Phase 6: Closure (2 weeks)
    ├── Documentation finalization
    ├── Lessons learned
    ├── Performance review
    └── Project closure
```

---

## 3. PERT Time Estimation

### 3.1 PERT Formula

For each task, estimate three durations:
- **Optimistic (O):** Best case, everything goes perfectly
- **Most Likely (M):** Realistic, based on experience
- **Pessimistic (P):** Worst case, if problems occur

**PERT Duration = (O + 4M + P) / 6**

### 3.2 Task Duration Estimates

#### Phase 1: Planning & Requirements (Week 0-2)

| Task ID | Task Name | O | M | P | PERT | Predecessor |
|---------|-----------|---|---|---|------|-------------|
| 1.1 | Define project scope | 2 | 3 | 5 | 3.2 | None |
| 1.2 | Requirements gathering | 3 | 5 | 8 | 5.2 | 1.1 |
| 1.3 | Resource planning | 2 | 3 | 4 | 3.2 | 1.1 |
| 1.4 | Risk identification | 2 | 3 | 5 | 3.2 | 1.1 |
| 1.5 | Communication plan | 1 | 2 | 3 | 2.0 | 1.1 |
| 1.6 | Project kickoff | 1 | 1 | 2 | 1.2 | 1.2, 1.3, 1.4 |

**Phase 1 Duration:** 5.2 + 1.2 = ~7 days (1 week)

---

#### Phase 2: Design & Architecture (Week 2-4)

| Task ID | Task Name | O | M | P | PERT | Predecessor |
|---------|-----------|---|---|---|------|-------------|
| 2.1 | System architecture | 3 | 5 | 8 | 5.2 | 1.6 |
| 2.2 | Database schema | 3 | 4 | 6 | 4.2 | 1.6 |
| 2.3 | API specification | 3 | 4 | 6 | 4.2 | 2.1 |
| 2.4 | UI/UX mockups | 5 | 7 | 10 | 7.2 | 1.6 |
| 2.5 | ML model design | 3 | 5 | 8 | 5.2 | 1.6 |
| 2.6 | Infrastructure planning | 2 | 3 | 5 | 3.2 | 2.1 |
| 2.7 | Design review & approval | 2 | 2 | 3 | 2.2 | 2.1, 2.2, 2.3, 2.4, 2.5 |

**Phase 2 Duration:** ~10 days (1.5 weeks)

---

#### Phase 3: Development (Week 4-9)

| Task ID | Task Name | O | M | P | PERT | Predecessor | Duration |
|---------|-----------|---|---|---|------|-------------|----------|
| 3.1 | Backend API (core) | 8 | 12 | 16 | 12.0 | 2.3 | Concurrent |
| 3.2 | Frontend (core components) | 8 | 12 | 16 | 12.0 | 2.4 | Concurrent |
| 3.3 | ML model training | 8 | 12 | 16 | 12.0 | 2.5 | Concurrent |
| 3.4 | Database implementation | 5 | 7 | 10 | 7.2 | 2.2 | Concurrent |
| 3.5 | Backend API (integration) | 5 | 8 | 12 | 8.2 | 3.1 | After core |
| 3.6 | Frontend (integration) | 5 | 8 | 12 | 8.2 | 3.2 | After core |
| 3.7 | ML model integration | 3 | 5 | 8 | 5.2 | 3.3, 3.1 | After model |
| 3.8 | Code review & testing | 5 | 8 | 12 | 8.2 | 3.5, 3.6 | Parallel |
| 3.9 | Bug fixes | 5 | 8 | 12 | 8.2 | 3.8 | After testing |

**Phase 3 Duration:** ~27 days (~4 weeks)

---

#### Phase 4: Integration & Testing (Week 9-12)

| Task ID | Task Name | O | M | P | PERT | Predecessor |
|---------|-----------|---|---|---|------|-------------|
| 4.1 | System integration | 3 | 5 | 8 | 5.2 | 3.9 |
| 4.2 | Integration testing | 5 | 8 | 12 | 8.2 | 4.1 |
| 4.3 | System testing | 5 | 8 | 12 | 8.2 | 4.1 |
| 4.4 | Performance testing | 3 | 5 | 8 | 5.2 | 4.1 |
| 4.5 | Security testing | 3 | 5 | 8 | 5.2 | 4.1 |
| 4.6 | Defect remediation | 5 | 8 | 12 | 8.2 | 4.2, 4.3, 4.4, 4.5 |

**Phase 4 Duration:** ~19 days (3 weeks)

---

#### Phase 5: Deployment (Week 12-14)

| Task ID | Task Name | O | M | P | PERT | Predecessor |
|---------|-----------|---|---|---|------|-------------|
| 5.1 | Deployment planning | 2 | 3 | 5 | 3.2 | 4.6 |
| 5.2 | Staging deployment | 2 | 3 | 5 | 3.2 | 5.1 |
| 5.3 | UAT preparation | 3 | 4 | 6 | 4.2 | 5.1 |
| 5.4 | Production deployment | 2 | 3 | 5 | 3.2 | 5.2, 5.3 |
| 5.5 | Launch support | 5 | 7 | 10 | 7.2 | 5.4 |

**Phase 5 Duration:** ~21 days (3 weeks)

---

#### Phase 6: Closure (Week 14-16)

| Task ID | Task Name | O | M | P | PERT | Predecessor |
|---------|-----------|---|---|---|------|-------------|
| 6.1 | Documentation finalization | 3 | 4 | 6 | 4.2 | 5.5 |
| 6.2 | Lessons learned session | 2 | 3 | 4 | 3.0 | 5.5 |
| 6.3 | Performance review | 2 | 3 | 4 | 3.0 | 5.5 |
| 6.4 | Project closure | 1 | 2 | 3 | 2.0 | 6.1, 6.2, 6.3 |

**Phase 6 Duration:** ~12 days (2 weeks)

---

## 4. Critical Path Analysis

### 4.1 Forward Pass (Earliest Start/Finish Times)

Calculate ES (Earliest Start) and EF (Earliest Finish) for each task:
- **ES = Maximum EF of predecessors**
- **EF = ES + Duration**

### 4.2 Critical Path Calculation

```
Path 1: 1.1 → 1.2 → 1.6 → 2.4 → 3.2 → 3.6 → 3.8 → 3.9 → 4.1 → 4.2 → 4.6 → 5.1 → 5.2 → 5.4 → 5.5 → 6.1 → 6.4
Duration: 3.2 + 5.2 + 1.2 + 7.2 + 12.0 + 8.2 + 8.2 + 8.2 + 5.2 + 8.2 + 8.2 + 3.2 + 3.2 + 3.2 + 7.2 + 4.2 + 2.0 = 107.6 days

Path 2: 1.1 → 1.2 → 1.6 → 2.3 → 3.1 → 3.5 → 3.8 → 3.9 → 4.1 → 4.3 → 4.6 → 5.1 → 5.2 → 5.4 → 5.5 → 6.1 → 6.4
Duration: 3.2 + 5.2 + 1.2 + 4.2 + 12.0 + 8.2 + 8.2 + 8.2 + 5.2 + 8.2 + 8.2 + 3.2 + 3.2 + 3.2 + 7.2 + 4.2 + 2.0 = 103.2 days

Path 3 (ML): 1.1 → 1.2 → 1.6 → 2.5 → 3.3 → 3.7 → 3.8 → 3.9 → 4.1 → 4.4 → 4.6 → 5.1 → 5.2 → 5.4 → 5.5 → 6.1 → 6.4
Duration: 3.2 + 5.2 + 1.2 + 5.2 + 12.0 + 5.2 + 8.2 + 8.2 + 5.2 + 5.2 + 8.2 + 3.2 + 3.2 + 3.2 + 7.2 + 4.2 + 2.0 = 98.4 days
```

### 4.3 Critical Path Summary

**CRITICAL PATH: Frontend Development Track (Path 1)**

```
Duration: ~107.6 days (~15 weeks)
Buffer: ~2 days before 16-week deadline
Slack Available: MINIMAL - Any delays impact delivery
```

**Critical Tasks (Zero Slack):**
- 1.1: Define project scope
- 1.2: Requirements gathering
- 1.6: Project kickoff
- 2.4: UI/UX mockups
- 3.2: Frontend development (core)
- 3.6: Frontend integration
- 3.8: Code review & testing
- 3.9: Bug fixes
- 4.1: System integration
- 4.2: Integration testing
- 4.6: Defect remediation
- 5.1: Deployment planning
- 5.2: Staging deployment
- 5.4: Production deployment
- 5.5: Launch support
- 6.1: Documentation finalization
- 6.4: Project closure

### 4.4 Backward Pass (Latest Start/Finish Times)

Calculate LS (Latest Start) and LF (Latest Finish):
- **LF = Minimum LS of successors**
- **LS = LF - Duration**

**Slack = LS - ES = LF - EF**

### 4.5 Slack Analysis

| Task ID | Task Name | ES | EF | LS | LF | Slack | Status |
|---------|-----------|----|----|----|----|-------|--------|
| 1.1 | Define scope | 0 | 3.2 | 0 | 3.2 | 0 | **CRITICAL** |
| 1.3 | Resource planning | 3.2 | 6.4 | 5.2 | 8.4 | 2.0 | Flexible |
| 1.4 | Risk identification | 3.2 | 6.4 | 5.2 | 8.4 | 2.0 | Flexible |
| 1.5 | Communication plan | 3.2 | 5.2 | 6.4 | 8.4 | 3.2 | Flexible |
| 2.1 | Architecture | 7.4 | 12.6 | 10.4 | 15.6 | 3.2 | Flexible |
| 2.2 | Database schema | 7.4 | 11.6 | 13.8 | 18.0 | 6.4 | Flexible |
| 2.6 | Infrastructure | 12.6 | 15.8 | 19.0 | 22.2 | 6.4 | Flexible |
| 3.1 | Backend (core) | 12.6 | 24.6 | 14.6 | 26.6 | 2.0 | Low risk |
| 3.4 | Database impl | 11.6 | 18.8 | 17.4 | 24.6 | 5.8 | Flexible |
| 4.5 | Security test | 26.8 | 32.0 | 35.6 | 40.8 | 8.8 | Flexible |
| 6.2 | Lessons learned | 93.8 | 96.8 | 100.8 | 103.8 | 7.0 | Flexible |
| 6.3 | Performance review | 93.8 | 96.8 | 100.8 | 103.8 | 7.0 | Flexible |

---

## 5. Gantt Chart

### 5.1 High-Level Gantt Chart

```
Week    1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
Phase 1 [███]
Phase 2     [███████]
Phase 3         [███████████████]
Phase 4                     [███████████]
Phase 5                         [███████]
Phase 6                                 [███████]

Critical Path (Frontend): [████████████████████████████████████████████████████]
```

### 5.2 Detailed Gantt Chart (First 6 Weeks)

```
Task                    Week 1   Week 2   Week 3   Week 4   Week 5   Week 6
1.1 Define scope        [███]
1.2 Requirements        [███████]
1.3 Resources              [███]
1.4 Risk ID                [███]
1.5 Comm Plan              [██]
1.6 Kickoff                      [██]
2.1 Architecture                 [██████]
2.2 DB Schema                    [████]
2.3 API Spec                     [████████]
2.4 UI/UX Mockups               [███████████]
2.5 ML Design                   [██████]
2.6 Infrastructure              [███]
2.7 Design Review                         [██]
3.1 Backend Core                              [████████████]
3.2 Frontend Core                            [████████████]
3.3 ML Training                              [████████████]
```

---

## 6. Resource Allocation

### 6.1 Resource Requirements by Phase

#### Phase 1: Planning (2 weeks)
- Project Manager: 1.0 FTE
- Tech Lead: 0.5 FTE
- Product Manager: 0.5 FTE
- Total: 2.0 FTE-weeks

#### Phase 2: Design (2 weeks)
- Tech Lead: 1.0 FTE
- Backend Lead: 0.5 FTE
- Frontend Lead: 0.5 FTE
- ML Engineer: 1.0 FTE
- QA Lead: 0.5 FTE
- Total: 3.5 FTE-weeks

#### Phase 3: Development (5 weeks)
- Backend Developer: 1.0 FTE
- Frontend Developer: 1.0 FTE
- ML Engineer: 1.0 FTE
- Tech Lead: 0.5 FTE (reviews)
- QA Engineer: 0.5 FTE (test setup)
- Total: 4.0 FTE per week × 5 weeks = 20 FTE-weeks

#### Phase 4: Testing (3 weeks)
- QA Lead: 1.0 FTE
- QA Engineer: 1.0 FTE
- Backend Developer: 0.5 FTE (bug fixes)
- Frontend Developer: 0.5 FTE (bug fixes)
- Tech Lead: 0.5 FTE
- Total: 3.5 FTE per week × 3 weeks = 10.5 FTE-weeks

#### Phase 5: Deployment (2 weeks)
- DevOps Engineer: 1.0 FTE
- Project Manager: 1.0 FTE
- Tech Lead: 0.5 FTE
- QA Lead: 0.5 FTE
- Total: 3.0 FTE per week × 2 weeks = 6 FTE-weeks

#### Phase 6: Closure (2 weeks)
- Project Manager: 1.0 FTE
- Tech Lead: 0.5 FTE
- Product Manager: 0.5 FTE
- QA Lead: 0.5 FTE
- Total: 2.5 FTE per week × 2 weeks = 5 FTE-weeks

**Total Project Effort: ~65 FTE-weeks (~1,300 hours)**

### 6.2 Resource Histogram

```
Resource Allocation Over Time:
FTE
5 |
4 |        ████████
3 |    ██████████████████████████
2 |  ███  ██  ██                ███
1 | ███████  ████████████  ██████████
0 |_________________________________
  W1  W2  W3  W4  W5  W6  W7  W8  W9  W10 W11 W12 W13 W14 W15 W16
```

---

## 7. Schedule Risk Analysis

### 7.1 Quantitative Analysis

**For each critical path task:**

| Task | Duration (PERT) | Std Dev | Variance |
|------|--------|----------|----------|
| Frontend Core | 12.0 days | 1.33 | 1.78 |
| Frontend Integ | 8.2 days | 1.17 | 1.36 |
| Code Review | 8.2 days | 1.17 | 1.36 |
| Bug Fixes | 8.2 days | 1.17 | 1.36 |
| System Testing | 8.2 days | 1.17 | 1.36 |
| Defect Remediation | 8.2 days | 1.17 | 1.36 |

**Project Variance = Sum of variances = 11.54 days²**
**Project Std Dev = √11.54 = 3.4 days**
**95% Confidence Interval: 107.6 ± 6.8 days = 100.8 - 114.4 days**

### 7.2 Probability Analysis

```
Probability that project completes:

By Week 16 (112 days):  85% probability (1 std dev)
By Day 114:             84% probability
By Day 110:             65% probability
By Day 107 (plan):      50% probability
```

### 7.3 Risk Mitigation Strategies

**For Critical Tasks:**
1. **Frontend Development:** Allocate best developer, minimize interruptions
2. **Integration Testing:** Start testing plan early, have test environment ready
3. **Bug Fixes:** Allocate extra buffer for complex issues
4. **Deployment:** Have dry run in staging first

**Buffer Strategies:**
- Project Buffer: ~3-4 days at end before deployment
- Feeding Buffers: 1-2 days before critical tasks
- Resource Buffers: Keep 10% resources available for emergencies

---

## 8. Schedule Monitoring & Control

### 8.1 Earned Value Analysis

**Planned Value (PV):** Budget for scheduled work
**Earned Value (EV):** Budget for completed work
**Actual Cost (AC):** Actual cost of completed work

**Metrics:**
- **Schedule Performance Index (SPI) = EV / PV**
  - SPI > 1.0: Ahead of schedule
  - SPI = 1.0: On schedule
  - SPI < 1.0: Behind schedule

- **Cost Performance Index (CPI) = EV / AC**
  - CPI > 1.0: Under budget
  - CPI = 1.0: On budget
  - CPI < 1.0: Over budget

### 8.2 Weekly Status Tracking

**Weekly Reporting:**
```
SCHEDULE STATUS (Week 5)

Baseline Plan:      Completed 35% of project
Actual Progress:    Completed 32% of project
Schedule Variance:  -3% (2 days behind)
SPI:                0.91

On-Track Tasks:     8 of 12
Behind-Schedule:    3 of 12 (reasons documented)
Ahead-Schedule:     1 of 12

Recovery Actions:
- Add resources to Frontend components
- Extend hours next week to catch up
- De-scope lower-priority features if needed
```

### 8.3 Schedule Variance Analysis

| Variance | Trigger | Action |
|----------|---------|--------|
| > 5% behind | Immediate | Team meeting, identify blockers, assign extra resources |
| 3-5% behind | Concerning | Accelerate schedule where possible, identify dependencies |
| -2% to 3% | Normal | Monitor closely, maintain contingency buffer |
| > 5% ahead | Review | Ensure quality not compromised, redistribute resources |

---

## 9. Schedule Adjustment & Optimization

### 9.1 Schedule Compression Techniques

**Crashing (Adding Resources):**
- Pay overtime to frontend developers
- Bring in contract QA resources
- Impact: Increases cost, not duration significantly

**Fast-Tracking (Overlapping Tasks):**
- Start integration testing before all development complete
- Impact: Increases risk, may require rework

**Scope Reduction:**
- De-scope non-critical features
- Impact: Delivers core functionality on time

### 9.2 Contingency Strategies

**If Behind Schedule (>5%):**
1. Prioritize critical path tasks
2. Add resources to critical tasks
3. Fast-track where possible
4. Consider scope reduction
5. Extend timeline (last resort)

**If Resources Unavailable:**
1. Use contingency buffer
2. Reassign tasks to available team
3. Cross-train team members
4. Bring in contract resources

**If Major Blocker:**
1. Escalate immediately
2. Convene crisis meeting
3. Decide: workaround, pivot, or extend schedule

---

## 10. Milestone Schedule

### 10.1 Major Milestones

| Milestone | Planned Date | Critical? | Success Criteria |
|-----------|-------------|-----------|-----------------|
| **Project Kickoff** | Week 2, Day 3 | Yes | All team present, aligned |
| **Design Approved** | Week 4, Day 2 | Yes | Stakeholder sign-off |
| **Backend Ready** | Week 8, Day 5 | Yes | All APIs working, tested |
| **Frontend Ready** | Week 8, Day 5 | Yes | All components complete |
| **System Integration** | Week 9, Day 2 | Yes | Integration complete |
| **QA Complete** | Week 12, Day 2 | Yes | All tests passed |
| **Staging Deployment** | Week 13, Day 1 | Yes | Running in staging |
| **UAT Complete** | Week 14, Day 2 | Yes | User approval |
| **Production Go** | Week 14, Day 5 | Yes | Live for users |
| **Project Close** | Week 16, Day 3 | No | Documentation done |

### 10.2 Milestone Tracking

**Milestone Status Report:**
```
Milestone: Design Approved (Target: Week 4)

Current Status: ✓ ON TRACK
Expected Date: Week 4, Day 2
Target Date: Week 4, Day 2
Variance: 0 days (Perfect)

Deliverables:
✓ Architecture document approved
✓ Database schema approved  
✓ API specification reviewed
✓ UI mockups signed off
✓ ML approach approved

Dependencies Satisfied: YES
Next Milestone: Backend Ready (Week 8)
```

---

## 11. Schedule Communication

### 11.1 Reporting Schedule

**Daily:** Team standup (5-min schedule review)
**Weekly:** Schedule report to PM (SPI, variance, forecast)
**Bi-weekly:** Stakeholder update (milestone progress)
**Monthly:** Executive report (schedule trend)

### 11.2 Schedule Baseline

The baseline schedule (this document) is frozen at project start.
- Changes tracked in version control
- Approved changes updated through change control process
- All-hands review of schedule changes

---

## 12. Project Schedule Summary

### 12.1 Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| **Project Duration** | 16 weeks (112 days) | Target |
| **Critical Path** | Frontend development track | ~107.6 days |
| **Schedule Confidence** | 50% (1.0 σ) | Moderate |
| **Schedule Confidence** | 85% (2.0 σ) | High confidence |
| **Buffer Available** | 4.4 days | Limited contingency |
| **Total Effort** | 65 FTE-weeks | Estimated |

### 12.2 Key Dates

- **Project Start:** Week 1, Day 1
- **Phase 1 Complete:** Week 1, Day 7
- **Phase 2 Complete:** Week 3, Day 5
- **Phase 3 Complete:** Week 7, Day 7
- **Phase 4 Complete:** Week 10, Day 2
- **Phase 5 Complete:** Week 13, Day 2
- **Phase 6 Complete:** Week 16, Day 3
- **Delivery Target:** Week 14, Day 5

### 12.3 Schedule Assumptions

1. Team members 100% available (no competing projects)
2. No major external dependencies delay project
3. Technical learning curve minimal (team familiar with tech)
4. Requirements stable (change control in place)
5. Infrastructure available on time
6. No extended team member absences

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Baseline Established:** July 2026  
**Next Review:** Weekly status report, Monthly deep dive
