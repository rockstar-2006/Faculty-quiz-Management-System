# Requirements Document

## Introduction

This feature adds a browser-based secure quiz experience accessible via email link, targeting iPhone users (and desktop browsers) who cannot use the native Android app. Students receive a unique link by email, open it in their browser, and take the quiz without logging in — their identity (name, USN, branch, year, semester) is pre-fetched from the link token. The browser session enforces exam integrity through fullscreen mode, focus-loss detection, copy/paste blocking, tab-switch penalties, and a strike-based auto-submit system — matching the security posture of the existing Android native app as closely as the browser environment allows.

## Glossary

- **Browser Quiz Session**: A quiz attempt conducted entirely within a mobile or desktop web browser, initiated via a secure tokenised email link.
- **Quiz Link Token**: A single-use, time-limited URL token sent to the student's email that identifies the quiz and pre-authenticates the student identity.
- **Student Identity**: The combination of student name, USN, branch, year, and semester associated with a token.
- **Fullscreen API**: The browser's native `document.documentElement.requestFullscreen()` API used to enter fullscreen mode.
- **Focus Loss**: Any event where the browser tab or window loses visibility or active focus (tab switch, home button, notification pull-down, split-screen).
- **Violation / Strike**: A recorded security breach event. Three strikes trigger automatic quiz submission.
- **Escape Buffer**: A 30-second countdown that starts when a Focus Loss is detected; if the student does not return within 30 seconds, the quiz is auto-submitted.
- **Violation Log**: A backend audit record of each security breach event associated with an attempt.
- **Auto-Submit**: Automatic quiz submission triggered by timer expiry, strike limit reached, or escape buffer timeout.
- **Security Overlay**: A full-screen blocking UI layer shown when a Focus Loss is active, displaying the escape buffer countdown.
- **Quiz System**: The existing FacultyQuest backend and frontend quiz infrastructure.
- **Attempt**: A single student's quiz session, tracked by an `attemptId` on the backend.

---

## Requirements

### Requirement 1 — Token-Based Access (No Login)

**User Story:** As a student on iPhone or desktop browser, I want to open a quiz link from my email and be taken directly into the quiz without entering a username or password, so that I can start quickly without app installation.

#### Acceptance Criteria

1. WHEN a student opens a valid Quiz Link Token URL in a browser, THE Browser Quiz Session SHALL display the student's pre-fetched name, USN, branch, year, and semester for confirmation without requiring manual login.
2. WHEN a student confirms their identity and clicks "Start Quiz", THE Quiz System SHALL create an Attempt record and return an `attemptId` to the browser.
3. IF a Quiz Link Token has already been used to submit an attempt, THEN THE Browser Quiz Session SHALL display a "Quiz Already Submitted" message and prevent re-entry.
4. IF a Quiz Link Token is expired or invalid, THEN THE Browser Quiz Session SHALL display an "Invalid or Expired Link" error message.
5. WHILE a Quiz Link Token is valid and the attempt is in a `started` state, THE Browser Quiz Session SHALL allow the student to resume the quiz with remaining time restored.

---

### Requirement 2 — Fullscreen Enforcement

**User Story:** As a faculty member, I want the quiz to launch in fullscreen mode on the student's browser, so that the screen real estate is dedicated to the exam and distractions are reduced.

#### Acceptance Criteria

1. WHEN the student clicks "Start Quiz", THE Browser Quiz Session SHALL request fullscreen mode via the browser Fullscreen API before rendering the first question.
2. IF the browser denies or the student dismisses the fullscreen request, THEN THE Browser Quiz Session SHALL display a prompt instructing the student to re-enable fullscreen before proceeding.
3. WHILE the quiz is active and not submitted, THE Browser Quiz Session SHALL detect when fullscreen mode is exited and treat it as a Focus Loss event.
4. WHERE the browser supports the Fullscreen API, THE Browser Quiz Session SHALL re-request fullscreen mode after each warning modal is dismissed.

---

### Requirement 3 — Focus Loss Detection and Strike System

**User Story:** As a faculty member, I want the system to detect when a student leaves the quiz browser tab or window, so that tab switching, app switching, and notification checking are discouraged.

#### Acceptance Criteria

