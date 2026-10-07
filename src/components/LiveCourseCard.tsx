import Image from "next/image";
import { BookOpen, Monitor } from "lucide-react";
import {
  enrolUrl,
  priceLabel,
  type CatalogueCourse,
} from "@/lib/liveCatalogue";

export function LiveCourseCard({ course }: { course: CatalogueCourse }) {
  return (
    <a href={enrolUrl(course)} className="premium-programme-card">
      <div className="premium-card-image">
        {course.image ? (
          <Image
            src={course.image}
            alt=""
            fill
            sizes="(max-width:650px) 100vw, 33vw"
            unoptimized={course.image.startsWith("http")}
          />
        ) : (
          <BookOpen size={40} />
        )}
        <span>Open enrolment</span>
      </div>
      <div className="premium-card-content">
        <div className="premium-card-institution">
          <span>{course.institution_name}</span>
        </div>
        <p className="premium-card-credential">
          {course.classification === "professional"
            ? "Professional learning"
            : "Short course"}
        </p>
        <h3>{course.title}</h3>
        <p className="premium-card-delivery">
          <Monitor size={15} />
          Online learning
        </p>
        <p className="ed-course-handoff">
          Continues on the EduLage learning platform. Review the course details
          before enrolling.
        </p>
        <div className="premium-card-bottom">
          <div>
            <span>Course fee</span>
            <strong>{priceLabel(course)}</strong>
          </div>
          <span className="premium-card-cta">View enrolment</span>
        </div>
      </div>
    </a>
  );
}
