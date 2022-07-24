const H1 = (props: any) => {
  console.log('props: ', props)

  return (
    <>
      <h1 {...props}></h1>
    </>
  )
}

export default H1
