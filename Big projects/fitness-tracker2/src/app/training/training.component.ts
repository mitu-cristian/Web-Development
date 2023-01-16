import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: boolean = false;
  exerciseSubscription: Subscription | any;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if (exercise.id != '' && exercise.name != '' && exercise.duration != 0 && exercise.calories != 0) {
          console.log(exercise);
          this.ongoingTraining = true;
        }
        else {
          console.log(exercise);
          this.ongoingTraining = false;
        }
      })
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
