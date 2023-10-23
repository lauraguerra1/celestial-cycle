import { getTodaysDate, isDateInFuture } from '@/utils/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

interface DatePickerProps {
  entryDate: Date;
  updateEntryDate: (date: Date) => void;
  setChosenDate?: React.Dispatch<React.SetStateAction<string>>;
}

const DatePicker = ({ updateEntryDate, entryDate, setChosenDate }: DatePickerProps) => {
  const router = useRouter();

  const goToDate = (num: number, entryDate: Date) => {
    if (router.asPath.includes("/insights")) {
      router.push(`${router.asPath.includes("/demo") ? "/demo" : ""}/insights/${entryDate.getMonth() + 1}-${entryDate.getDate() + num}-${entryDate.getFullYear()}`);
      if (setChosenDate)
        setChosenDate(`${entryDate.getMonth() + 1}-${entryDate.getDate() + num}-${entryDate.getFullYear()}`);
    } else {
      const newDate = new Date(entryDate);
      newDate.setDate(newDate.getDate() + num);
      updateEntryDate(newDate);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => goToDate(-1, entryDate)}
        className="material-symbols-rounded text-mellow-yellow text-3xl"
      >
        chevron_left
      </button>
      <h1 className="thin-regular text-center text-mellow-yellow text-2xl">
        {getTodaysDate(new Date(entryDate))}
      </h1>
      {!isDateInFuture(entryDate) ? (
        <button
          onClick={() => goToDate(1, entryDate)}
          className="material-symbols-rounded text-mellow-yellow text-3xl"
        >
          chevron_right
        </button>
      ) : (
        <div className="w-5"></div>
      )}
    </div>
  );
};

export default DatePicker;
