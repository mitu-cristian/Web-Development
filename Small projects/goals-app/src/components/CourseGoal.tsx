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