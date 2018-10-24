import { AngularQuizService } from './services/angular-quiz.service';
import { Observable, throwError } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { QuizCard } from './models/quiz.model';
import { finalize, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'angular-quiz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  loaded = false;
  error: string;
  quizzes$: Observable<QuizCard[]>;
  constructor(private angularQuizService: AngularQuizService) { }

  ngOnInit() {
    this.quizzes$ = this.angularQuizService.getTwitterFetch().pipe(
      tap(val => { console.log(val); }),
      catchError(err => {
        this.error = err;
        return throwError(err);
      }),
      finalize(() => {
        this.loaded = true;
      })
    );
  }
}
