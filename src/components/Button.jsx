import { Link } from 'react-router-dom'

export default function Button({
  to,
  href,
  variant = 'primary',
  children,
  className = '',
  sweep,
  onClick,
  ...rest
}) {
  const withSweep = sweep ?? variant === 'primary'
  const cls = `btn btn-${variant} ${withSweep ? 'btn-sweep' : ''} ${className}`.trim()
  const content = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-arrow" aria-hidden="true">→</span>
    </>
  )

  if (href) {
    return (
      <a className={cls} href={href} {...rest}>
        {content}
      </a>
    )
  }

  if (to === '/contact') {
    return (
      <button
        className={cls}
        type="button"
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) window.dispatchEvent(new Event('teamworks:contact-open'))
        }}
        {...rest}
      >
        {content}
      </button>
    )
  }

  if (to) {
    return (
      <Link className={cls} to={to} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button className={cls} onClick={onClick} {...rest} type={rest.type || 'button'}>
      {content}
    </button>
  )
}
