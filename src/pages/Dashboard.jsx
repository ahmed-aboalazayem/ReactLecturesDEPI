import { useState } from "react";
import { LectureCard } from "../components/LectureCard";
import { motion } from "motion/react";
import { lectures } from "../data/lectures";

export function Dashboard({ completedLectures, toggleLectureComplete }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(false);

  const allTags = ["All", ...new Set(lectures.flatMap((l) => l.tags))];

  const filteredLectures = lectures.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || 
                          l.summary.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "All" || l.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">REACT Lectures Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Track and manage your learning progress.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search lectures..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary min-w-[250px] transition-all"
          />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p className="text-xl font-medium animate-pulse">Loading lectures...</p>
        </div>
      ) : filteredLectures.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-card/60 backdrop-blur-xl rounded-xl border border-border">
          <p className="text-xl font-medium">No lectures found.</p>
          <p className="mt-2 text-sm">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLectures.map((lecture, index) => {
            const lectureIndex = index + 1; // Simplify indexing for now securely
            const lectureId = lecture._id || lecture.id;
            return (
              <LectureCard
                key={lectureId}
                lecture={lecture}
                lectureNumber={lectureIndex}
                isCompleted={completedLectures.includes(lectureId)}
                onToggleComplete={toggleLectureComplete}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
