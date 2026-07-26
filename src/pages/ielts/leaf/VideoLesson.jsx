import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import BackButton from '../../../components/BackButton'
import { api } from '../../../api'
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../../../utils/youtube'
import en from '../../../locales/en'
import uz from '../../../locales/uz'
import ru from '../../../locales/ru'

const langs = { en, uz, ru }

const CONFIGS = {
  listening: { backPath: '/ielts/listening' },
  reading:   { backPath: '/ielts/reading' },
  writing:   { backPath: '/ielts/writing' },
  speaking:  { backPath: '/ielts/speaking' },
}

function useLang() {
  const ctx = useOutletContext() || {}
  return ctx.lang || 'uz'
}

/* ── Fullscreen player overlay ── */
function VideoPlayerModal({ video, onClose }) {
  const videoId = extractYouTubeId(video.youtubeUrl)
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-white font-semibold text-sm line-clamp-1 pr-4">{video.title}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
          {videoId && (
            <iframe
              width="100%"
              height="100%"
              src={getYouTubeEmbedUrl(videoId)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Video card ── */
function VideoCard({ video, onPlay }) {
  const videoId = extractYouTubeId(video.youtubeUrl)
  return (
    <button
      onClick={() => onPlay(video)}
      className="text-left rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-video bg-gray-100 relative">
        {videoId && <img src={getYouTubeThumbnail(videoId)} alt={video.title} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#dc2626"><polygon points="9,7 18,12 9,17" /></svg>
          </div>
        </div>
      </div>
      <div className="p-3.5">
        <p className="font-bold text-[13px] text-gray-800 line-clamp-2 leading-snug">{video.title}</p>
        {video.description && <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">{video.description}</p>}
      </div>
    </button>
  )
}

/* ── Category page: fetches from backend, renders grid + player ── */
function VideoLessonsList({ category }) {
  const navigate = useNavigate()
  const lang = useLang()
  const t = (langs[lang] || langs.uz).ielts
  const config = CONFIGS[category]
  const [videos, setVideos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(null)

  useEffect(() => {
    let alive = true
    api.getVideoLessonsByCategory(category)
      .then((data) => { if (alive) setVideos(data) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [category])

  return (
    <div className="px-4 pt-6 pb-10 max-w-4xl mx-auto">
      <BackButton onClick={() => navigate(config.backPath)} className="mb-6" lang={lang} />

      <div className="mb-6">
        <h1 className="font-extrabold text-2xl leading-tight" style={{ color: '#dc2626' }}>
          {t.videoLessonsPage?.title || 'Video Lessons'}
        </h1>
        <p className="text-gray-500 text-sm mt-1.5">{t.sectionDescs?.[category]?.videoLessons}</p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-400 text-sm">{t.videoLessonsPage?.loading || '...'}</div>
      ) : videos.length === 0 ? (
        <div className="mt-4 px-6 py-10 rounded-2xl text-center" style={{ background: '#fff1f2', border: '1px solid #fecaca' }}>
          <p className="text-red-600 text-sm font-medium">{t.videoLessonsPage?.empty || t.comingSoon}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.map((v) => <VideoCard key={v.id} video={v} onPlay={setPlaying} />)}
        </div>
      )}

      {playing && <VideoPlayerModal video={playing} onClose={() => setPlaying(null)} />}
    </div>
  )
}

export function ListeningVideoLessons() { return <VideoLessonsList category="listening" /> }
export function ReadingVideoLessons()   { return <VideoLessonsList category="reading" /> }
export function WritingVideoLessons()   { return <VideoLessonsList category="writing" /> }
export function SpeakingVideoLessons()  { return <VideoLessonsList category="speaking" /> }
