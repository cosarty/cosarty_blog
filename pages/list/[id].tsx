import { useRouter } from 'next/router'

const ListCom = () => {
  const { query } = useRouter()

  return (<>{query.id}</>)

}



export default ListCom