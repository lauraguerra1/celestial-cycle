import Form, { FormProps } from "@/components/Form";

export default function form({entryDate, updateEntryDate, logOut}: FormProps) {
  return (<Form logOut={logOut} entryDate={entryDate} updateEntryDate={updateEntryDate}/>)
}