import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from "motion/react";
import { lectures } from "../data/lectures";
import { learned } from "../data/learned";

const MermaidChart = ({ chart }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current && chart) {
      const id = `mermaid-${Math.random().toString(36).substring(2)}`;
      mermaid.render(id, chart).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      }).catch(e => console.error(e));
    }
  }, [chart]);
  
  return <div ref={ref} className="flex justify-center py-4 bg-background/50 rounded-xl my-4 overflow-x-auto overflow-y-hidden" />;
};

export function LecturePage({ source, completedLectures, toggleLectureComplete, lectureNotes, updateLectureNotes }) {
  const { id } = useParams();
  const [note, setNote] = useState("");

  const data = source === 'learned' ? learned : lectures;
  const lecture = useMemo(() => data.find(l => l.id === id), [id, data]);
  const loading = false;

  const isCompleted = completedLectures.includes(id);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when opening the page
  }, [id]);

  useEffect(() => {
    if (lectureNotes[id]) {
      setNote(lectureNotes[id]);
    } else {
      setNote("");
    }
  }, [id, lectureNotes]);

  const handleNoteChange = (e) => {
    const val = e.target.value;
    setNote(val);
    updateLectureNotes(id, val);
  };

  if (loading) {
     return <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-pulse text-lg font-semibold mt-10">Loading lecture content...</div>;
  }

  if (!lecture) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Lecture not found</h2>
        <Link to="/" className="text-primary hover:underline font-medium">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const dir = lecture.language === "ar" ? "rtl" : "ltr";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      dir={dir} 
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-6">
        <Link 
          to={source === 'learned' ? "/learned" : "/"} 
          className="text-secondary-foreground hover:text-primary transition-colors flex items-center gap-2 mb-6 inline-flex font-medium"
        >
          {lecture.language === "ar" ? "← العودة إلى لوحة التحكم" : "← Back to Dashboard"}
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight">{lecture.title}</h1>
          <button
            onClick={() => toggleLectureComplete(id)}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors border shadow-sm ${
              isCompleted
                ? "bg-accent/10 text-accent border-accent hover:bg-accent/20"
                : "bg-transparent text-foreground border-border hover:bg-muted/50 backdrop-blur-sm"
            }`}
          >
            {isCompleted 
              ? (lecture.language === "ar" ? "✓ مكتمل" : "✓ Completed")
              : (lecture.language === "ar" ? "تحديد كمكتمل" : "Mark as Complete")}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {lecture.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card/60 backdrop-blur-xl text-card-foreground rounded-2xl shadow-md border border-border p-6 md:p-10 mb-8 overflow-hidden"
      >
        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : null;

                if (!inline && language === 'mermaid') {
                  const chartCode = String(children).replace(/\n$/, '');
                  return <MermaidChart chart={chartCode} />;
                }

                return !inline && language ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    className="rounded-lg shadow-sm"
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {lecture.content}
          </Markdown>
        </article>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.5 }}
        dir={dir} 
        className="bg-card/60 backdrop-blur-xl text-card-foreground rounded-2xl shadow-md border border-border p-6 md:p-8 text-start"
      >
        <h3 className="text-2xl font-bold mb-2">
          {lecture.language === "ar" ? "ملاحظاتك" : "Your Notes"}
        </h3>
        <p className="text-muted-foreground mb-6 text-sm">
          {lecture.language === "ar" 
            ? "يتم حفظ الملاحظات تلقائياً في المتصفح لهذه المحاضرة." 
            : "Notes are automatically saved to your browser's local storage for this lecture."}
        </p>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder={lecture.language === "ar" ? "ابدأ بكتابة ملاحظاتك هنا..." : "Start typing your notes here..."}
          className="w-full min-h-[200px] p-4 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y text-base transition-shadow bg-opacity-50"
        />
      </motion.div>
    </motion.div>
  );
}
