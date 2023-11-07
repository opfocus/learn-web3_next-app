function Search() {

  return (
    <div className="grow py-2  flex place-content-center ">
      <div className="grow p-2 flex  flex-row gap-2 items-center  px-2.5 rounded-full bg-gray-100 max-w-screen-sm" style={{ height: '100%' }} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input className="grow py-1 bg-inherit focus:outline-none " type="text" />
      </div>
    </div>
  )
}

export default Search


