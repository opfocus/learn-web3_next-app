function Search() {

  return (
    <div className="grow py-2  flex place-content-center ">
      <div className="grow p-2 flex  flex-row gap-2 items-center  px-2.5 rounded-full bg-gray-100 max-w-screen-sm" style={{ height: '100%' }} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-4 h-4 ">
          <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
        </svg>
        <input className="grow py-1 bg-inherit focus:outline-none " type="text" />
      </div>
    </div>
  )
}

export default Search


