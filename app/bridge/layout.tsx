function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h4>product layout here:</h4>
      {children}
    </div>
  )
}

export default ProductLayout