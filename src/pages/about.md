---
/**
 * About Page
 *
 * A low-key personal intro - not a personal brand exercise.
 * Keeps it simple: who's behind this, what this place is, how to get in touch.
 */
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About | 37 Pencils" description="About this digital garden and the person tending it.">
  <div class="max-w-2xl mx-auto px-6 py-12">
    <header class="mb-10">
      <h1 class="text-3xl font-semibold text-ink mb-3">About</h1>
      <p class="text-ink-light">The gardener and the garden.</p>
    </header>

    <div class="prose prose-gray max-w-none space-y-8">
      <!-- The Garden -->
      <section>
        <h2 class="text-xl font-medium text-ink mb-3">What is this place?</h2>
        <p class="text-ink-light leading-relaxed">
          37 Pencils is a digital garden—a collection of ideas that grow over time.
          Unlike a traditional blog where posts are published and then forgotten,
          ideas here exist in different states of maturity and get tended to as
          thinking evolves.
        </p>
        <p class="text-ink-light leading-relaxed mt-3">
          Some thoughts are seedlings (fresh, possibly half-formed), others are growing
          (developing but not quite there), and a few are evergreen (relatively stable,
          though nothing is ever truly finished).
        </p>
      </section>
    
      <!-- The Gardener -->
      <section>
        <h2 class="text-xl font-medium text-ink mb-3">Who tends it?</h2>
        <p class="text-ink-light leading-relaxed">
          {/* Replace this placeholder with your own intro */}
          Hi, I'm John Haugaard, the person behind this garden. I'm interested in
          photography, poar-Bop jazz, odd thing I observe, and on, an on. I started this space to think out loud,
          connect ideas, and share what I'm learning and thnking along the way.
        </p>
        <p class="text-ink-light leading-relaxed mt-3">
          The name "37 Pencils": Well, sometimes you get an idea, and then it veers of in the most unusual directions. Suppose 				someone hears an anecdote about children in some countries are perhaps "entitled to" 37 pencils. And this, lead to 					ideas about US tariff policy, and this leads to an idea abot changing consumption patterns. You see, that is an idea 				that definitely grew sideways.
        </p>
      </section>
    
      <!-- Why this format -->
      <section>
        <h2 class="text-xl font-medium text-ink mb-3">Why a garden?</h2>
        <p class="text-ink-light leading-relaxed">
          Traditional blogs encourage performative writing—everything needs to be
          polished and complete before hitting publish. A digital garden inverts this.
          It's okay for ideas to be rough. It's okay to revisit and revise.
          The process of thinking is as valuable as the result.
        </p>
        <p class="text-ink-light leading-relaxed mt-3">
          Plus, I find the metaphor delightful. Ideas really do grow sideways,
          branch unexpectedly, and occasionally need pruning.
        </p>
      </section>
    
      <!-- Get in touch -->
      <section>
        <h2 class="text-xl font-medium text-ink mb-3">Say hello</h2>
        <p class="text-ink-light leading-relaxed">
          {/* Replace with your actual contact preferences */}
          The best way to reach me is - this info coming soon.
          I'm think I'll be happy to hear from fellow gardeners, or anyone who
          wants to discuss ideas that show up here. Yet to be determined.
        </p>
        <ul class="mt-4 space-y-2 text-ink-light">
          <li>
            <span class="text-ink-lighter">Email:</span>{' '}
            <a href="mailto:*****@**********.com" class="text-accent hover:underline">
              hello@example.com
            </a>
          </li>
          {/* Add more contact methods as needed */}
          {/*
          <li>
            <span class="text-ink-lighter">Twitter:</span>{' '}
            <a href="https://twitter.com/yourhandle" class="text-accent hover:underline">
              @yourhandle
            </a>
          </li>
          */}
        </ul>
      </section>
    
      <!-- Colophon (optional - nerdy details about how it's built) -->
      <section class="pt-8 border-t border-ink/10">
        <h2 class="text-sm font-medium text-ink-lighter uppercase tracking-wide mb-3">
          Colophon
        </h2>
        <p class="text-sm text-ink-lighter leading-relaxed">
          Built with <a href="https://astro.build" class="text-accent hover:underline">Astro</a>,
          styled with <a href="https://tailwindcss.com" class="text-accent hover:underline">Tailwind CSS</a>,
          and hosted on <a href="https://pages.cloudflare.com" class="text-accent hover:underline">Cloudflare Pages</a>.
          Search powered by <a href="https://pagefind.app" class="text-accent hover:underline">Pagefind</a>.
          Set in <a href="https://rsms.me/inter/" class="text-accent hover:underline">Inter</a>.
        </p>
      </section>
    </div>
  </div>
</BaseLayout>
