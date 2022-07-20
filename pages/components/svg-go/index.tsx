import React ,{FC,useMemo} from 'react'
import { CSSProperties } from 'styled-components'
import {len} from '@/utils'

export interface SvaGoProps {
  icon?: string,
  style?:CSSProperties
}

const SvgGo:FC<SvaGoProps> = ({icon="",style={}}) => {
  const styleRow = useMemo<CSSProperties>(() => {

    //TODO it is not rigorous here
    if (len(style)) {
      return style
    }

    return {
      width: '1em',
      height: '1em',
      fill: 'currentcolor',
      overflow:'hidden'
    }
  },[style])



  return (
    <>
      <svg
        style={styleRow}
        aria-hidden='true'>
        <use xlinkHref={'#icon-'+icon}></use>
      </svg>
    </>
  )
}


export default SvgGo