1. WHEN a Focus Loss event is detected (tab switch, visibility hidden, window blur, fullscreen exit), THE Browser Quiz Session SHALL start the Escape Buffer countdown from 30 seconds and display the Security Overlay.
2. WHEN the student returns focus to the quiz tab before the Escape Buffer reaches zero, THE Browser Quiz Session SHALL stop the countdown, dismiss the Security Overlay, and record one Strike against the Attempt.
3. WHEN a Strike is recorded and the total Strike count reaches 3, THE Browser Quiz Session SHALL trigger Auto-Submit with reason "Maximum Strikes Reached".
4. IF the Escape Buffer countdown reaches zero without the student returning, THEN THE Browser Quiz Session SHALL trigger Auto-Submit with reason "Escape Buffer Timeout (30s)".
5. WHILE a Focus Loss is active, THE Browser Quiz Session SHALL apply a blur and grayscale overlay to the quiz content so it is not readable from a screen recording or shoulder view.
6. THE Browser Quiz Session SHALL debounce Focus Loss events within an 800-millisecond window to prevent duplicate strike recording from rapid consecutive browser events.

---

### Requirement 4 — Content Protection

**User Story:** As a faculty member, I want to prevent students from copying quiz questions or pasting answers, so that the integrity of exam content is protected.

#### Acceptance Criteria

1. WHILE the quiz is active, THE Browser Quiz Session SHALL intercept and cancel `copy`, `cut`, `paste`, and `dragstart` events on the page.
2. WHILE the quiz is active, THE Browser Quiz Session SHALL intercept and cancel the browser context menu on right-click or long-press.
3. WHILE the quiz is active, THE Browser Quiz Session SHALL intercept keyboard shortcuts F12, Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+U and record a Strike when detected.
4. WHILE the quiz is active, THE Browser Quiz Session SHALL apply CSS `user-select: none` to all quiz content elements.
5. WHERE the browser supports the Print API, THE Browser Quiz Session SHALL hide all content when a print action is triggered via CSS `@media print`.

---

### Requirement 5 — Violation Logging

**User Story:** As a faculty member, I want every security violation to be recorded on the backend, so that I have an audit trail of student behaviour during the exam.

#### Acceptance Criteria

1. WHEN a Strike is issued, THE Quiz System SHALL send a violation log entry to the backend containing `attemptId`, `violationType`, and `reason`.
2. WHEN Auto-Submit is triggered, THE Quiz System SHALL include the auto-submit reason in the submission payload sent to the backend.
3. IF a violation log request fails due to a network error, THEN THE Browser Quiz Session SHALL retry the request once before silently discarding it to avoid blocking the quiz experience.

---

### Requirement 6 — Quiz Timer and Auto-Submit

**User Story:** As a faculty member, I want the quiz to automatically submit when time runs out or violations exceed the limit, so that no student gains extra time through inaction.

#### Acceptance Criteria

1. WHILE the quiz is active, THE Browser Quiz Session SHALL display a countdown timer showing remaining time in MM:SS format.
2. WHEN the timer reaches zero, THE Browser Quiz Session SHALL trigger Auto-Submit with reason "Time Expired".
3. WHILE fewer than 60 seconds remain on the timer, THE Browser Quiz Session SHALL visually highlight the timer in red to alert the student.
4. WHEN Auto-Submit completes successfully, THE Browser Quiz Session SHALL display the submission confirmation screen with score and per-question results.
5. IF an Auto-Submit request fails, THEN THE Browser Quiz Session SHALL retry the submission once before displaying an error message to the student.

---

### Requirement 7 — Results Display

**User Story:** As a student, I want to see my score and correct answers after submitting the quiz, so that I know how I performed.

#### Acceptance Criteria

1. WHEN the quiz is submitted successfully, THE Browser Quiz Session SHALL display the student's total score as a percentage and as marks out of total marks.
2. WHEN the results screen is shown, THE Browser Quiz Session SHALL list each question with the student's answer, the correct answer, and whether the answer was correct.
3. WHERE an explanation is provided for a question, THE Browser Quiz Session SHALL display it below the answer comparison.

---

### Requirement 8 — Mobile Browser Compatibility

**User Story:** As a student using an iPhone, I want the quiz interface to be usable in Safari, so that I can take the exam without installing an app.

#### Acceptance Criteria

1. THE Browser Quiz Session SHALL render correctly on iOS Safari at viewport widths from 375px to 430px without horizontal scrolling.
2. WHEN running on iOS Safari, THE Browser Quiz Session SHALL use `visibilitychange` and `blur` events for Focus Loss detection, as the Fullscreen API has limited support on iOS Safari.
3. WHERE the iOS Safari Fullscreen API is unavailable, THE Browser Quiz Session SHALL display a guidance banner instructing the student to use "Add to Home Screen" or guide them to enable the most restrictive view available.
4. THE Browser Quiz Session SHALL prevent pinch-to-zoom during the quiz using the viewport meta tag to avoid accidental content reveal.
