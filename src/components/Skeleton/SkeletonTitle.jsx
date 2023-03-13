import React from "react"

export const SkeletonTitle = React.memo(() => {
  return (
    <div role="status" className="w-full animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[40%] mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <span className="sr-only">Loading...</span>
    </div>
    
  )
})