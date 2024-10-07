import CourseGoal from "./CourseGoal.tsx";
import {type CourseGoal as CourseGoalProps} from "../App.tsx";
import InfoBox from "./InfoBox.tsx";
import { type ReactNode } from "react";

type CourseGoalListProps = {
    goals: CourseGoalProps[];
    onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({goals, onDeleteGoal}: CourseGoalListProps) {

  if(goals.length === 0) {
    return (
      <InfoBox mode="hint">
        You have no course goals.
      </InfoBox>
    )
  }

  let warningBox: ReactNode;
  if(goals.length >=4) {
    warningBox = <InfoBox mode="warning" severity="high">You are collecting a lot of goals. Don't put too much on your plate.</InfoBox>
  }

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