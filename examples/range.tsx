import React from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import RangePicker from '../src/RangePicker';
import momentGenerateConfig from '../src/generate/moment';
import zhCN from '../src/locale/zh_CN';
import '../assets/index.less';
import './common.less';

const defaultStartValue = moment('2019-09-03 05:02:03');
const defaultEndValue = moment('2019-11-28 01:02:03');

function formatDate(date: Moment | null) {
  return date ? date.format('YYYY-MM-DD HH:mm:ss') : 'null';
}

export default () => {
  const [value, setValue] = React.useState<[Moment | null, Moment | null] | null>([
    defaultStartValue,
    defaultEndValue,
  ]);

  const onChange = (newValue: [Moment | null, Moment | null] | null, formatStrings?: string[]) => {
    console.log('Change:', newValue, formatStrings);
    setValue(newValue);
  };

  const onCalendarChange = (
    newValue: [Moment | null, Moment | null] | null,
    formatStrings?: string[],
  ) => {
    console.log('Calendar Change:', newValue, formatStrings);
  };

  const sharedProps = {
    generateConfig: momentGenerateConfig,
    value,
    onChange,
    onCalendarChange,
  };

  const rangePickerRef = React.useRef<RangePicker<Moment>>(null);

  const [timeValue, setTimeValue] = React.useState<any>([
    moment('12:00:11', 'HH:mm:ss'),
    moment('18:00:11', 'HH:mm:ss'),
  ]);
  const onTimeChange = (
    newValue: [Moment | null, Moment | null] | null,
    formatStrings?: string[],
  ) => {
    console.log('Change:', newValue, formatStrings);
    setTimeValue(newValue);
  };
  const disabledHours = ()=>{
    let hours=[];
    let time = new Date(+new Date() +8*3600*1000).toISOString().split("T")[1].split(".")[0];
    // let time=new Date(+new Date() +8*3600*1000).toISOString().split("T")[1].split(".")[0];
    // this.setState({startTime:time},()=>{console.log("11")});
    let timeArr = time.split(":");
    for(var i=0;i<parseInt(timeArr[0]);i++){
      hours.push(i)
    }
    return hours;
  };
  //限制分钟
  const disabledMinutes = (selectedHour)=>{
    let startTime = new Date(+new Date() +8*3600*1000).toISOString().split("T")[1].split(".")[0];
    let timeArr  =startTime.split(":");
    let minutes =[];
    if(selectedHour == parseInt(timeArr[0])){
      for(let i=0;i<parseInt(timeArr[1]);i++){
        minutes.push(i);
      }
    }
    return minutes;
  };
//限制秒
  const disabledSeconds = (selectedHour,selectedMinute)=>{
    let startTime = new Date(+new Date() +8*3600*1000).toISOString().split("T")[1].split(".")[0];
    let timeArr = startTime.split(':');
    let second = [];
    if (selectedHour == parseInt(timeArr[0]) && selectedMinute == parseInt(timeArr[1])) {
      for(var i = 0; i <= parseInt(timeArr[2]); i++) {
        second.push(i)
      }
    }
    return second;
  };
  return (
    <div>
      <h2>Value: {value ? `${formatDate(value[0])} ~ ${formatDate(value[1])}` : 'null'}</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ margin: '0 8px' }}>
          <h3>Basic</h3>
          {/*<RangePicker<Moment>*/}
          {/*  {...sharedProps}*/}
          {/*  value={undefined}*/}
          {/*  locale={zhCN}*/}
          {/*  allowClear*/}
          {/*  ref={rangePickerRef}*/}
          {/*  defaultValue={[moment('1990-09-03'), moment('1989-11-28')]}*/}
          {/*  clearIcon={<span>X</span>}*/}
          {/*  suffixIcon={<span>O</span>}*/}
          {/*/>*/}
          {/*<RangePicker<Moment>*/}
          {/*  {...sharedProps}*/}
          {/*  locale={zhCN}*/}
          {/*  allowClear*/}
          {/*  ref={rangePickerRef}*/}
          {/*  showTime*/}
          {/*  style={{ width: 700 }}*/}
          {/*  ranges={{*/}
          {/*    ranges: [moment(), moment().add(10, 'day')],*/}
          {/*  }}*/}
          {/*  onOk={(dates) => {*/}
          {/*    console.log('OK!!!', dates);*/}
          {/*  }}*/}
          {/*/>*/}
          <RangePicker<Moment>
            {...sharedProps}
            value={timeValue}
            locale={zhCN}
            allowClear
            picker="time"
            disabledHours = {disabledHours}
            disabledMinutes = {disabledMinutes}
            disabledSeconds = {disabledSeconds}
            ranges={{
              '1小时之前': [moment().subtract(1, 'h'), moment()],
              '15分钟之前': [moment().subtract(15, 'm'), moment()],
              '1小时之后': [moment(), moment().add(1, 'hour')],
              '30分钟之后': [moment(), moment().add(30, 'minute')]
            }}
            onChange={onTimeChange}
          />
        </div>

        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Focus</h3>*/}
        {/*  <RangePicker<Moment>*/}
        {/*    {...sharedProps}*/}
        {/*    locale={zhCN}*/}
        {/*    allowClear*/}
        {/*    ref={rangePickerRef}*/}
        {/*    // style={{ width: 500 }}*/}
        {/*  />*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    onClick={() => {*/}
        {/*      rangePickerRef.current!.focus();*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Focus!*/}
        {/*  </button>*/}
        {/*</div>*/}

        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Year</h3>*/}
        {/*  <RangePicker<Moment> {...sharedProps} locale={zhCN} picker="year" />*/}
        {/*</div>*/}

        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Quarter</h3>*/}
        {/*  <RangePicker<Moment> {...sharedProps} locale={zhCN} picker="quarter" />*/}
        {/*</div>*/}

        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Month</h3>*/}
        {/*  <RangePicker<Moment> {...sharedProps} locale={zhCN} picker="month" />*/}
        {/*</div>*/}

        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Week</h3>*/}
        {/*  <RangePicker<Moment> {...sharedProps} locale={zhCN} picker="week" />*/}
        {/*</div>*/}

        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Allow Empty</h3>*/}
        {/*  <RangePicker<Moment>*/}
        {/*    {...sharedProps}*/}
        {/*    locale={zhCN}*/}
        {/*    allowClear*/}
        {/*    allowEmpty={[true, true]}*/}
        {/*  />*/}
        {/*</div>*/}

        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Start disabled</h3>*/}
        {/*  <RangePicker<Moment> {...sharedProps} locale={zhCN} allowClear disabled={[true, false]} />*/}
        {/*</div>*/}
        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>End disabled</h3>*/}
        {/*  <RangePicker<Moment> {...sharedProps} locale={zhCN} allowClear disabled={[false, true]} />*/}
        {/*</div>*/}

        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Uncontrolled</h3>*/}
        {/*  <RangePicker<Moment>*/}
        {/*    {...sharedProps}*/}
        {/*    value={undefined}*/}
        {/*    locale={zhCN}*/}
        {/*    placeholder={['start...', 'end...']}*/}
        {/*    disabled={[false, true]}*/}
        {/*    allowEmpty={[false, true]}*/}
        {/*    renderExtraFooter={() => <div>extra footer</div>}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div style={{ margin: '0 8px' }}>*/}
        {/*  <h3>Uncontrolled2</h3>*/}
        {/*  <RangePicker<Moment>*/}
        {/*    {...sharedProps}*/}
        {/*    value={undefined}*/}
        {/*    locale={zhCN}*/}
        {/*    placeholder={['start...', 'end...']}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
