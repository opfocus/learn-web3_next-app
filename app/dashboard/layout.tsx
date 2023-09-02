import React from "react"

function DashboardLayout(
  { children }: { children: React.ReactNode }) {
  return (
    <div>
      <h4>layout here:</h4>
      {children}
    </div>
  )
}

export default DashboardLayout