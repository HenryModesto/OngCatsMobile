import { StatusBar } from 'react-native';
import Home from './app';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Home />
    </>
  );
}