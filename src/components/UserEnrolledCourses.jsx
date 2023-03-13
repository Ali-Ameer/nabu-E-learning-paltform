import { CourseCard } from './CourseCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserCourse, selectUserData, setUser } from '../features/userSlice'
import { useUpdateUserMutation } from '../services/UserApi'
import { useState } from 'react'

export default function UserEnrolledCourses() {
  const [updateUser] = useUpdateUserMutation()
  const userData = useSelector(selectUserData)
  const userCourse = useSelector(selectUserCourse)

  const dispatch = useDispatch()
  const [msg, setMsg] = useState(null)

  const handleDelete = (id) => {
    const filterCourses = userCourse.filter(c => c._id !== id);
    const {courses, ...data} = userData
    updateUser({id: userData._id, courses: filterCourses}).unwrap()
    .then(res => {
      dispatch(setUser({data: {courses: filterCourses, ...data}, loggedIn: true}))
    })
    .catch( err => {setMsg("something went wrong please try again later!")})
  }
  return (
    <section className="w-full min:h-h-[calc(100vh-90px)] p-2 bg-white border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 rounded-md drop-shadow-lg grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {msg && <p>{msg}</p>}

        {userCourse?.map(c => 
        <div className='relative' key={c._id}>
          <div className='absolute top-1 right-1 z-20 p-1 rounded-full bg-opacity-50 dark:bg-opacity-50 bg-white dark:bg-neutral-800 hover:cursor-pointer' onClick={() => handleDelete(c._id)}>
          <img alt="delete" className='w-6 h-6 drop-shadow-md'
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmZjAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMTAuNjY2NjcsMTAuNjY2NjcpIj48cGF0aCBkPSJNMTAsMmwtMSwxaC02djJoMTh2LTJoLTZsLTEsLTF6TTQuMzY1MjMsN2wxLjUyNzM0LDEzLjI2MzY3YzAuMTMyLDAuOTkgMC45ODQ0MiwxLjczNjMzIDEuOTgyNDIsMS43MzYzM2g4LjI0ODA1YzAuOTk4LDAgMS44NTEzOCwtMC43NDUxNCAxLjk4NDM4LC0xLjc0NDE0bDEuNTI3MzQsLTEzLjI1NTg2eiI+PC9wYXRoPjwvZz48L2c+Cjwvc3ZnPg=="/>
          </div>
        <CourseCard img={c.image} title={c.title} category={c.category} rating={c.rating} id={c._id} delete={true}/>
        </div>
        
        )}

        {userData.length === 0 && <p>you don't have any course</p>}
    </section>
  )
}
