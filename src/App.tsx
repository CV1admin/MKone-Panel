import { FirebaseProvider } from './components/FirebaseProvider';
import { Dashboard } from './components/Dashboard';

export default function App() {
  return (
    <FirebaseProvider>
      <Dashboard />
    </FirebaseProvider>
  );
}
