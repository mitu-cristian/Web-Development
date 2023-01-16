import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs';

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 300, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 100 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 30 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runningExercise: Exercise | any;
    private exercises: Exercise[] = [];
    exerciseChanged = new Subject<Exercise>();

    startExercise(selectedId: string) {
        // The object that the user selected.  
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)
        console.log(this.runningExercise);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = { id: '', name: '', duration: 0, calories: 0 };
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100), date: new Date(), state: 'cancelled'
        });
        this.runningExercise = { id: '', name: '', duration: 0, calories: 0 };
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }
}