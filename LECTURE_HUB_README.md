# Lecture Hub Dashboard - Documentation

## Overview
A fully responsive React + Tailwind CSS dashboard for tracking React course lectures with advanced features including dark mode, search, filtering, and progress tracking.

## File Structure

```
/src
  /app
    App.tsx                          # Main application entry point
    /components
      Dashboard.tsx                  # Main dashboard component with state management
      LectureCard.tsx               # Individual lecture card component
      /ui                           # Radix UI components (pre-existing)
        checkbox.tsx
        button.tsx
        collapsible.tsx
        select.tsx
  /styles
    fonts.css                       # Inter font import
    theme.css                       # Tailwind theme and dark mode variables
    tailwind.css                    # Tailwind base styles
```

## Component Architecture

### 1. **App.tsx**
- Entry point that renders the Dashboard component
- Minimal wrapper to maintain clean separation of concerns

### 2. **Dashboard.tsx** (Main Container)
**Responsibilities:**
- State management for all lectures
- Search and filter functionality
- Dark mode toggle
- Progress calculation
- Responsive grid layout

**Key Features:**
- **Search Bar**: Filters lectures by title or summary in real-time
- **Tag Filter**: Dropdown to filter by specific topics
- **Dark Mode Toggle**: Persists theme using document root class
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Responsive Grid**: Adapts from 1 column (mobile) → 2 (tablet) → 3-4 (desktop)

**State Management:**
```typescript
- lectures: Lecture[]           // Array of lecture objects
- searchQuery: string           // Current search input
- selectedTag: string           // Active tag filter
- isDarkMode: boolean          // Dark mode state
```

### 3. **LectureCard.tsx** (Individual Card)
**Responsibilities:**
- Display lecture information
- Handle completion checkbox
- Manage editable notes
- Collapsible code examples

**Features:**
- **Title**: Bold lecture name
- **Summary**: Brief description with line-clamp
- **Tags**: Color-coded topic badges (Indigo #4F46E5)
- **Video Button**: Link to lecture video with Play icon
- **Code Example**: Collapsible section with syntax-highlighted code
- **Notes Section**: Editable textarea for personal notes
- **Completion Checkbox**: Marks lecture as done with visual feedback
- **Hover Effects**: Scale-up (1.02) and enhanced shadow on hover

**Visual States:**
- Default: White card with shadow
- Completed: Green border (#10B981) with gradient background
- Hover: Subtle scale and shadow increase
- Dark Mode: Gray background with appropriate contrast

## Color Scheme

### Light Mode
- **Primary**: `#4F46E5` (Indigo) - Buttons, tags
- **Secondary Background**: `#F3F4F6` (Light Gray) - Page background
- **Accent**: `#10B981` (Emerald) - Completion states, progress bar
- **Card Background**: `#FFFFFF` (White)
- **Text**: Gray-900 for headings, Gray-600 for body

### Dark Mode
- **Background**: `gray-900`
- **Card Background**: `gray-800`
- **Text**: White for headings, Gray-300 for body
- **Borders**: `gray-700`
- **Maintained accents**: Same Indigo and Emerald colors for consistency

## Responsive Breakpoints

```css
Mobile:     < 768px   → 1 column grid
Tablet:     768px+    → 2 columns
Desktop:    1024px+   → 3 columns
Large:      1280px+   → 4 columns
```

## Data Structure

```typescript
interface Lecture {
  id: string;              // Unique identifier
  title: string;           // Lecture name
  summary: string;         // Description
  tags: string[];          // Topic tags
  videoLink: string;       // Video URL
  notes: string;           // User's personal notes
  completed: boolean;      // Completion status
  codeExample?: string;    // Optional code snippet
}
```

## Key Interactions

1. **Search**: Type in search bar → filters lectures by title/summary
2. **Tag Filter**: Select tag from dropdown → shows only matching lectures
3. **Dark Mode**: Click moon/sun icon → toggles dark theme
4. **Complete Lecture**: Click checkbox → marks done, adds green border & badge
5. **Add Notes**: Type in textarea → auto-saves to state
6. **View Code**: Click "Code Example" → expands/collapses code block
7. **Watch Video**: Click "Watch Lecture" → opens video in new tab

## Features Implementation

### 1. **Search Functionality**
- Real-time filtering using `useMemo` for performance
- Case-insensitive search
- Searches both title and summary fields

### 2. **Tag Filtering**
- Dynamic tag extraction from all lectures
- Combines with search for refined results
- "All Topics" option to clear filter

### 3. **Dark Mode**
- Uses Tailwind's `dark:` variant classes
- Toggles `.dark` class on document root
- Smooth transitions with `transition-colors duration-300`

### 4. **Progress Tracking**
- Calculates completion percentage
- Animated progress bar with smooth width transitions
- Updates in real-time when lectures are marked complete

### 5. **Collapsible Sections**
- Uses Radix UI Collapsible component
- Smooth expand/collapse animations
- Code examples in monospace font with dark theme

### 6. **Editable Notes**
- Controlled textarea component
- Auto-resizing not implemented (fixed 3 rows)
- Persists in component state

### 7. **Hover Effects**
- Cards: `hover:scale-[1.02] hover:shadow-xl`
- Buttons: Color transitions on hover
- Smooth transitions with `transition-all duration-300`

## Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold (font-weight: 700)
- **Body Text**: Medium (font-weight: 500)
- **Labels**: Medium (font-weight: 500)

## Mock Data

The dashboard includes 8 sample React lectures:
1. Introduction to React
2. State and Props
3. Hooks: useState and useEffect
4. Component Lifecycle
5. Conditional Rendering
6. Lists and Keys
7. Forms and Controlled Components
8. Context API

Each includes realistic summaries, relevant tags, and code examples.

## Customization Guide

### Adding New Lectures
Edit `initialLectures` array in `Dashboard.tsx`:
```typescript
{
  id: "9",
  title: "Your Lecture Title",
  summary: "Description here...",
  tags: ["Tag1", "Tag2"],
  videoLink: "https://...",
  notes: "",
  completed: false,
  codeExample: "// Optional code"
}
```

### Changing Colors
Update hex values in component className strings:
- Primary: Replace `#4F46E5` (Indigo)
- Accent: Replace `#10B981` (Emerald)
- Background: Replace `#F3F4F6` (Light Gray)

### Adjusting Grid Layout
Modify grid classes in `Dashboard.tsx`:
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
```

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Grid and Flexbox support
- Tailwind CSS v4.0 compatible

## Performance Optimizations
- `useMemo` for filtered lectures (prevents unnecessary re-renders)
- `useMemo` for tag extraction
- `useMemo` for completion percentage calculation
- Controlled components with minimal re-renders

## Future Enhancement Ideas
- LocalStorage persistence for notes and completion
- Export/Import lecture progress
- Lecture difficulty ratings
- Time tracking per lecture
- Certificate generation on course completion
- Backend integration for multi-device sync
