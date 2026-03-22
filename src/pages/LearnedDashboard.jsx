import { useState } from "react";
import { LectureCard } from "../components/LectureCard";
import { motion } from "motion/react";
import { learned } from "../data/learned";

export function LearnedDashboard({ completedLearned, toggleLearnedComplete }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(false);

  const allTags = ["All", ...new Set(learned.flatMap((l) => l.tags))];

  const filteredItems = learned.filter((l) => {
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
          <h1 className="text-3xl font-bold tracking-tight text-accent">Beyond Curriculum</h1>
          <p className="text-muted-foreground mt-1 text-sm">Knowledge gathered from external resources.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent min-w-[250px] transition-all"
          />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p className="text-xl font-medium animate-pulse text-accent">Loading records...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-card/60 backdrop-blur-xl rounded-xl border border-border">
          <p className="text-xl font-medium">No items found.</p>
          <p className="mt-2 text-sm">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const itemIndex = index + 1;
            const itemId = item.id;
            return (
              <LectureCard
                key={itemId}
                lecture={item}
                lectureNumber={itemIndex}
                isCompleted={completedLearned.includes(itemId)}
                onToggleComplete={toggleLearnedComplete}
                isLearnedPage={true}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
