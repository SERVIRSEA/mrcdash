import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import './CustomCalendar.css';
import { FFGSFetcher } from '@/app/components/Fetchers/FFGSFetcher';
import { ffgsDate, allDates } from './state/FFGSAtom';

const CustomCalendar = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const [availableDates, setAvailableDates] = useAtom(allDates);
  // const availableDates = ['2023-12-01', '2023-12-02', '2023-12-03'];
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [activeDate, setActiveDate] = useAtom(ffgsDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const fetchDates = async () => {
      try {
          const params = {}
          const action = 'get-date-list';
          const data = await FFGSFetcher(action, params);
          setAvailableDates(data);
          const parsedData = JSON.parse(data).flat(); 
          const sortedData = parsedData.sort((a, b) => new Date(b) - new Date(a));
          const latestDate = sortedData[0]
          setActiveDate(latestDate);
      } catch (error) {
          console.error('Error fetching data:', error);
          throw error; 
      } finally {
          // setLoading(false);
      }
    }
    fetchDates();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const isDateAvailable = (date) => {
    return availableDates.includes(date);
  };

  const handleDayClick = (date) => {
    if (isDateAvailable(date)) {
      setActiveDate(date);
      setShowCalendar(false); // Hide the calendar after selecting a date
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(selectedYear, selectedMonth);
  
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isAvailable = isDateAvailable(dateStr);
      const isActive = dateStr === activeDate;
      const dayClass = isAvailable ? 'clickable' : 'disabled';
      const activeClass = isActive ? 'active' : '';
  
      days.push(
        <div key={day} className={`date-item ${dayClass} ${activeClass}`} onClick={() => isAvailable && handleDayClick(dateStr)}>
          {day}
        </div>
      );
    }
    return days;
  };
  


  return (
    <div id="customCalendar">
      <input 
        type="text" 
        value={activeDate} 
        onClick={() => setShowCalendar(!showCalendar)}
        readOnly
      />
      {availableDates && showCalendar && (
        <div id="calendarWrapper" ref={calendarRef}>
          <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
            {Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <div id="calendar">
            {generateCalendarDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
