import React ,{FC,useMemo} from 'react'
import { CSSProperties } from 'styled-components'


export interface SvaGoProps {
  icon: string,
  style:CSSProperties
}

const SvgGo:FC<SvaGoProps> = ({icon="",style={}}) => {
  const styleRow = useMemo<CSSProperties>(() => {

    Object.keys(style)
  const 
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

    return style
  },[style])



  return (
    <>
     <div>

     </div>
    
      <svg
        style={styleRow}
        aria-hidden='true'>
        <use xlinkHref={'#icon-'+icon}></use>
</svg>
    </>
  )
}


export default SvgGo