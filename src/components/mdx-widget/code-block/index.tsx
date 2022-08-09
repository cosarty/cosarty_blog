import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/duotoneDark'
import style from './code-block.module.scss'

const CodeBlock: React.FC<{ children: any }> = ({ children }) => {
  const code = children.props.children as string
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language="javascript">
      {({ className: cls, style: st, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${cls} ${style['de-pre']}`} style={st}>
          {tokens.map(
            (line, i) =>
              i !== tokens.length - 1 && (
                <div style={{ display: 'table-row' }} key={i} {...getLineProps({ line, key: i })}>
                  <span className={style['line-no']}>{i + 1}</span>
                  <span className={style['line-content ']}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              )
          )}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
