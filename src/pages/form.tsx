import Form, { FormProps } from "@/components/Form";

export default function form({logOut, entryDate, updateEntryDate}: FormProps) {
  return (<Form logOut={logOut}  entryDate={entryDate} updateEntryDate={updateEntryDate}/>)
}