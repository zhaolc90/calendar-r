import React, { Component } from "react";
// import logo from "./logo.svg";
import calendar from "./calendar.svg";
import "./App.css";
import Demo1 from './DatePicker'
import InputMask from 'react-input-mask';

// import RangeCalendar from "rc-calendar/lib/RangeCalendar";
import Demo from "./RangePicker";

import zhCN from "rc-calendar/lib/locale/zh_CN";
import enUS from "rc-calendar/lib/locale/en_US";
import TimePickerPanel from "rc-time-picker/lib/Panel";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/en-gb";
const cn = false;

if (cn) {
  moment.locale("zh-cn");
} else {
  moment.locale("en-gb");
}

const now = moment();
if (cn) {
  now.utcOffset(8);
} else {
  now.utcOffset(0);
}
function onStandaloneChange(value) {
  console.log("onChange");
  console.log(value[0] && format(value[0]), value[1] && format(value[1]));
}

function onStandaloneSelect(value) {
  console.log("onSelect");
  console.log(format(value[0]), format(value[1]));
}

const formatStr = "YYYY-MM-DD HH:mm:ss";
function format(v) {
  return v ? v.format(formatStr) : "";
}

const timePickerElement = (
  <TimePickerPanel
    defaultValue={[
      moment("00:00:00", "HH:mm:ss"),
      moment("23:59:59", "HH:mm:ss")
    ]}
  />
);

class App extends Component {
  render() {
    return (
      <div  > 
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div style={{ margin: 10 }}>
      <Demo
        showToday={false}
        showWeekNumber
        dateInputPlaceholder={['start', 'end']}
        locale={cn ? zhCN : enUS}
        showOk={false}
        showClear
        format={formatStr}
        onChange={onStandaloneChange}
        onSelect={onStandaloneSelect}
        // disabledDate={disabledDate}
        timePicker={timePickerElement}
        // disabledTime={disabledTime}
      />
        </div>
        <InputMask {...this.props} mask="9999/99/99-9999/99/99" maskChar="" />
        {/* <img width={'28px'} src={calendar} alt="logo" /> */}
      </div>
    );
  }
}

export default App;
