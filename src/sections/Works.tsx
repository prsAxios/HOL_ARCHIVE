import { motion } from 'framer-motion'
import { rooms, type Room } from '../data/rooms'

interface WorksProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
  onSelectRoom: (id: string) => void
}

export default function Works({ onSelectRoom }: WorksProps) {
  return (
    <section
      id="works"
      style={{
        backgroundColor: '#ffffff',
        padding: '120px clamp(24px, 5vw, 80px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '80px',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            paddingBottom: '32px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#0a0a0a',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Curated Portfolio
          </h2>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#999999',
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '10px'
            }}
          >
            ({rooms.length} Projects)
          </span>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 500px), 1fr))',
            gap: '64px',
          }}
        >
          {rooms.map((room, i) => (
            <RoomCard
              key={room.id}
              room={room}
              index={i}
              onClick={() => onSelectRoom(room.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoomCard({
  room,
  index,
  onClick,
}: {
  room: Room
  index: number
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index % 2 * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        textAlign: 'left',
        display: 'block',
        position: 'relative',
      }}
      className="group"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/5',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          marginBottom: '32px',
        }}
      >
        <motion.img
          src={room.img}
          alt={room.title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div 
          className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" 
        />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.25em',
              color: '#999999',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'block',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            {room.id} &middot; {room.client}
          </span>
          <h3
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#0a0a0a',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              fontFamily: 'Playfair Display, serif',
            }}
          >
            {room.title}
          </h3>
        </div>
        <motion.div
          whileHover={{ x: 5 }}
          style={{
            fontSize: '14px',
            color: '#0a0a0a',
            marginTop: '28px'
          }}
        >
          &rarr;
        </motion.div>
      </div>
    </motion.div>
  )
}
