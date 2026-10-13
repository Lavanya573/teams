import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSeo } from '../hooks/useSeo'
import { articles, blogCategories } from '../data/blog'
import CtaBand from '../components/CtaBand'
import TextReveal from '../components/TextReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const reduced = usePrefersReducedMotion()
  useSeo({
    title: 'Blog | Teamworks Creative Solutions',
    description: 'Stories, strategies and creative thinking from the Teamworks team.',
    path: '/blog',
  })
  const visibleArticles = activeCategory === 'All'
    ? articles
    : articles.filter((article) => article.category === activeCategory)

  return (
    <>
      <section className="page-hero blog-hero">
        <div className="container">
          <motion.p
            className="blog-kicker"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Insights &amp; ideas
          </motion.p>
          <TextReveal as="h1" className="display blog-title" text="Blog." />
          <motion.p
            className="lead"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Stories, strategies and creative thinking from the Teamworks team.
          </motion.p>
        </div>
      </section>

      <section className="section-tight" aria-label="Teamworks articles">
        <div className="container">
          <div className="blog-filters" role="group" aria-label="Filter articles by category">
            {blogCategories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{visibleArticles.length} articles shown</p>
          <div className="blog-grid">
            <AnimatePresence mode="popLayout">
              {visibleArticles.map((article, index) => (
                <motion.a
                layout={!reduced}
                className="blog-card"
                href={article.url}
                key={article.slug}
                target="_blank"
                rel="noopener noreferrer"
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: reduced ? 0 : Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
              >
                  <figure className="blog-card-image">
                    <img src={article.image} alt="" loading="lazy" decoding="async" />
                    <span>{article.category}</span>
                  </figure>
                  <div className="blog-card-body">
                    <p className="blog-card-meta">{article.date} <span aria-hidden="true">/</span> {article.readTime}</p>
                    <h2>{article.title}</h2>
                    <span className="blog-card-link">Read article <span aria-hidden="true">→</span></span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
          {visibleArticles.length === 0 && <p className="muted">More stories are coming soon.</p>}
        </div>
      </section>
      <CtaBand />
    </>
  )
}