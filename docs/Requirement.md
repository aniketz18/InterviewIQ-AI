# InterviewIQ Requirements Document

## 1. Project Overview

InterviewIQ is an AI-powered mock interview platform designed to help job seekers practice interviews, improve communication and technical confidence, and review performance using AI-generated feedback and downloadable reports.

The platform has a React frontend and an Express backend. Users can sign in with Google, purchase interview credits through Razorpay, upload a resume for role extraction, begin a mock interview, answer AI-generated questions, and review a detailed performance report.

## 2. Product Goals

- Help users practice interviews in a realistic scenario.
- Personalize interview questions based on role, experience, skills, and resume content.
- Provide AI-based evaluation across confidence, communication, and correctness.
- Offer a history of previous interviews and downloadable performance reports.
- Support a monetization model through paid interview credit packs.
- Offer a polished, responsive user experience for both HR and technical interview preparation.

## 3. Target Users

### 3.1 Primary Users

- Job seekers preparing for interviews.
- Candidates looking to improve communication and technical response quality.
- Users who want structured, role-specific practice.

### 3.2 Secondary Users

- Recruiters or interview preparation platforms evaluating user performance trends.
- Admins or operators managing platform usage and subscriptions.

## 4. Core User Stories

- As a user, I want to sign in quickly so that I can access personalized interview features.
- As a user, I want to upload my resume so that the system can tailor interview questions to my background.
- As a user, I want to choose a role, experience level, and interview mode so that my interview is realistic.
- As a user, I want AI-generated questions so that I can practice realistic interview scenarios.
- As a user, I want to answer by speaking so that the interview feels natural and immersive.
- As a user, I want immediate feedback after each answer so that I can improve quickly.
- As a user, I want a final score and area-wise evaluation so that I can identify strengths and weaknesses.
- As a user, I want to download a PDF report so that I can save or share my progress.
- As a user, I want to view my interview history so that I can track performance over time.
- As a user, I want to buy credits so that I can continue using the interview system.

## 5. Functional Requirements

### 5.1 Authentication and User Profile

1. The system shall allow users to authenticate with Google.
2. A new user shall be created automatically if the email does not already exist.
3. The system shall create a JWT token and store it as an HTTP-only cookie.
4. The system shall expose the current authenticated user to frontend pages.
5. The system shall support user logout by clearing the auth cookie.

### 5.2 Credit Management

1. The system shall award users a starting credit balance of 100 credits.
2. The system shall require a minimum of 50 credits to generate interview questions.
3. Each question generation shall deduct 50 credits from the user balance.
4. The system shall support credit purchase plans:
   - Free: ₹0 for 100 credits
   - Starter Pack: ₹100 for 150 credits
   - Pro Pack: ₹500 for 650 credits
5. The system shall validate Razorpay payment signature before adding credits.
6. Upon successful payment, the user balance shall be updated and the payment record shall be marked as paid.

### 5.3 Resume Analysis

1. The system shall allow a user to upload a PDF resume.
2. The system shall extract text from the uploaded PDF.
3. It shall parse resume content to infer:
   - role
   - experience
   - project names
   - technical skills
4. The extracted information shall be used to personalize interview setup and question generation.
5. The system shall delete uploaded temporary files after processing.

### 5.4 Interview Setup

1. The system shall allow a user to input:
   - role
   - experience
   - interview mode (Technical or HR)
2. The system shall allow the user to continue with either manual input or resume-derived values.
3. The system shall generate a set of five interview questions based on role, experience, selected mode, resume details, and skills.
4. Each generated question shall have:
   - a question string
   - difficulty level
   - time limit
5. The platform shall support a realistic question progression from easy to hard.

### 5.5 Interview Execution

1. The system shall display one interview question at a time.
2. The system shall read the question aloud using browser speech synthesis.
3. The system shall enable microphone capture for spoken answers.
4. The system shall track elapsed time per question.
5. If the timer expires, the answer shall be treated as incomplete for evaluation.
6. The system shall submit the answer to AI evaluation along with the question prompt.
7. The system shall store the submitted answer and AI feedback per question.
8. The user shall be able to proceed to the next question after receiving feedback.
9. The system shall finalize the interview after the last question.

### 5.6 AI Evaluation

1. The system shall evaluate each answer using AI based on:
   - confidence
   - communication
   - correctness
2. Each category shall be scored on a 0-10 scale.
3. The system shall compute a final score as the average of the three category scores.
4. The system shall provide short human-readable feedback for each answer.
5. The platform shall compute the overall interview result from all question scores.

### 5.7 Interview Reporting

1. The system shall calculate overall interview metrics:
   - final score
   - average confidence
   - average communication
   - average correctness
2. The system shall display question-wise performance data.
3. The system shall show a visual performance dashboard with charts and circular score indicators.
4. The system shall provide a PDF export of the interview performance report.

