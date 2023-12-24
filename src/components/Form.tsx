import React, { useState, useRef, RefObject } from 'react';
import Image from 'next/image';
import { AuthProps, selectionType } from '@/types/types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { formatDateForDB } from '@/utils/utils';
import { getEntry, postEntry } from '@/utils/apiCalls';
import LoadingGif from './LoadingGif';
import DatePicker from './DatePicker';

export type FormProps = AuthProps & {
  entryDate: Date;
  updateEntryDate: (date: Date) => void;
  setSelections: React.Dispatch<React.SetStateAction<selectionType>>;
  selections: selectionType;
};

const Form = ({ entryDate, isAuthorized, data, updateEntryDate, selections, setSelections }: FormProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [symptoms, setSymptoms] = useState('');

  const updateSelections = (title: string, option: string): void => {
    const newOption = title === option ? null : option;
    setSelections((prev) => ({ ...prev, [title]: newOption }));
  };

  const [scrolling, setScrolling] = useState<Boolean>(false);
  const router = useRouter();

  const flowSliderRef = useRef(null);
  const moodSliderRef = useRef(null);
  const cravingsSliderRef = useRef(null);

  const slideLeft = (slider: RefObject<HTMLDivElement>) => {
    if (slider.current) {
      const target = slider.current.scrollLeft - 100;
      slider.current.scrollTo({
        left: target,
        behavior: 'smooth',
      });
    }
  };

  const slideRight = (slider: RefObject<HTMLDivElement>) => {
    if (slider.current) {
      const target = slider.current.scrollLeft + 100;
      slider.current.scrollTo({
        left: target,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      router.push('/');
    }
    const getFormData = async () => {
      setLoading(true);
      try {
        const entryInfo = await getEntry(router.asPath.includes('demo'), formatDateForDB(entryDate as Date));

        if (entryInfo.data) {
          setSelections({ FLOW: entryInfo.data.flow, MOOD: entryInfo.data.mood, CRAVINGS: entryInfo.data.craving });
          setSymptoms(entryInfo.data.symptom ?? '');
        } else {
          setSelections({ FLOW: null, MOOD: null, CRAVINGS: null });
          setSymptoms('');
        }
      } catch (error) {
        if (error instanceof Error) setError(error);
      }
      setLoading(false);
    };
    getFormData();

    return () => setError(null);
  }, [isAuthorized, entryDate, data, router, setSelections]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const postForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const infoOptions = [...Object.values(selections), symptoms];
    try {
      if (infoOptions.every((option) => !option)) {
        throw new Error('Please input something to save!');
      }
      await postEntry(router.asPath.includes('demo'), {
        flow: selections.FLOW,
        craving: selections.CRAVINGS,
        mood: selections.MOOD,
        symptom: symptoms,
        date: `${new Date(entryDate).getFullYear()}-${new Date(entryDate).getMonth() + 1}-${new Date(entryDate).getDate()}`,
      });
      setError(null);
      router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/insights/${new Date(entryDate).getMonth()+1}-${new Date(entryDate).getDate()}-${new Date(entryDate).getFullYear()}`);
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  return (
    <div className='fade-in'>
      <div className='flex flex-col items-center'>
        <div className={`w-full fixed top-10 z-10 lg:top-0 ${scrolling ? 'bg-deepblue' : ''}`}>
          <DatePicker updateEntryDate={updateEntryDate} entryDate={entryDate} />
        </div>
        {error && <p className='thick-regular text-center'>{error.message}</p>}
        {loading ? <div className='mt-28'><LoadingGif /></div> : (
          <form onSubmit={e => postForm(e)}  className='w-3/4 max-sm:w-11/12 lg:w-1/2 mt-28 lg:mt-20'>
            <div className='grid pt-2' style={{ background: 'rgba(37, 54, 86, 0.73)' }}>
              <div className='overflow-x-auto'>
                <h3 className='ml-2 text-white thick-regular'>FLOW</h3>
                <div className='flex items-center'>
                  <button type='button' className="p-1 ml-1 mb-10 material-symbols-rounded text-mellow-yellow text-3xl md:hidden" onClick={() => slideLeft(flowSliderRef)}>{`<`}</button>
                  <div className='flex max-w-100vw justify-start' ref={flowSliderRef} style={{ overflow: 'hidden' }}>
                    <FlowOptions selections={selections} updateSelections={updateSelections}/>
                  </div>
                  <button type='button' className="p-1 mr-1 mb-10 material-symbols-rounded text-mellow-yellow text-3xl md:hidden" onClick={() => slideRight(flowSliderRef)}>{`>`}</button>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <h3 className='ml-2 text-white thick-regular'>MOOD</h3>
                <div className='flex items-center'>
                  <button type='button' className="p-1 ml-1 mb-10 material-symbols-rounded text-mellow-yellow text-3xl" onClick={() => slideLeft(moodSliderRef)}>{`<`}</button>
                  <div className='flex max-w-100vw justify-start' style={{ overflow: 'hidden' }} ref={moodSliderRef}>
                    <MoodOptions selections={selections} updateSelections={updateSelections}/>
                  </div>
                  <button type='button' className="p-1 mr-1 mb-10 material-symbols-rounded text-mellow-yellow text-3xl" onClick={() => slideRight(moodSliderRef)}>{`>`}</button>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <h3 className='ml-2 text-white thick-regular'>CRAVINGS</h3>
                <div className='flex items-center'>
                  <button type='button' className="p-1 ml-1 mb-10 material-symbols-rounded text-mellow-yellow text-3xl" onClick={() => slideLeft(cravingsSliderRef)}>{`<`}</button>
                <div className='flex max-w-100vw justify-start' ref={cravingsSliderRef} style={{ overflow: 'hidden' }}>
                  <CravingsOptions selections={selections} updateSelections={updateSelections}/>
                </div>
                <button type='button' className="p-1 mr-1 mb-10 material-symbols-rounded text-mellow-yellow text-3xl" onClick={() => slideRight(cravingsSliderRef)}>{`>`}</button>
              </div>
              </div>
              <div className='flex flex-col justify-around md:items-end md:flex-row'>
                <textarea
                  className='mt-2 bg-opacity-20 bg-gray-400 w-2/3 text-white w-3/4 md:w-1/2 md:ml-0 ml-8 p-2 rounded-xl mb-4'
                  placeholder='Enter notes about any symptoms here...'
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}/>
                <div className='flex content-center mb-4 ml-8'>
                  <button className='h-8 rounded-lg bg-opacity-6 bg-grayblue w-40' type="submit">
                    SAVE
                  </button>
                </div>  
              </div>
            </div>
        </form>
      )}
      </div>
    </div>
  );
};


function FlowOptions({ selections, updateSelections }: {selections: selectionType, updateSelections: (title: string, option: string)=> void }) {
  const flows = ['No Flow', 'Spotting', 'Light', 'Medium', 'Heavy', 'Super'];

  return flows.map(flow => {
    return(
      <button type="button" key={flow} onClick={() => updateSelections("FLOW", flow)} className='m-5 w-14 flex justify-content flex-col items-center'>
        <div className={`${selections.FLOW === flow ? 'selected-option' : 'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
          <Image width={64} height={64} className='w-5/6 h-5/6' src={`/images/FormIcons/${flow}.png`} alt={flow} />
        </div>
        <p className='min-w-max text-white thin-regular'>{flow}</p>
      </button>
    );
  });
}

function MoodOptions({ selections, updateSelections }: { selections: selectionType, updateSelections: (title: string, option: string)=> void }) {
  const moods = ['Angry', 'Annoyed', 'Anxious', 'Confident', 'Depressed', 'Fatigued', 'Grateful', 'Happy', 'Relaxed'];

  return moods.map(mood => {
    return(
      <button type="button" key={mood} onClick={() => updateSelections("MOOD", mood)} className='m-5 w-14 flex justify-content flex-col items-center'>
        <div className={`${selections.MOOD === mood ? 'selected-option' : 'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
          <Image width={64} height={64} className='w-5/6 h-5/6' src={`/images/FormIcons/${mood}.png`} alt={mood} />
        </div>
        <p className='min-w-max text-white thin-regular'>{mood}</p>
      </button>
    );
  });
}

function CravingsOptions({ selections, updateSelections }: {selections: selectionType, updateSelections: (title: string, option: string)=> void }) {
  const cravings = ['Alcohol', 'Carbs', 'Chocolate', 'Dairy', 'Fats', 'Fried', 'Nicotine', 'Protein', 'Salty', 'Sour', 'Sweet'];

  return cravings.map(craving => {
    return(
      <button type="button" key={craving} onClick={() => updateSelections("CRAVINGS", craving)} className='m-5 w-14 flex justify-content flex-col items-center'>
        <div className={`${selections.CRAVINGS === craving ? 'selected-option' : 'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
          <Image width={64} height={64} className='w-5/6 h-5/6' src={`/images/FormIcons/${craving}.png`} alt={craving} />
        </div>
        <p className='min-w-max text-white thin-regular'>{craving}</p>
      </button>
    );
  });
}

export default Form;