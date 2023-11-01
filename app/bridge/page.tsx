import ViewAccout from "./components/viewAccout"
import BridgeOp from "./components/bridgeOp"
import TestnetToekn from "./components/testnetToekn"

function BridgePage() {

  return (
    <div className='flex justify-center px-5 h-screen bg-gray-200'>
      <div className="flex flex-col gap-6 pt-8  w-full max-w-md ">
        <ViewAccout />
        <BridgeOp />
        <TestnetToekn />
      </div>
    </div >
  )
}

export default BridgePage