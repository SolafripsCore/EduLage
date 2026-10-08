import Link from "next/link";
import { MessageCircle, CircleHelp } from "lucide-react";

const questions = [
  [
    "How do I choose the right programme?",
    "Start with your goal and qualification level, then narrow the results by discipline. Compare study format, duration, entry requirements and costs before deciding. You can compare up to three programmes in the full catalogue.",
  ],
  [
    "What is the difference between applying and enrolling?",
    "Open courses can offer direct enrolment. Degree and other admission-based programmes may require an application and an institutional decision. The programme page explains the next step when that information is available.",
  ],
  [
    "Where will I study?",
    "Teaching and assessment arrangements depend on the programme. Online courses use the learning platform; some programmes may require approved local assessment facilities. Confirm any attendance or examination requirements before enrolling.",
  ],
  [
    "Who awards my qualification?",
    "The named awarding institution is responsible for its qualification. Check the award, accreditation and recognition for your intended use with the institution and relevant authority. An EduLage profile is not itself proof of accreditation.",
  ],
  [
    "How do fees and payments work?",
    "Review the current course fee or request a complete fee schedule, including application and examination costs. A confirmed paid-course enrolment link takes you to the learning platform’s payment process. Sample catalogue prices are not payment offers.",
  ],
  [
    "Do I need an account to explore?",
    "You can explore programmes and institution profiles without an account. When you enrol or access your classroom, you may be asked to sign in or create an EduLage learning account.",
  ],
];

export function LearnerFaq() {
  return (
    <section
      className="ed-faq-section"
      id="learner-questions"
      aria-labelledby="learner-questions-title"
    >
      <div className="container-page ed-faq-layout">
        <div>
          <div className="ed-faq-art" aria-hidden="true">
            <MessageCircle size={58} strokeWidth={1.2} />
            <CircleHelp size={33} strokeWidth={1.3} />
          </div>
          <p className="section-kicker">A LITTLE CLARITY GOES A LONG WAY</p>
          <h2 id="learner-questions-title">
            Questions before
            <br />
            your next step?
          </h2>
          <p>Practical answers to help you explore with confidence.</p>
          <Link href="/contact" className="ed-support-link">
            Contact learner support
          </Link>
        </div>
        <div className="ed-faq-list">
          {questions.map(([question, answer]) => (
            <details key={question} name="learner-faq">
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
