import { formatDateQuery, getTodaysDate, isDateInFuture } from '@/utils/utils';
import { useRouter } from 'next/router';
import React from 'react'

interface DatePickerProps {
  entryDate: Date;
  updateEntryDate: (date: Date) => void;
  setChosenDate?: React.Dispatch<React.SetStateAction<string>>;
}

const DatePicker = ({ updateEntryDate, entryDate, setChosenDate }: DatePickerProps) => {
  const router = useRouter();

  const goToDate = (num: number, entryDate: Date) => {
    if (router.asPath.includes("/insights") && setChosenDate) {
      router.push(`${router.asPath.includes("/demo") ? "/demo" : ""}/insights/${formatDateQuery(entryDate, num)}`);
      setChosenDate(formatDateQuery(entryDate, num));
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
