export const easeOut = [0.22, 1, 0.36, 1]
export const easeUi = [0.2, 0.7, 0.2, 1]

export const viewportOnce = { once: true, amount: 0.16, margin: '0px 0px -8% 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, delay, ease: easeOut },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: easeOut } },
}

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
}

export const clipReveal = {
  hidden: { clipPath: 'inset(12% 0 12% 0)', opacity: 0.7 },
  show: {
    clipPath: 'inset(0% 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.85, ease: easeOut },
  },
}

export const pageFade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, ease: easeOut } },
}