### 5.8 Interview History

1. The system shall store each interview against its authenticated user.
2. The system shall list previous interviews by newest first.
3. The system shall show at least:
   - role
   - experience
   - mode
   - final score
   - status
   - creation date
4. The system shall allow the user to open a detailed report for a selected interview.

## 6. Non-Functional Requirements

### 6.1 Performance

- Interview question generation and evaluation should complete within a reasonable response time for a web application.
- The frontend should render pages quickly and react smoothly to user interactions.

### 6.2 Security

- Authentication tokens must be securely stored as HTTP-only cookies.
- Payment verification must validate Razorpay signatures before credit updates.
- User access to interview and report APIs must be restricted to authenticated users.
- Uploaded resume files must be processed and removed from the server after use.

### 6.3 Reliability

- The system should handle missing or invalid user input gracefully with clear error messages.
- The app should not crash when AI or payment services return errors; it should respond with user-friendly messages.

### 6.4 Usability

- The interface should be clear, visually structured, and responsive across desktop and tablet layouts.
- Interview flows should guide the user through setup, interview, and results clearly.

### 6.5 Scalability

- The backend should support multiple concurrent users with independent interview and user credit records.
- User and interview data should be persisted in a database rather than kept in memory.

## 7. Business Rules

- Each interview generation consumes 50 credits.
- Users cannot generate interview questions when credits are below the required threshold.
- Interviews can be either HR or Technical mode.
- A completed interview is marked with status "completed" after finalization.
- Free plan always exists as the default plan but may be upgraded via paid plans.
- Resume parsing is optional but recommended for tailoring the interview.

## 8. Data Model Requirements

### 8.1 User

- name: string
- email: string, unique
- credits: number, default 100
- timestamps

### 8.2 Interview

- userId: reference to User
- role: string
- experience: string
- mode: Technical or HR
- resumeText: optional string
- questions: array of question objects
- finalScore: number
- status: Incompleted or completed
- timestamps

### 8.3 Question

- question: string
- difficulty: string
- timeLimit: number
- answer: optional string
- feedback: optional string
- score: number
- confidence: number
- communication: number
- correctness: number

### 8.4 Payment

- userId: reference to User
- planId: string
- amount: number
- credits: number
- razorpayOrderId: string
- razorpayPaymentId: optional string
- status: created or paid

## 9. System Interfaces

### 9.1 Frontend

- React application with route-based UX for:
  - home page
  - auth page
  - interview setup page
  - interview execution page
  - interview history page
  - pricing page
  - report page

### 9.2 Backend APIs

- POST /api/auth/google
- GET /api/auth/logout
- GET /api/user/current-user
- POST /api/payment/order
- POST /api/payment/verify
- POST /api/interview/resume
- POST /api/interview/generate-questions
- POST /api/interview/submit-answer
- POST /api/interview/finish
- GET /api/interview/get-interview
- GET /api/interview/report/:id

## 10. External Services

- OpenRouter API for AI question generation and answer evaluation.
- Razorpay for payment creation and verification.
- MongoDB for persistence.
- Browser speech synthesis for AI voice playback.
- Web Speech API for microphone-based answer capture.

## 11. Constraints and Assumptions

- The system assumes internet connectivity for AI and payment services.
- Resume processing currently focuses on PDF text extraction and AI-based parsing.
- User feedback and evaluation are generated by an external AI model and are therefore probabilistic.
- Browser speech recognition availability depends on browser support and device permissions.
- Payment verification requires valid Razorpay environment variables and key configuration.

## 12. Acceptance Criteria

1. A user can sign in with Google and access the app without manual registration.
2. A user can upload a PDF resume and have the system extract relevant role, skill, and project information.
3. A user can start a mock interview after providing role, experience, and interview type.
4. The system generates five interview questions and deducts 50 credits.
5. The user can speak answers and receive feedback on each one.
6. A completed interview generates an overall performance score and category scores.
7. A user can view interview history and open a detailed report.
8. A user can download the interview performance report as a PDF.
9. A user can purchase credits using Razorpay and see the updated balance.
10. Unauthorized users cannot access authenticated APIs or protected resources.

## 13. Future Enhancements

- Add email/password authentication alongside Google sign-in.
- Add multi-language support for interview questions and feedback.
- Add more question types including coding interviews and behavioral interviews.
- Introduce admin dashboards for analytics and usage monitoring.
- Add retry and fallback logic for AI service unavailability.
- Improve evaluation consistency through custom scoring rules and rubric templates.

## 14. Summary

InterviewIQ is a role-based AI mock interview platform that combines resume analysis, speech-driven interview practice, AI scoring, and performance reporting. The product is designed to help users improve interview readiness with a realistic and engaging experience while supporting a credit-based business model.
