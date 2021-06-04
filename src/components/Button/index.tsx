import React from 'react'
import { navigate } from 'gatsby'

export interface ButtonProps {
  /** Primary button or secondary */
  primary?: boolean
  /** Button Text */
  text?: string
  /** Type - link or button */
  isButton?: boolean
  /** If isButton === false, url is needed  */
  url?: string
  /** If internal === true, link will navigate, otherwise render as a hyperlink with _blank target  */
  internal?: boolean
  /** If Type===Link, url is needed  */
  action?: () => void
}

/** Component adds meta tags in head via react-helmet. Pass this component on every page and override values via props if needed */
const Button = ({ primary, text, isButton, url, internal, action }: ButtonProps) => {
  const primaryStyle = 'text-black bg-alkemy-orange'
  const secondaryStyle = 'text-white bg-alkemy-light-blue'
  const baseStyles = 'rounded-2xl px-6 py-3'
  return (
    <>
      {isButton ? (
        <button onClick={action} className={[baseStyles, primary ? primaryStyle : secondaryStyle].join(' ')}>
          {text}
        </button>
      ) : internal ? (
        <button
          onClick={() => navigate(url || '/')}
          className={[baseStyles, primary ? primaryStyle : secondaryStyle].join(' ')}
        >
          {text}
        </button>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={[baseStyles, primary ? primaryStyle : secondaryStyle].join(' ')}
        >
          {text}
        </a>
      )}
    </>
  )
}

export default Button
