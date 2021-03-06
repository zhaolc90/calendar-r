/* eslint react/no-multi-comp:0, no-console:0 */
/* eslint no-mixed-operators: 0 */
import React from 'react';
import Picker from './Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DateInput from 'rc-calendar/lib/date/DateInput';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-calendar/assets/index.css';
import calendar from "./calendar.svg";
import 'rc-time-picker/assets/index.css';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb'; 

const cn = false

if (cn) {
  moment.locale('zh-cn');
} else {
  moment.locale('en-gb');
}

const now = moment();
if (cn) {
  now.utcOffset(8);
} else {
  now.utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');
 

const formatStr = 'MM/DD/YYYY';
function format(v) {
  return v ? v.format(formatStr) : '';
}

function isValidRange(v) {
  return v && v[0] && v[1];
} 

export default class Demo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: [],
      hoverValue: [],
    }
    this.onCancel = this.onCancel.bind(this)
  }

  onChange = (value) => {
    console.log('onChange', value);
    this.setState({ value });
  }
  onCancel (v){
    console.log('onCancel clicked',v)
    console.log(this)
    if (v.length === 0) {
      this.onChange([now,now])
    }
  //  this.open 
 }
  onHoverChange = (hoverValue) => {
    this.setState({ hoverValue });
  }
  renderSidebar() {
    return (
      <div className="week-calendar-sidebar" key="sidebar">
        <button onClick={this.onCancel} style={{ margin: 20 }}>上一周</button>
      </div>);
    }
  renderFooter() {
    return (
      <button onClick={() => { this.onCancel(this.defaultValue) }}
          className={'cancel-btn'}  
          style={{
          margin: '20' ,
          position: 'absolute',
          right: '100px'
          }}>
          Cancel
          </button>
      )
      }
    renderHeaderInput() {
      return (
          <div className="week-calendar-sidebar-top" key="sidebar">
              <DateInput prefixCls="week-calendar" placeholder={formatStr} />      
              <span style={{float:'left',height:'38px',fontSize: '16px',backgroundColor: 'white',lineHeight: '40px'}}>~</span>      
        <DateInput prefixCls="week-calendar"  placeholder={formatStr}/>      
        </div>);
      }
    
  render() {
    const state = this.state;
    const calendar = (
        <RangeCalendar
        className="week-calendar"
        hoverValue={state.hoverValue}
        onHoverChange={this.onHoverChange}
        showWeekNumber={false}
        showDateInput={false}        
        showOk={true}
        showToday={false}    
        timePicker={<div />}
        format={formatStr}
        renderSidebar={this.renderSidebar}
        renderFooter={this.renderFooter}
        dateInputPlaceholder={[formatStr, formatStr]}
        defaultValue={[now, now.clone().add(1, 'months')]}
        locale={cn ? zhCN : enUS}
        onCancel={this.onCancel}
      />
    );
    return (
      <Picker
        value={state.value}
        onChange={this.onChange}
        animation="slide-up"
        calendar={calendar}
        format={formatStr}
      >
        {
          ({ value }) => {
              return (<span style={{ position: 'relative' }}>
                <input
                  placeholder={`${formatStr}~${formatStr}` }
                  style={{ width: 251 ,height:34, paddingLeft: '3px',fontSize: '16px'}}
                  disabled={state.disabled}
                  readOnly
                  className="ant-calendar-picker-input ant-input"
                  value={isValidRange(value) && `${format(value[0])} ~ ${format(value[1])}` || ''}
                />
                <span>
                    <img width={'28px'} src={calendar} style={{ position: 'absolute', right: '-15px'}} />
                </span>
                </span>);
          }
        }
      </Picker>);
  }
}
