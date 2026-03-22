import { useState } from "react";
import { type Lecture } from "./Dashboard";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Play, ChevronDown, ChevronUp, Code } from "lucide-react";

interface LectureCardProps {
  lecture: Lecture;
  onToggleComplete: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export function LectureCard({ lecture, onToggleComplete, onUpdateNotes }: LectureCardProps) {
  // State for collapsible code examples section
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl 
        shadow-md 
        p-6 
        transition-all 
        duration-300 
        hover:scale-[1.02] 
        hover:shadow-xl
        border-2
        ${lecture.completed 
          ? 'border-[#10B981] bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-gray-800' 
          : 'border-transparent'
        }
      `}
    >
      {/* Card Header - Title and Completion Checkbox */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1">
          {lecture.title}
        </h3>
        
        {/* Completion checkbox with custom styling */}
        <div className="flex items-center gap-2">
          <Checkbox
            id={`lecture-${lecture.id}`}
            checked={lecture.completed}
            onCheckedChange={() => onToggleComplete(lecture.id)}
            className="h-5 w-5 data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981]"
          />
          <label 
            htmlFor={`lecture-${lecture.id}`}
            className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none"
          >
            {lecture.completed ? "Done" : "Mark"}
          </label>
        </div>
      </div>

      {/* Summary Section */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {lecture.summary}
      </p>

      {/* Tags Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {lecture.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                     bg-[#4F46E5] text-white dark:bg-indigo-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Video Link Button */}
      <Button
        asChild
        className="w-full mb-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white
                 transition-colors duration-200"
      >
        <a 
          href={lecture.videoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <Play className="h-4 w-4" />
          Watch Lecture
        </a>
      </Button>

      {/* Collapsible Code Example Section */}
      {lecture.codeExample && (
        <Collapsible
          open={isCodeExpanded}
          onOpenChange={setIsCodeExpanded}
          className="mb-4"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-between
                       dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <span className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code Example
              </span>
              {isCodeExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-2">
            <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded-lg 
                        overflow-x-auto text-xs font-mono">
              <code>{lecture.codeExample}</code>
            </pre>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Notes Section - Editable Textarea */}
      <div className="space-y-2">
        <label 
          htmlFor={`notes-${lecture.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Your Notes
        </label>
        <textarea
          id={`notes-${lecture.id}`}
          value={lecture.notes}
          onChange={(e) => onUpdateNotes(lecture.id, e.target.value)}
          placeholder="Add your personal notes here..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                   rounded-lg resize-none
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent
                   placeholder-gray-400 dark:placeholder-gray-500
                   transition-colors duration-200"
        />
      </div>

      {/* Completion Badge - Shown when lecture is marked complete */}
      {lecture.completed && (
        <div className="mt-4 flex items-center justify-center gap-2 
                      text-[#10B981] dark:text-green-400 font-medium text-sm">
          <svg 
            className="h-5 w-5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          Completed!
        </div>
      )}
    </div>
  );
}
