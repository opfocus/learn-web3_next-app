import Search from "./Search/Search"
import Account from "./Account/Accout"
import Image from "next/image"

function Header() {
  return (
    <div className="flex flex-row justify-between gap-10 px-10 py-4">
      <Image
        src="/opt_full.png"
        alt="Quix log"
        width={65}
        height={40}
      />
      <Search />
      <Account />
    </div>
  )
}

export default Header