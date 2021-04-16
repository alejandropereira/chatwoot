import ApplicationController from './application_controller';
import { format } from 'date-fns';
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

var theme = {
  'common.border': '1px solid #e5e5e5',
  'common.backgroundColor': 'white',
  'common.holiday.color': '#ff4040',
  'common.saturday.color': '#333',
  'common.dayname.color': '#333',
  'common.today.color': '#333',

  // creation guide style
  'common.creationGuide.backgroundColor': 'rgb(249, 252, 255)',
  'common.creationGuide.border': '1px solid #0094FF',

  // month header 'dayname'
  'month.dayname.height': '31px',
  'month.dayname.borderLeft': '1px solid #e5e5e5',
  'month.dayname.paddingLeft': '10px',
  'month.dayname.paddingRight': '10px',
  'month.dayname.backgroundColor': 'inherit',
  'month.dayname.fontSize': '12px',
  'month.dayname.fontWeight': 'normal',
  'month.dayname.textAlign': 'left',

  // month day grid cell 'day'
  'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
  'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
  'month.weekend.backgroundColor': 'inherit',
  'month.day.fontSize': '14px',

  // month schedule style
  'month.schedule.borderRadius': '2px',
  'month.schedule.height': '24px',
  'month.schedule.marginTop': '2px',
  'month.schedule.marginLeft': '8px',
  'month.schedule.marginRight': '8px',

  // month more view
  'month.moreView.border': '1px solid #d5d5d5',
  'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
  'month.moreView.backgroundColor': 'white',
  'month.moreView.paddingBottom': '17px',
  'month.moreViewTitle.height': '44px',
  'month.moreViewTitle.marginBottom': '12px',
  'month.moreViewTitle.backgroundColor': 'inherit',
  'month.moreViewTitle.borderBottom': 'none',
  'month.moreViewTitle.padding': '12px 17px 0 17px',
  'month.moreViewList.padding': '0 17px',

  // week header 'dayname'
  'week.dayname.height': '42px',
  'week.dayname.borderTop': '1px solid #e5e5e5',
  'week.dayname.borderBottom': '1px solid #e5e5e5',
  'week.dayname.borderLeft': 'inherit',
  'week.dayname.paddingLeft': '0',
  'week.dayname.backgroundColor': 'inherit',
  'week.dayname.textAlign': 'left',
  'week.today.color': '#333',
  'week.pastDay.color': '#bbb',

  // week vertical panel 'vpanel'
  'week.vpanelSplitter.border': '1px solid #e5e5e5',
  'week.vpanelSplitter.height': '3px',

  // week daygrid 'daygrid'
  'week.daygrid.borderRight': '1px solid #e5e5e5',
  'week.daygrid.backgroundColor': 'inherit',

  'week.daygridLeft.width': '72px',
  'week.daygridLeft.backgroundColor': 'inherit',
  'week.daygridLeft.paddingRight': '8px',
  'week.daygridLeft.borderRight': '1px solid #e5e5e5',

  'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
  'week.weekend.backgroundColor': 'inherit',

  // week timegrid 'timegrid'
  'week.timegridLeft.width': '72px',
  'week.timegridLeft.backgroundColor': 'inherit',
  'week.timegridLeft.borderRight': '1px solid #e5e5e5',
  'week.timegridLeft.fontSize': '11px',
  'week.timegridLeftTimezoneLabel.height': '40px',
  'week.timegridLeftAdditionalTimezone.backgroundColor': 'white',

  'week.timegridOneHour.height': '52px',
  'week.timegridHalfHour.height': '26px',
  'week.timegridHalfHour.borderBottom': 'none',
  'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

  'week.timegrid.paddingRight': '8px',
  'week.timegrid.borderRight': '1px solid #e5e5e5',
  'week.timegridSchedule.borderRadius': '2px',
  'week.timegridSchedule.paddingLeft': '2px',

  'week.currentTime.color': '#0094FF',
  'week.currentTime.fontSize': '11px',
  'week.currentTime.fontWeight': 'normal',

  'week.pastTime.color': '#bbb',
  'week.pastTime.fontWeight': 'normal',

  'week.futureTime.color': '#333',
  'week.futureTime.fontWeight': 'normal',

  'week.currentTimeLinePast.border': '1px dashed #0094FF',
  'week.currentTimeLineBullet.backgroundColor': '#0094FF',
  'week.currentTimeLineToday.border': '1px solid #0094FF',
  'week.currentTimeLineFuture.border': 'none',

  // week creation guide style
  'week.creationGuide.color': '#0094FF',
  'week.creationGuide.fontSize': '11px',
  'week.creationGuide.fontWeight': 'bold',

  // week daygrid schedule style
  'week.dayGridSchedule.borderRadius': '2px',
  'week.dayGridSchedule.height': '24px',
  'week.dayGridSchedule.marginTop': '2px',
  'week.dayGridSchedule.marginLeft': '8px',
  'week.dayGridSchedule.marginRight': '8px',
};

export default class extends ApplicationController {
  static targets = ['calendar', 'day'];

  connect() {
    console.log("connect")
    super.connect();
    const _this = this;
    this.calendar = new Calendar(this.calendarTarget, {
      defaultView: 'day',
      taskView: false,
      useCreationPopup: false,
      useDetailPopup: false,
      theme,
    });
    window.calendar = this.calendar

    this.calendar.on('beforeCreateSchedule', function(event) {
      console.log({ event });
      const guide = event.guide;
      const startTime = format(event.start['_date'], 'yyyy-MM-dd HH:mm:ss xxx');
      const endTime = format(event.end['_date'], 'yyyy-MM-dd HH:mm:ss xxx');
      _this.stimulate('CalendarEventReflex#new', startTime, endTime);
      guide.clearGuideElement();
    });

    this.calendar.on('beforeUpdateSchedule', function(event) {
      console.log({ event });
      const schedule = event.schedule;
      const changes = event.changes;
      const startTime = format(event.start['_date'], 'yyyy-MM-dd HH:mm:ss xxx');
      const endTime = format(event.end['_date'], 'yyyy-MM-dd HH:mm:ss xxx');

      _this.stimulate('CalendarEventReflex#update', schedule.id, startTime, endTime);
      _this.calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    });

    this.events = JSON.parse(this.element.dataset.events).map(event => ({
      id: event.id,
      title: event.title,
      category: 'time',
      dueDateClass: '',
      bgColor: '#fff',
      borderColor: '#3B82F6',
      start: event.start_time,
      end: event.end_time,
    }));

    this.calendar.createSchedules(this.events)
  }

  disconnect() {
    console.log("disconnect")
    this.calendar.destroy()
  }

  afterReflex (element, reflex, noop, reflexId) {
    console.log("afterReflex")
    this.calendar.render();
  }

  addEvent(event) {
    const newEvent = {
      id: event.detail.event.id,
      title: event.detail.event.title,
      category: 'time',
      dueDateClass: '',
      bgColor: '#fff',
      borderColor: '#3B82F6',
      start: event.detail.event.start_time,
      end: event.detail.event.end_time,
    }
    console.log({ newEvent, detail: event.detail })
    this.calendar.createSchedules([newEvent])
  }

  changeDate(e) {
    const date = e.currentTarget.dataset.date;
    // this.calendar.setDate(
    //   new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]))
    // );
    this.stimulate("CalendarEvent#change_date", date)
  }
}
