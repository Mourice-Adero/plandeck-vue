export interface Subtask {
  title: string
  completed: boolean
}
export interface Task {
  _id: string
  title: string
  description: string
  category: string
  date: string
  time: string
  subtasks: Subtask[]
  completed: boolean
}
export const tasks: Task[] = [
  {
    title: 'Complete Project Proposal',
    description: 'Draft and submit the client project proposal by EOD.',
    category: 'Work',
    date: '2023-11-15',
    time: '14:00',
    subtasks: [
      { title: 'Research competitors', completed: false },
      { title: 'Outline key features', completed: true },
      { title: 'Review with team', completed: false },
    ],
    completed: false,
  },
  {
    title: 'Grocery Shopping',
    description: 'Buy essentials for the week.',
    category: 'Personal',
    date: '2025-07-17',
    time: '10:30',
    subtasks: [
      { title: 'Milk', completed: false },
      { title: 'Eggs', completed: false },
      { title: 'Vegetables', completed: true },
    ],
    completed: false,
  },
  {
    title: 'Morning Workout',
    description: '30-minute cardio session.',
    category: 'Health',
    date: '2025-07-17',
    time: '07:00',
    subtasks: [
      { title: 'Warm-up stretches', completed: false },
      { title: 'Running', completed: false },
    ],
    completed: false,
  },
  {
    title: 'Read Vue 3 Documentation',
    description: 'Study Composition API updates.',
    category: 'Learning',
    date: '2023-11-18',
    time: '20:00',
    subtasks: [
      { title: 'Setup example project', completed: true },
      { title: 'Try reactive examples', completed: false },
    ],
    completed: false,
  },
]
