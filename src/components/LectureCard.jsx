import { Link } from "react-router";
import { motion } from "motion/react";

export function LectureCard({ lecture, isCompleted, onToggleComplete, lectureNumber, isLearnedPage = false }) {
  const isArabic = /[\u0600-\u06FF]/.test(lecture.title);
  const dir = isArabic ? "rtl" : "ltr";
  const badgePos = dir === "rtl" ? "-right-3" : "-left-3";
  const linkPrefix = isLearnedPage ? "/learned" : "/lecture";

  return (
    <motion.div 
      dir={dir}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4 }}
      className={`relative bg-card/60 backdrop-blur-xl text-card-foreground rounded-xl shadow-md hover:scale-105 transition-all duration-300 p-6 flex flex-col h-full border ${isCompleted ? 'border-accent' : 'border-border'}`}
    >
      <div className={`absolute -top-3 ${badgePos} bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-border/50 text-sm`}>
        {lectureNumber}
      </div>
      <div className="flex justify-between items-start mb-4 gap-2">
        <h3 className="text-xl font-semibold leading-tight">{lecture.title}</h3>
        <label className="flex items-center space-x-2 cursor-pointer rtl:space-x-reverse ml-3 rtl:ml-0 rtl:mr-3 shrink-0">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleComplete(lecture._id || lecture.id)}
            className="w-5 h-5 text-primary rounded border-border focus:ring-primary accent-accent cursor-pointer"
          />
        </label>
      </div>

      <p className="text-muted-foreground mb-6 flex-grow">{lecture.summary}</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {lecture.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`${linkPrefix}/${lecture._id || lecture.id}`}
        className="mt-auto block text-center bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {isArabic ? "عرض التفاصيل" : "View Details"}
      </Link>
    </motion.div>
  );
}
