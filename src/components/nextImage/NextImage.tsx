'use client'

export default function NexImage({handlerAction}: {handlerAction: () => void})  {
  return (
    <button
      onClick={handlerAction}
      className="opacity-40 absolute right-[3px] top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-[3px] shadow-md cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
           stroke="grey">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}