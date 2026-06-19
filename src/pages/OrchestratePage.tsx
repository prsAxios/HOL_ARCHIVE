import { useNavigate } from 'react-router'
import OrchestrateNumbers from '../sections/OrchestrateNumbers'

export default function OrchestratePage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh' }}>


      <OrchestrateNumbers />
    </div>
  )
}
