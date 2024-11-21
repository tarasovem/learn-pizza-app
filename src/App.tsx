import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
	return (
		<>
			<Button onClick={() => console.log('click')}>Кнопка</Button>
			<Button appearance="big">Кнопка</Button>
			<Input />
		</>
	);
}

export default App;
