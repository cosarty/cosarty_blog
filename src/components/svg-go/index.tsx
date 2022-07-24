import React, { FC, useMemo } from 'react'
import { CSSProperties } from 'styled-components'
import { len } from '@/utils'

export interface SvaGoProps {
  icon?: string
  style?: CSSProperties
  className?: string
}

const SvgGo: FC<SvaGoProps> = ({ icon = '', style = {}, className = '' }) => {
  const styleRow = useMemo<CSSProperties>(() => {
    //TODO it is not rigorous here
    if (len(style)) {
      return style
    }

    return {
      width: '30px',
      height: '30px',
      fill: 'currentcolor',
      overflow: 'hidden'
    }
  }, [style])

  return (
    <>
      <svg className={className} style={styleRow} aria-hidden="true">
        <use xlinkHref={'#icon-' + icon}></use>
      </svg>
    </>
  )
}

export default SvgGo
