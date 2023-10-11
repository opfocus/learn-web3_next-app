import Search from "./Search/Search"
import Account from "./account/accout"
import Image from "next/image"

function Header() {
  return (
    <div className="flex flex-row justify-between items-stretch gap-10 px-10 py-4">
      <div className="flex place-self-center">
        <Image
          src="/opt_full.png"
          alt="Quix log"
          width={80}
          height={40}
        />
      </div>
      <Search />
      <Account />
    </div>
  )
}

export default Header