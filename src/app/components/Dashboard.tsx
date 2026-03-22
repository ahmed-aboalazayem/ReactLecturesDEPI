import { useState, useMemo } from "react";
import { LectureCard } from "./LectureCard";
import { Search, Moon, Sun, Filter } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Interface for lecture data structure
export interface Lecture {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  videoLink: string;
  notes: string;
  completed: boolean;
  codeExample?: string;
}

// Mock lecture data for React course
const initialLectures: Lecture[] = [
  {
    id: "1",
    title: "Introduction to React",
    summary: "Learn React fundamentals, component basics, and JSX syntax. Understand the virtual DOM and React's declarative approach.",
    tags: ["Basics", "JSX", "Components"],
    videoLink: "https://example.com/lecture1",
    notes: "",
    completed: false,
    codeExample: `function Welcome() {\n  return <h1>Hello, React!</h1>;\n}`
  },
  {
    id: "2",
    title: "State and Props",
    summary: "Deep dive into component state management, props passing, and one-way data flow in React applications.",
    tags: ["State", "Props", "Data Flow"],
    videoLink: "https://example.com/lecture2",
    notes: "",
    completed: false,
    codeExample: `const [count, setCount] = useState(0);\n\nreturn (\n  <button onClick={() => setCount(count + 1)}>\n    Count: {count}\n  </button>\n);`
  },
  {
    id: "3",
    title: "Hooks: useState and useEffect",
    summary: "Master React Hooks including useState for state management and useEffect for side effects and lifecycle methods.",
    tags: ["Hooks", "useState", "useEffect"],
    videoLink: "https://example.com/lecture3",
    notes: "",
    completed: false,
    codeExample: `useEffect(() => {\n  document.title = \`Count: \${count}\`;\n}, [count]);`
  },
  {
    id: "4",
    title: "Component Lifecycle",
    summary: "Understanding component mounting, updating, and unmounting. Learn cleanup functions and dependency arrays.",
    tags: ["Lifecycle", "useEffect", "Cleanup"],
    videoLink: "https://example.com/lecture4",
    notes: "",
    completed: false,
    codeExample: `useEffect(() => {\n  const timer = setInterval(() => {\n    console.log('Tick');\n  }, 1000);\n  \n  return () => clearInterval(timer);\n}, []);`
  },
  {
    id: "5",
    title: "Conditional Rendering",
    summary: "Techniques for conditional rendering in React using ternary operators, logical AND, and early returns.",
    tags: ["Rendering", "Conditionals", "JSX"],
    videoLink: "https://example.com/lecture5",
    notes: "",
    completed: false,
    codeExample: `{isLoggedIn ? <Dashboard /> : <Login />}`
  },
  {
    id: "6",
    title: "Lists and Keys",
    summary: "Rendering lists efficiently in React, understanding key props, and best practices for dynamic content.",
    tags: ["Lists", "Keys", "Performance"],
    videoLink: "https://example.com/lecture6",
    notes: "",
    completed: false,
    codeExample: `items.map(item => (\n  <li key={item.id}>{item.name}</li>\n))`
  },
  {
    id: "7",
    title: "Forms and Controlled Components",
    summary: "Building forms with controlled inputs, form validation, and handling user input in React applications.",
    tags: ["Forms", "Input", "Validation"],
    videoLink: "https://example.com/lecture7",
    notes: "",
    completed: false,
    codeExample: `const [value, setValue] = useState('');\n\n<input \n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n/>`
  },
  {
    id: "8",
    title: "Context API",
    summary: "Global state management using Context API. Avoiding prop drilling and sharing data across components.",
    tags: ["Context", "State Management", "Global State"],
    videoLink: "https://example.com/lecture8",
    notes: "",
    completed: false,
    codeExample: `const ThemeContext = createContext('light');\n\n<ThemeContext.Provider value="dark">\n  <App />\n</ThemeContext.Provider>`
  },
];

export function Dashboard() {
  // State management for lectures, search, filters, and dark mode
  const [lectures, setLectures] = useState<Lecture[]>(initialLectures);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Extract all unique tags from lectures
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    lectures.forEach(lecture => lecture.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [lectures]);

  // Filter lectures based on search query and selected tag
  const filteredLectures = useMemo(() => {
    return lectures.filter(lecture => {
      const matchesSearch = lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lecture.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "all" || lecture.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [lectures, searchQuery, selectedTag]);

  // Calculate completion progress
  const completionPercentage = useMemo(() => {
    const completed = lectures.filter(l => l.completed).length;
    return Math.round((completed / lectures.length) * 100);
  }, [lectures]);

  // Toggle dark mode and apply class to document root
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Update lecture completion status
  const handleToggleComplete = (id: string) => {
    setLectures(prev =>
      prev.map(lecture =>
        lecture.id === id ? { ...lecture, completed: !lecture.completed } : lecture
      )
    );
  };

  // Update lecture notes
  const handleUpdateNotes = (id: string, notes: string) => {
    setLectures(prev =>
      prev.map(lecture =>
        lecture.id === id ? { ...lecture, notes } : lecture
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title and Progress */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Lecture Hub
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Track your React course progress • {completionPercentage}% Complete
              </p>
              {/* Progress bar */}
              <div className="mt-2 w-full lg:w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#10B981] transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Dark mode toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="self-start lg:self-auto"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Search bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search lectures by title or summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent
                         placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Tag filter dropdown */}
            <div className="sm:w-64">
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Lecture Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredLectures.length === 0 ? (
          // Empty state when no lectures match filters
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No lectures found matching your search criteria.
            </p>
          </div>
        ) : (
          // Responsive grid layout: 1 column mobile, 2 tablet, 3-4 desktop
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLectures.map(lecture => (
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                onToggleComplete={handleToggleComplete}
                onUpdateNotes={handleUpdateNotes}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
