import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@language-service/language.service';
import { CalendarBaseComponent } from '@shared/components/calendar-base/calendar-base.component';
import { calendarIcons } from 'src/app/image-pathes/calendar-icons';
import { HabitAssignService } from '@global-service/habit-assign/habit-assign.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends CalendarBaseComponent implements OnInit, OnDestroy {

  public isHabitsPopUpOpen = false;
  public selectedDay: number;
  public habitsCalendarSelectedDate: string;
  public calendarIcons = calendarIcons;
  public isDayTracked: boolean;
  public formatedData: string;
  public isHabitListEditable: boolean;
  public isHabitChecked: boolean;
  public isHabitEnrolled: boolean;
  public currentDate: Date = new Date();
  public habits: any[];
  public daysCanEditHabits = 7;
  public isFetching: boolean;
  public allHabitsEnrolled: boolean;

  @HostListener('document:click', ['$event']) clickout(event) {
    this.isHabitsPopUpOpen ? this.closePopUp() : null;
  }

  constructor(
    public translate: TranslateService,
    public languageService: LanguageService,
    public habitAssignService: HabitAssignService
  ) {
    super(translate, languageService);
  }

  ngOnInit() {
    this.bindDefaultTranslate();
    this.subscribeToLangChange();
    this.buildCalendar();
    this.markCalendarDays();
  }

  public getFormatedData(dayItem) {
    this.formatedData = `${dayItem.year}-${ dayItem.month + 1 < 10 ?
      '0' + (dayItem.month + 1) : dayItem.month + 1}-${dayItem.numberOfDate < 10 ?
      '0' + dayItem.numberOfDate : dayItem.numberOfDate}`;
  }

  public formatData(dayItem) {
    return `${dayItem.year}-${ dayItem.month + 1 < 10 ?
      '0' + (dayItem.month + 1) : dayItem.month + 1}-${dayItem.numberOfDate < 10 ?
      '0' + dayItem.numberOfDate : dayItem.numberOfDate}`;
  }

  public checkIfFuture(dayItem) {
    this.getFormatedData(dayItem);
    if (this.currentDate.setHours(0, 0, 0, 0) >= new Date(this.formatedData).setHours(0, 0, 0, 0)) {
      this.toggleHabitsList(dayItem);
    }
  }

  public toggleHabitsList(dayItem) {
    this.isFetching = true;
    this.isHabitsPopUpOpen = !this.isHabitsPopUpOpen;
    this.checkHabitListEditable();
    this.getActiveDateHabits(this.formatedData);
    this.selectedDay = dayItem.numberOfDate;
    this.habitsCalendarSelectedDate = this.months[dayItem.month] + ' ' + dayItem.numberOfDate + ', ' + dayItem.year;
    this.isDayTracked = !this.isDayTracked;
  }

  public checkHabitListEditable() {
    this.isHabitListEditable = false;
    if (this.currentDate.setHours(0, 0, 0, 0) - this.daysCanEditHabits * 24 * 60 * 60 * 1000 <= new Date(this.formatedData).setHours(0, 0, 0, 0)) {
      this.isHabitListEditable = true;
    }
  }

  public getActiveDateHabits(date) {
    this.habitAssignService.getHabitAssignByDate(date).pipe(
      take(1),
      map(habits => habits.sort((habit1, habit2) => (habit1.id > habit2.id) ? 1 : -1))
    ).subscribe(data => {
      this.habits = [...data];
      this.habits.forEach(habit => {
        habit.enrolled = this.checkIfEnrolledDate(habit);
      });
      this.isFetching = false;
    });
  }

  public enrollHabit(habit) {
    this.habitAssignService.enrollByHabit(habit.habit.id, this.formatedData).pipe(
      take(1)
    ).subscribe();
  }

  public unEnrollHabit(habit) {
    this.habitAssignService.unenrollByHabit(habit.habit.id, this.formatedData).pipe(
      take(1)
    ).subscribe();
  }

  public toggleEnrollHabit(habit) {
    this.isHabitListEditable ? habit.enrolled = !habit.enrolled : null;
  }

  public sendEnrollRequest() {
    console.log(this.habits);
    this.habits.forEach(habit => {
      if (habit.enrolled !== this.checkIfEnrolledDate(habit)) {
        habit.enrolled ? this.enrollHabit(habit) : this.unEnrollHabit(habit);
      }
    });
  }

  public checkIfEnrolledDate(habit) {
    this.isHabitEnrolled = false;
    habit.habitStatusCalendarDtoList.forEach(date => {
      if (date.enrollDate === this.formatedData) {
        this.isHabitEnrolled = true;
      }
    });
    return this.isHabitEnrolled;
  }

  public markCalendarDays() {
    this.calendarDay.forEach(day => {
      const date = this.formatData(day);
      if (this.currentDate.setHours(0, 0, 0, 0) >= new Date(date).setHours(0, 0, 0, 0)) {
        this.habitAssignService.getHabitAssignByDate(date).pipe(
          take(1)
        ).subscribe(habits => {
          day.isHabitsTracked = habits.length > 0;
          day.isAllHabitsEnrolled = habits.every(habit => {
            return habit.habitStatusCalendarDtoList.some(enrollDates => {
              if (enrollDates.enrollDate === date) {
                return true;
              }
              return false;
            });
          });
        });
      }
    });
  }

  public closePopUp() {
    this.isHabitsPopUpOpen = this.isHabitsPopUpOpen ? false : null;
    this.isDayTracked = false;
    this.sendEnrollRequest();
    this.habits = [];
  }
}
