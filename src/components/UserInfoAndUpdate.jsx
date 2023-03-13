import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLanguageData } from '../features/langSlice';
import { selectUserData, setUser } from '../features/userSlice';
import { useUpdateUserMutation } from '../services/UserApi';
import Button from "./Button";

export default function UserInfoAndUpdate() {
    const [updateUser, {isLoading, isError} ] = useUpdateUserMutation()
    const language = useSelector(selectLanguageData(state, "account"))
    const userData = useSelector(selectUserData)

    const dispatch = useDispatch()
    const [editableInput, setEditableInput] = useState(null);
    const [msg, setMsg] = useState(null);
    const [formValues, setFormValues] = useState({ 
      name: userData?.name, username: userData?.username, email: userData?.email
      });

    function handleInputChange(event) {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    }

    const handleEdit = (input) => {
      setEditableInput(input);
    };

    const handleUpdate = () => {
      setMsg(null)
        if (formValues.name !== userData?.name || formValues.username !== userData?.username || formValues.email !== userData?.email) {
          updateUser({id: userData?._id, ...formValues}).unwrap()
          .then(res => {
            const {message, ...data} = res
            dispatch(setUser({data, loggedIn: true}))
          }).catch(err => setMsg(err.data.message))
        } else {
          setMsg("please make some change first!")
        }
    }
  return (
    <section className='w-full min:h-h-[calc(100vh-90px)] p-2 bg-white border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 rounded-md drop-shadow-lg flex flex-col items-center justify-center'>
        <img src={userData?.image} alt="user" 
        className='w-32 h-32 rounded-full object-cover object-center drop-shadow-md'/>
        <p className='text-base text-gray-600 dark:text-gray-300 font-medium mt-4'>
          {language?.enrolledCourses} { userData?.courses?.length}
        </p>

        <div className="w-full flex gap-4 md:px-12 mt-6 justify-between items-center">
          <div className="mb-4 w-full relative ">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
                htmlFor="name" >
                {language?.name}
              </label>
              <div className="relative"  dir="ltr">
                <input type="text" id="name" name="name" className="pr-10 w-full bg-gray-200 dark:bg-neutral-700 p-3 rounded-md border border-gray-400 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary disabled:border-0 disabled:opacity-60" defaultValue={userData?.name} onChange={e => handleInputChange(e)} disabled={editableInput === "name" ? false : true}/>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600 dark:text-gray-300 font-medium hover:cursor-pointer" onClick={() => handleEdit("name")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
              </svg>
                </span>
              </div>
          </div>
          <div className="mb-4 w-full relative ">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
                htmlFor="username" >
                {language?.username}
              </label>
              <div className="relative" dir="ltr">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-300 font-medium pointer-events-none">
                  @
                </span>
                <input type="text" id='username' name="username" className="px-10 w-full bg-gray-200 dark:bg-neutral-700 p-3 rounded-md border border-gray-400 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary disabled:border-0 disabled:opacity-60" defaultValue={userData?.username}  onChange={e => handleInputChange(e)} disabled={editableInput === "username" ? false : true}/>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600 dark:text-gray-300 font-medium hover:cursor-pointer" onClick={() => handleEdit("username")} >
                <svg xmlns="http://www.w3.org/2000/svg" className="" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
              </svg>
                </span>
              </div>
          </div>

        </div>
        <div className="w-full flex gap-4 md:px-12 mt-4 justify-between items-center">
        <div className="mb-4 w-full relative ">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
                htmlFor="email" >
                {language?.email}
              </label>
              <div className="relative"  dir="ltr">
                <input type="text" id="email" name='email' className="pr-10 w-full bg-gray-200 dark:bg-neutral-700 p-3 rounded-md border border-gray-400 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary disabled:border-0 disabled:opacity-60" defaultValue={userData?.email} onChange={e => handleInputChange(e)} disabled={editableInput === "email" ? false : true}/>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600 dark:text-gray-300 font-medium hover:cursor-pointer" onClick={() => handleEdit("email")} >
                <svg xmlns="http://www.w3.org/2000/svg" className="" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
              </svg>
                </span>
              </div>
          </div>
        <div className="mb-4 w-full relative ">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
                htmlFor="role" >
                {language?.role}
              </label>
              <div className="relative" dir="ltr">
                <input type="text" id="role" name="role" className="w-full bg-gray-200 dark:bg-neutral-700 p-3 rounded-md border border-gray-400 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary disabled:border-0 disabled:opacity-60" defaultValue={userData?.role} disabled/>
              </div>
          </div>
        </div>
        
          <div className="w-full flex gap-4 md:px-12 justify-start items-center">
            {(msg || isError) && <p className="font-medium text-red-600">{msg}</p> }
          </div>
          {editableInput !== null &&
          <div className="w-full flex gap-4 md:px-12 mt-6 justify-start items-center">
            <Button title={isLoading ? "loading.." : language.btnApply} type="primary" onClick={handleUpdate}/>
            <Button title={language.btnCancel} onClick={() => {handleEdit(null), setMsg(null)}}/>
          </div>
          }
    </section>
  )
}
