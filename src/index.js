import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';

import { rootReducer } from './redux/rootReducer';
import { asyncIncrement, changeTheme, decrement, increment } from './redux/actions';

import './styles.css';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

// const store = createStore(
// 	rootReducer,
// 	// Dev Tools – variant 1 (without package)
// 	compose(
// 		applyMiddleware(thunk, logger),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	),
// );

const store = createStore(
  rootReducer,
	// Dev Toolt – variant 2 (with @redux-devtools/extension package)
  composeWithDevTools(
    applyMiddleware(thunk, logger),
  )
);

addBtn.addEventListener('click', () => {
	store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
	store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
	store.dispatch(asyncIncrement());
});

themeBtn.addEventListener('click', () => {
	const newTheme = document.body.classList.contains('light')
		? 'dark'
		: 'light';
	store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
	const state = store.getState();

	counter.textContent = state.counter;
	document.body.className = state.theme.value;

	[addBtn, subBtn, themeBtn].forEach(btn => {
		btn.disabled = state.theme.disabled;
	});
});

store.dispatch({ type: 'INIT_APPLICATION' });
