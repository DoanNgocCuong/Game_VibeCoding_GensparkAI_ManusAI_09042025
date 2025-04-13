import { Provider } from 'react-redux';
import { store } from './store';
import TaskManager from './pages/TaskManager';
import ExperienceOverview from './components/ExperienceOverview';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-100 font-sans min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-indigo-700">Quản Lý Task Theo Giá Trị</h1>
            <p className="text-gray-600 mt-2">Quy đổi công việc thành giá trị và theo dõi sự phát triển của bạn</p>
            <div className="mt-4">
              <p className="text-lg font-semibold text-indigo-600">Đoàn Ngọc Cường</p>
            </div>
          </header>
          <TaskManager />
        </div>
      </div>
    </Provider>
  );
}

export default App;
