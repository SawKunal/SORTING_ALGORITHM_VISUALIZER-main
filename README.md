# Sorting Algorithm Visualizer

A React-based interactive sorting algorithm visualizer that demonstrates 6 different sorting algorithms with real-time animations and color-coded visualizations.

## Features

- **6 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort
- **Interactive Controls**: Algorithm selection, array size adjustment, and speed control
- **Visual Feedback**: Color-coded bars showing different states (comparing, swapping, sorted, etc.)
- **Algorithm Information**: Time/space complexity and descriptions for each algorithm
- **Real-time Statistics**: Progress tracking and performance metrics

## Technologies Used

- React 18
- Tailwind CSS
- Lucide React (for icons)

## Project Structure

```
sorting-visualizer/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Setup Instructions

1. **Create a new React project:**
   ```bash
   npx create-react-app sorting-visualizer
   cd sorting-visualizer
   ```

2. **Replace the files with the provided code:**
   - Copy the content from each artifact to its corresponding file
   - Make sure to create the directory structure as shown above

3. **Install dependencies:**
   ```bash
   npm install lucide-react
   npm install -D tailwindcss postcss autoprefixer
   ```

4. **Initialize Tailwind CSS:**
   ```bash
   npx tailwindcss init -p
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```
