import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tag {
  xp: number;
  level: number;
  color: string;
  taskCount: number;
}

interface TagState {
  tags: Record<string, Tag>;
}

const getRandomColor = () => {
  const colors = [
    '#F56565', // red
    '#ED8936', // orange
    '#ECC94B', // yellow
    '#48BB78', // green
    '#38B2AC', // teal
    '#4299E1', // blue
    '#667EEA', // indigo
    '#9F7AEA', // purple
    '#ED64A6', // pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const initialState: TagState = {
  tags: JSON.parse(localStorage.getItem('tags') || '{}'),
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTagXP: (state, action: PayloadAction<{ tagName: string; value: number }>) => {
      const { tagName, value } = action.payload;
      if (!state.tags[tagName]) {
        state.tags[tagName] = {
          xp: 0,
          level: 0,
          color: getRandomColor(),
          taskCount: 0,
        };
      }

      const xpToAdd = Math.abs(value);
      state.tags[tagName].xp += xpToAdd;
      state.tags[tagName].taskCount = (state.tags[tagName].taskCount || 0) + 1;
      state.tags[tagName].level = calculateLevel(state.tags[tagName].xp);
      
      localStorage.setItem('tags', JSON.stringify(state.tags));
    },
    removeTagXP: (state, action: PayloadAction<{ tagName: string; value: number }>) => {
      const { tagName, value } = action.payload;
      if (state.tags[tagName]) {
        const xpToRemove = Math.abs(value);
        state.tags[tagName].xp = Math.max(0, state.tags[tagName].xp - xpToRemove);
        state.tags[tagName].level = calculateLevel(state.tags[tagName].xp);
        state.tags[tagName].taskCount = Math.max(0, (state.tags[tagName].taskCount || 0) - 1);
        localStorage.setItem('tags', JSON.stringify(state.tags));
      }
    },
  },
});

const calculateLevel = (xp: number): number => {
  let level = 0;
  let requiredXP = 100; // Base XP required for level 1
  const LEVEL_XP_MULTIPLIER = 1.5;
  
  while (xp >= requiredXP) {
    level++;
    xp -= requiredXP;
    requiredXP = Math.floor(100 * Math.pow(LEVEL_XP_MULTIPLIER, level));
  }
  
  return level;
};

export const { addTagXP, removeTagXP } = tagSlice.actions;
export default tagSlice.reducer; 