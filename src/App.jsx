import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Clapperboard,
  Download,
  Film,
  Play,
  RotateCcw,
  Sparkles,
  Wand2,
} from 'lucide-react'
import studioPreview from './assets/studio-preview.png'
import './App.css'

const stylePresets = [
  'Cinematic',
  'Product Reel',
  'Anime Trailer',
  'Social Ad',
  'Documentary',
]

const ratios = ['16:9', '9:16', '1:1']

const timeline = [
  { label: 'Script', width: '22%' },
  { label: 'Frames', width: '30%' },
  { label: 'Motion', width: '26%' },
  { label: 'Grade', width: '18%' },
]

function App() {
  const [prompt, setPrompt] = useState(
    'A sleek electric bike crossing a rain-lit Shanghai street, cinematic camera movement, warm reflections, premium product reveal',
  )
  const [style, setStyle] = useState(stylePresets[0])
  const [ratio, setRatio] = useState(ratios[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(72)
  const [version, setVersion] = useState(3)

  const frames = useMemo(
    () => [
      'Opening dolly shot',
      'Detail macro pass',
      'Hero reveal',
      'Closing brand beat',
    ],
    [],
  )

  function handleGenerate() {
    setIsGenerating(true)
    setProgress(12)
    setVersion((current) => current + 1)

    const marks = [26, 41, 58, 74, 88, 100]
    marks.forEach((mark, index) => {
      window.setTimeout(() => {
        setProgress(mark)
        if (mark === 100) {
          window.setTimeout(() => setIsGenerating(false), 420)
        }
      }, 360 * (index + 1))
    })
  }

  function handleReset() {
    setPrompt(
      'A sleek electric bike crossing a rain-lit Shanghai street, cinematic camera movement, warm reflections, premium product reveal',
    )
    setStyle(stylePresets[0])
    setRatio(ratios[0])
    setProgress(72)
    setVersion(3)
    setIsGenerating(false)
  }

  return (
    <main className="app-shell">
      <nav className="topbar" aria-label="Primary">
        <a className="brand" href="#top" aria-label="RexAIVideo home">
          <span className="brand-mark">R</span>
          <span>RexAIVideo</span>
        </a>
        <div className="nav-actions">
          <a href="#studio">Studio</a>
          <a href="#workflow">Workflow</a>
          <button className="icon-button" aria-label="Open demo reel">
            <Play size={18} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Static AI video studio mockup
          </p>
          <h1>RexAIVideo</h1>
          <p className="hero-lede">
            Turn a scene idea into a polished video direction board. This demo is
            fully static, frontend-only, and designed for GitHub Pages.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#studio">
              Start composing
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="secondary-action" href="#workflow">
              View workflow
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="AI video studio preview">
          <img src={studioPreview} alt="" />
          <div className="preview-plaque">
            <Film size={18} aria-hidden="true" />
            <span>Draft v{version}</span>
          </div>
        </div>
      </section>

      <section className="studio" id="studio" aria-labelledby="studio-title">
        <div className="section-heading">
          <p className="eyebrow">
            <Clapperboard size={16} aria-hidden="true" />
            Generator
          </p>
          <h2 id="studio-title">Compose a video brief</h2>
        </div>

        <div className="studio-grid">
          <form className="composer" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="prompt">Prompt</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows="7"
            />

            <div className="control-row">
              <fieldset>
                <legend>Style</legend>
                <div className="segmented">
                  {stylePresets.map((preset) => (
                    <button
                      className={preset === style ? 'active' : ''}
                      key={preset}
                      onClick={() => setStyle(preset)}
                      type="button"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend>Aspect</legend>
                <div className="segmented compact">
                  {ratios.map((item) => (
                    <button
                      className={item === ratio ? 'active' : ''}
                      key={item}
                      onClick={() => setRatio(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="button-row">
              <button className="generate-button" onClick={handleGenerate} type="button">
                <Wand2 size={18} aria-hidden="true" />
                {isGenerating ? 'Generating' : 'Generate preview'}
              </button>
              <button className="reset-button" onClick={handleReset} type="button">
                <RotateCcw size={18} aria-hidden="true" />
                Reset
              </button>
            </div>
          </form>

          <aside className="result-panel" aria-label="Generated preview status">
            <div className="video-frame">
              <img src={studioPreview} alt="RexAIVideo generated video preview" />
              <button className="play-button" aria-label="Play generated preview">
                <Play size={24} fill="currentColor" aria-hidden="true" />
              </button>
              <div className="scanline" />
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>{isGenerating ? 'Rendering frames' : 'Preview ready'}</span>
                <strong>{progress}%</strong>
              </div>
              <div className="progress-track" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="result-meta">
              <span>{style}</span>
              <span>{ratio}</span>
              <span>8 sec</span>
              <button aria-label="Download static preview">
                <Download size={17} aria-hidden="true" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="workflow" id="workflow" aria-label="Static video workflow">
        <div className="workflow-copy">
          <p className="eyebrow">
            <Film size={16} aria-hidden="true" />
            Timeline
          </p>
          <h2>Every generated idea lands as an editable plan.</h2>
        </div>
        <div className="timeline">
          {timeline.map((item, index) => (
            <div className="timeline-item" key={item.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.label}</strong>
              <i style={{ width: item.width }} />
            </div>
          ))}
        </div>
        <div className="frame-list">
          {frames.map((frame) => (
            <article key={frame}>
              <span />
              <p>{frame}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
