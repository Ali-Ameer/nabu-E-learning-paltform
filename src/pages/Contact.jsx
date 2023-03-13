import  { useState } from 'react'
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import React from 'react'
import { selectLanguageData } from '../features/langSlice';

export default function Contact() {
  const language = useSelector(state => selectLanguageData(state, "contact"))

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    const [msg, setMsg] = useState(null)
    const [err, setErr] = useState(null)

    const handleChange = (e) => {
      const {name, value} = e.target
      setFormData({...formData, [name]: value})
    }
    const handleSend = (e) => {
      e.preventDefault()
      if (formData.name.length > 3 && formData.email.length > 3 && formData.phone.length > 9 && formData.message.length > 3) {
        setErr(null)
        setMsg("done, fdaadf dfadfd fd fds fd")
      } else {
        setMsg(null)
        setErr("All input is required!")
      }
    } 
  return (
    <section className="flex flex-col md:flex-row gap-8 px-2 lg:px-28 my-4" id="contact">

      <div className="left w-full md:w-[40%] flex flex-col gap-6">
        <p className="text-base text-secondary font-medium text-start">
          {language?.pageName}
        </p>
        <h1 className="text-4xl lg:text-6xl text-primary font-bold">
        {language?.title}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 font-medium text-start">
        {language?.subTitle}
        </p>
        <div className="card flex flex-col gap-4 rounded-md drop-shadow-lg bg-white dark:bg-neutral-700 border border-gray-100 dark:border-neutral-700 items-start justify-center p-8 h-full">
          <h2 className="text-lg text-gray-800 dark:text-white font-medium mb-2">
          {language?.quickContact}
          </h2>
          <p className="text-gray-700 dark:text-white flex gap-2 items-center justify-center text-base font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8338ec" className="w-4 h-4">
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
          </svg>
          +123 456 789
          </p>
          <p className="text-gray-700 dark:text-white flex gap-2 items-center justify-center text-base font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8338ec" className="w-4 h-4">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
            nabu-contact@mail.com
          </p>
          <p className="text-gray-700 dark:text-white flex gap-2 items-center justify-center text-base font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8338ec" className="w-4 h-4">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
          </svg>
          24/7
          </p>
        </div>
      </div>

      <form onSubmit={e => handleSend(e)} className="right w-full md:w-[60%] flex flex-col gap-6 rounded-md drop-shadow-lg bg-white dark:bg-neutral-700 border border-gray-100 dark:border-neutral-700 items-start justify-center p-8">
      {err && ( 
            <p className="text-red-500 flex gap-2 items-start justify-start text-base font-medium">
            {language?.form.err}
            </p>
           )} 

        <label
          htmlFor="name"
          className="w-full flex flex-col gap-2 text-base text-gray-700 dark:text-white font-medium"
        >
          {language?.form.name}
          <input className="w-full bg-gray-200 dark:bg-neutral-800 p-2 rounded-md border border-gray-300 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary disabled:border-0 disabled:opacity-60"
            id="name"
            type="text"
            name="name"
            required
            onChange={e => handleChange(e)}
          />
        </label>
        
        <label
          htmlFor="email"
          className="w-full flex flex-col gap-2 text-base text-gray-700 dark:text-white font-medium"
        >
          {language?.form.email}
          <input className="w-full bg-gray-200 dark:bg-neutral-800 p-2 rounded-md border border-gray-300 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary disabled:border-0 disabled:opacity-60"
            id="email"
            type="email"
            name="email"
            required
            onChange={e => handleChange(e)}
          />
        </label>

        <label
          htmlFor="phone"
          className="w-full flex flex-col gap-2 text-base text-gray-700 dark:text-white font-medium"
        >
          {language?.form.phone}
          <input className="w-full bg-gray-200 dark:bg-neutral-800 p-2 rounded-md border border-gray-300 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary disabled:border-0 disabled:opacity-60"
            id="phone"
            type="tel"
            name="phone"
            required
            onChange={e => handleChange(e)}
          />
        </label>

        <label
          htmlFor="msg"
          className="w-full flex flex-col gap-2 text-base text-gray-700 dark:text-white font-medium"
        >
          {language?.form.message}
          <textarea className="w-full bg-gray-200 dark:bg-neutral-800 p-2 rounded-md border border-gray-300 dark:border-neutral-600 text-sm text-gray-700 dark:text-gray-300 font-medium placeholder:text-gray-400 outline-none focus:border-primary dark:focus:border-primary disabled:border-0 disabled:opacity-60"
            id="msg"
            name="message"
            cols="30"
            rows="3"
            required
            onChange={e => handleChange(e)}
          />
        </label>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Button title={language?.form.btn} type="primary"/>
           {msg && ( 
             <p className="text-green-500 flex gap-2 items-start justify-start text-base font-medium">
                {language?.form.msg}
             </p>
           )} 
           
        </div>
      </form>
    </section>
  );
}