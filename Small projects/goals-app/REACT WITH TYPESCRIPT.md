# TypeScript

## How to use TypeScript in a React project?

- **props** in this case it is ideal to use type or interface
	- props when using **function**
```javascript
interface CourseGoalProps {
    	title: string;
    	description: string;
    }
export default function CourseGoal({title, description}: CourseGoalProps) {}
```
	- props when using **arrow function i.e. functional component**
		```javascript
	import {type FC} from "react";
	
	type CourseGoalProps = {
		title: string;
		description: string;
	}

	const CourseGoal: FC<CourseGoalProps> = ({title, description}) => {}
	```

- **children**
	- importing **ReactNode**
	```javascript
	import {type ReactNode} from "react";
	
	interface CourseGoalProps {
		title: string;
		description: string;
		children: ReactNode;
	}
	
	export default function CourseGoal({title, children, description}: CourseGoalProps) {}
	```
	- importing **PropsWithChildren**
		```javascript
	import {type PropsWithChildren} from "react";

	type CourseGoalProps = PropsWithChildren<{
		title: string,
		description: string
	}>

		export default function CourseGoal({title, description, children}: CourseGoalProps) {}
	```

- **2 types of props for a component** (when the mode is set to hint, we don't want to provide the severity, the severity will be provided only when mode is set to warning)
	```javascript
	import {type ReactNode } from "react"

	type HintBoxProps = {
		mode: "hint",
		children: ReactNode
	}

	type WarningBoxProps = {
		mode: "warning",
		severity: "low" | "medium" | "high",
		children: ReactNode
	}

	type InfoBoxProps = HintBoxProps | WarningBoxProps

	export default function InfoBox(props: InfoBoxProps) {

		const {children, mode} = props;

		if(mode === "hint") {
			return (
				<aside className="infobox infobox-hint">
					<p> {children} </p>
				</aside>
			)
		}

		const {severity} = props;

		return (
			<aside className={`infobox infobox-warning warning--${severity}`}>
				<h2>Warning</h2>
				<p> {children} </p>
			</aside>
		)
	}
	```

- **use the same props for 2 components**
	- App.tsx
		```javascript
	export type CourseGoal = {
		title: string;
		description: string;
		id: number;
	}

	export default function App() {
		const [goals, setGoals] = useState<CourseGoal[]>([]);
	}
	```
	- CourseGoalList.tsx
		```javascript
	import {type CourseGoal as CourseGoalProps} from "../App.tsx";

	type CourseGoalListProps = {
		goals: CourseGoalProps[]
	};

	export default function CourseGoalList({goals}: CourseGoalListProps) {}
	```

- **pass a function through multiple components**
	- App.tsx
		```javascript
	function handleDeleteGoal(id: number) {
		setGoals(prevGoals => prevGoals.filter((goal) => goal.id !== id));
	}

	return (
		<main>
			<CourseGoalList goals = {goals} onDeleteGoal = {handleDeleteGoal}/>
		</main>
	)
	```
	- CourseGoalList.tsx
		```javascript
	type CourseGoalListProps = {
		goals: CourseGoalProps[];
		onDeleteGoal: (id: number) => void;
	}

	export default function CourseGoalList({goals, onDeleteGoal}: CourseGoalListProps) {
	return (
	<>
	{warningBox}
	<ul> {goals.map((goal) => (
		<li key={goal.id}>
		  <CourseGoal id = {goal.id} title={goal.title} description = {goal.description} 
							onDelete = {onDeleteGoal}>
			<p> Description </p>
		  </CourseGoal> 
		</li>))}
	</ul>
	</>
	);
	}
	}
	```
	- CourseGoal.tsx
		```javascript
	import {type PropsWithChildren} from "react";

	type CourseGoalProps = PropsWithChildren<{
		id: number;
		title: string; 
		description: string;
		onDelete: (id: number) => void;
	}>

	export default function CourseGoal({id, title, description, children, onDelete}: CourseGoalProps) {

		return (<article>
			<div>
				<h2>{title}</h2>
				<p>{description}</p>
				<p>{children}</p>
			</div>
			<button onClick = {() => onDelete(id)}>Delete</button>
		</article>)
	}
	```
- **handle form inputs**
```javascript
	import {useRef, type FormEvent } from "react";

	type NewGoalProps = {
		onAddGoal: (goal: string, summary: string) => void;
	}

	export default function NewGoal({onAddGoal}: NewGoalProps) {

		const goal = useRef<HTMLInputElement>(null);
		const summary = useRef<HTMLInputElement>(null);

		function handleSubmit(event: FormEvent<HTMLFormElement>) {
			event.preventDefault();

			const enteredGoal = goal.current!.value;
			const enteredSummary = summary.current!.value;

			event.currentTarget.reset();
			onAddGoal(enteredGoal, enteredSummary);
		}

		return (
			<form onSubmit={handleSubmit}>
				<p>
					<label htmlFor="goal">Your goal</label>
					<input id="goal" type="text" ref={goal}/>
				</p>
				<p>
					<label htmlFor="summary">Short summary</label>
					<input id="summary" type="text" ref={summary} />
				</p>
				<p>
					<button>Add Goal</button>
				</p>
			</form>
		)
	}
	```