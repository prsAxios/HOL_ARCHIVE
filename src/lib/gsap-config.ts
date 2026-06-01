import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)

export { gsap, ScrollTrigger, ScrollSmoother, SplitText }

export function scrollTo(target: string | Element) {
  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(target, true)
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}
