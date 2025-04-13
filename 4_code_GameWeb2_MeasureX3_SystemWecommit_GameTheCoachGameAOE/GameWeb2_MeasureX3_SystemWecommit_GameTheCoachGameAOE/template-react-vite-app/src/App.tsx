import { Provider } from 'react-redux';
import { store } from './store';
import TaskManager from './pages/TaskManager';
import AppHeader from './components/AppHeader';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-4">
        <AppHeader />
        <TaskManager />
        <Analytics />
      </div>
    </Provider>
  );
}

export default App;
