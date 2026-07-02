import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { PROJECTS } from '../data/projects'

// Define the Archive Node interface
export interface ArchiveNode {
  id: string
  name: string
  type: 'folder' | 'file'
  fileType?: 'pdf' | 'doc' | 'xls' | 'jpg' | 'png' | 'txt' | 'lnk'
  size: string
  content?: string
  projectId?: string
  iconPath: string // Must be "/images/SVG/Folder.svg"
  children?: ArchiveNode[]
  modifiedDate?: string
  author?: string
}

export default function ArchiveExplorer() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Window states (Minimize, Maximize)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(true)

  // Mobile sidebar overlay drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Dropdown menu state
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Custom notification toast system
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showNotification = (title: string, desc: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToast({ title, desc })
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null)
    }, 4000)
  }

  // Active Directory Path (e.g. ['c:', 'Archive', 'Hospitality'])
  const [path, setPath] = useState<string[]>(['c:', 'Archive'])
  // Track selections
  const [selectedId, setSelectedId] = useState<string | null>(null)
  // Search text
  const [searchQuery, setSearchQuery] = useState<string>('')
  // View mode: 'grid' or 'list'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  // Navigation history
  const [history, setHistory] = useState<string[][]>([['c:', 'Archive']])
  const [historyIndex, setHistoryIndex] = useState<number>(0)
  // Preview File state
  const [previewFile, setPreviewFile] = useState<ArchiveNode | null>(null)

  // Double Click tracking
  const lastClickRef = useRef<{ id: string; time: number } | null>(null)

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Node consolidation logic
  const archiveData = useMemo<ArchiveNode>(() => {
    // 1. Convert Hospitality projects (mumbai-01, london-01, jaipur-01)
    const hospitalityNodes: ArchiveNode[] = PROJECTS.filter(p => p.category === 'Hospitality').map((proj): ArchiveNode => ({
      id: `proj-dir-${proj.id}`,
      name: proj.title,
      type: 'folder' as const,
      iconPath: '/images/SVG/Folder.svg',
      modifiedDate: `${proj.year}-06-15`,
      author: 'HOL Hospitality',
      size: '2.5 MB',
      children: [
        {
          id: `proj-brief-${proj.id}`,
          name: 'Operational_Brief.txt',
          type: 'file' as const,
          fileType: 'txt',
          size: `${Math.ceil(proj.description.length / 1024)} KB`,
          iconPath: 'Images/svg/File.svg',
          modifiedDate: `${proj.year}-06-15`,
          author: 'Lead Producer',
          content: `PROJECT BRIEF: ${proj.title}\n\nLocation: ${proj.city}, ${proj.country}\nCategory: ${proj.category}\nDetails: ${proj.subtitle}\nYear: ${proj.year}\n\nDESCRIPTION:\n${proj.description}\n\n---\nHOL Structured Operations\nPredictability. Reusability. Real-time Control.`
        },
        {
          id: `proj-specs-${proj.id}`,
          name: 'Technical_Specifications.pdf',
          type: 'file' as const,
          fileType: 'pdf',
          size: '1.2 MB',
          iconPath: 'Images/svg/File.svg',
          modifiedDate: `${proj.year}-06-18`,
          author: 'Technical Director',
          content: `HOL TECHNICAL ARCHITECTURE BLUEPRINT\n\nPROJECT: ${proj.title}\nSYSTEM CODE: HOL-OP-${proj.id.toUpperCase()}\n\nLOGISTICAL ANALYSIS:\n- Guest Flow Design: Optimised for ${proj.subtitle.split('·')[1]?.trim() || 'maximum occupancy'}\n- Entry / Exit Matrices: Structured queuing with 15-minute load windows\n- Space Allocations: Full spatial analysis verified on CAD\n- Power Redundancies: A/B system grid separation\n- Latency Tolerances: Zero setup delay guidelines enforced\n\nAPPROVAL SECURED: True\nDEPARTMENT: HOL Engineering`
        },
        {
          id: `proj-link-${proj.id}`,
          name: 'View_Interactive_Report.lnk',
          type: 'file' as const,
          fileType: 'lnk',
          size: '1 KB',
          iconPath: 'Images/svg/File.svg',
          modifiedDate: `${proj.year}-06-20`,
          author: 'System',
          projectId: proj.id,
          content: `SHORTCUT LINK\nTarget: /work/${proj.id}\nType: Interactive Case Study Webpage\n\nDouble-click to open this project's dedicated visual page.`
        }
      ]
    }))

    // 2. Convert Operations projects (delhi-01, singapore-01) + templates
    const operationsNodes: ArchiveNode[] = [
      ...PROJECTS.filter(p => p.category === 'Operations').map((proj): ArchiveNode => ({
        id: `proj-dir-${proj.id}`,
        name: proj.title,
        type: 'folder' as const,
        iconPath: '/images/SVG/Folder.svg',
        modifiedDate: `${proj.year}-06-15`,
        author: 'HOL Operations',
        size: '1.8 MB',
        children: [
          {
            id: `proj-brief-${proj.id}`,
            name: 'Operational_Brief.txt',
            type: 'file' as const,
            fileType: 'txt',
            size: `${Math.ceil(proj.description.length / 1024)} KB`,
            iconPath: 'Images/svg/File.svg',
            modifiedDate: `${proj.year}-06-15`,
            author: 'Lead Producer',
            content: `PROJECT BRIEF: ${proj.title}\n\nLocation: ${proj.city}, ${proj.country}\nCategory: ${proj.category}\nDetails: ${proj.subtitle}\nYear: ${proj.year}\n\nDESCRIPTION:\n${proj.description}`
          },
          {
            id: `proj-specs-${proj.id}`,
            name: 'Technical_Specifications.pdf',
            type: 'file' as const,
            fileType: 'pdf',
            size: '1.1 MB',
            iconPath: 'Images/svg/File.svg',
            modifiedDate: `${proj.year}-06-18`,
            author: 'Technical Director',
            content: `HOL TECHNICAL ARCHITECTURE BLUEPRINT\n\nPROJECT: ${proj.title}\nSYSTEM CODE: HOL-OP-${proj.id.toUpperCase()}`
          }
        ]
      })),
      {
        id: 'ros-core',
        name: 'Run_of_Show_Core.doc',
        type: 'file' as const,
        fileType: 'doc',
        size: '450 KB',
        iconPath: 'Images/svg/File.svg',
        modifiedDate: '2024-03-01',
        author: 'Production Dept',
        content: `HOL RUN-OF-SHOW MASTER TEMPLATE\n\nTime (Local) | Event Phase | Technical Lead | Hospitality Lead | Status\n------------ | ----------- | -------------- | ---------------- | -------\n08:00        | Site Open   | Power verify   | Catering setup   | Ready\n09:00        | Tech Check  | Sound/Light DB | Artist sound check| -\n18:00        | Doors Open  | Ambient state  | Welcome drink     | -\n19:00        | Main Act    | Show Cue 01    | Dinner service   | -`
      },
      {
        id: 'flow-model',
        name: 'Pedestrian_Flow_Model.xls',
        type: 'file' as const,
        fileType: 'xls',
        size: '1.5 MB',
        iconPath: 'Images/svg/File.svg',
        modifiedDate: '2024-03-04',
        author: 'Crowd Specialist',
        content: `CROWD FLOW DENSITY PREDICTIVE MODEL\n\nArea Size: 500 sqm\nDesign limit: 450 guests (Density: 1.1 sqm per guest - Category A Comfort)\n\nChoke Point Analysis:\n- Registration Desk: Max processing time 45 seconds per guest.\n- Main Foyer Entrance: Two double doors (3.6m width).`
      }
    ]

    // 3. Convert Logistics projects (dubai-01) + blueprints
    const logisticsNodes: ArchiveNode[] = [
      ...PROJECTS.filter(p => p.category === 'Logistics').map((proj): ArchiveNode => ({
        id: `proj-dir-${proj.id}`,
        name: proj.title,
        type: 'folder' as const,
        iconPath: '/images/SVG/Folder.svg',
        modifiedDate: `${proj.year}-06-15`,
        author: 'HOL Logistics',
        size: '2.0 MB',
        children: [
          {
            id: `proj-brief-${proj.id}`,
            name: 'Operational_Brief.txt',
            type: 'file' as const,
            fileType: 'txt',
            size: `${Math.ceil(proj.description.length / 1024)} KB`,
            iconPath: 'Images/svg/File.svg',
            modifiedDate: `${proj.year}-06-15`,
            author: 'Lead Producer',
            content: `PROJECT BRIEF: ${proj.title}\n\nLocation: ${proj.city}, ${proj.country}\nCategory: ${proj.category}\nDetails: ${proj.subtitle}`
          }
        ]
      })),
      {
        id: 'venice-registry',
        name: 'Venice Registry',
        type: 'folder' as const,
        iconPath: '/images/SVG/Folder.svg',
        modifiedDate: '2024-05-12',
        author: 'Logistics Division',
        size: '4.3 MB',
        children: [
          {
            id: 'specs-venice',
            name: 'Venice_Registry_Specs.pdf',
            type: 'file' as const,
            fileType: 'pdf',
            size: '2.4 MB',
            iconPath: 'Images/svg/File.svg',
            modifiedDate: '2024-05-12',
            author: 'J. Vanhoutte',
            content: `CASE STUDY: VENICE REGISTRY WATER OPERATIONS\n\nCHALLENGE: Water-Only Venue Access\n\nSOLVED PROTOCOL:\n1. Fleet Deployment: 15 vintage mahogany boats with synchronized marine radio.\n2. Pier Slots: Assigned 6-minute window intervals to prevent canal congestion.`
          },
          {
            id: 'dock-schedules',
            name: 'Dock_Schedules.xls',
            type: 'file' as const,
            fileType: 'xls',
            size: '1.1 MB',
            iconPath: 'Images/svg/File.svg',
            modifiedDate: '2024-05-14',
            author: 'Logistics Coordinator',
            content: `DOCK SCHEDULES & TIDAL HEIGHT CORRECTIONS\n\nBoat ID  | Pier Slot A | Pier Slot B | Status\n-------- | ----------- | ----------- | -------\nMH-01    | 14:00 - 14:06| 14:18 - 14:24| Active\nMH-02    | 14:06 - 14:12| 14:24 - 14:30| Active`
          }
        ]
      },
      {
        id: 'alpine-altitude',
        name: 'Alpine Altitude',
        type: 'folder' as const,
        iconPath: '/images/SVG/Folder.svg',
        modifiedDate: '2024-01-22',
        author: 'Engineering Division',
        size: '7.6 MB',
        children: [
          {
            id: 'heli-load',
            name: 'Heli_Load_Calculations.pdf',
            type: 'file' as const,
            fileType: 'pdf',
            size: '4.8 MB',
            iconPath: 'Images/svg/File.svg',
            modifiedDate: '2024-01-22',
            author: 'Structural Eng.',
            content: `HIGH-ELEVATION PAYLOAD ENGINEERING REPORT\n\nAltitude: 2,050 meters above sea level\nStructure Type: Tensioned Hexagonal Dome\n\nEurocopter AS350 B3: external load max 900kg.`
          }
        ]
      },
      {
        id: 'silk-road',
        name: 'The Silk Road',
        type: 'folder' as const,
        iconPath: '/images/SVG/Folder.svg',
        modifiedDate: '2023-09-05',
        author: 'Logistics Division',
        size: '5.6 MB',
        children: [
          {
            id: 'border-logistics',
            name: 'Border_Logistics_Flowchart.pdf',
            type: 'file' as const,
            fileType: 'pdf',
            size: '3.5 MB',
            iconPath: 'Images/svg/File.svg',
            modifiedDate: '2023-09-05',
            author: 'Cross-Border Lead',
            content: `SILK ROAD OPERATIONAL ROUTING MATRIX\n\nCross-border supply chain flow:\n[Factory (Shenzhen)] -> [Trucking (Kazakhstan)] -> [Flight (Baku)]`
          }
        ]
      }
    ]

    // 4. Convert security + templates into Miscellaneous
    const miscellaneousNodes: ArchiveNode[] = [
      {
        id: 'budget-luxury',
        name: 'Budget_Schedules_Luxury.xls',
        type: 'file',
        fileType: 'xls',
        size: '950 KB',
        iconPath: 'Images/svg/File.svg',
        modifiedDate: '2024-03-10',
        author: 'Financial Lead',
        content: `LUXURY PROJECT BUDGET TEMPLATE & MARGIN ANALYSIS\n\nCost Centers:\n- Bespoke Fabrication\n- White-glove Hospitality\n- Operational Operations\n\n*Pricing Guideline: Maintenance margin of 35% across all outsourced sub-contracts.`
      },
      {
        id: 'gdpr-client',
        name: 'GDPR_Client_Data_Protocol.pdf',
        type: 'file',
        fileType: 'pdf',
        size: '1.1 MB',
        iconPath: 'Images/svg/File.svg',
        modifiedDate: '2024-10-15',
        author: 'Privacy Officer',
        content: `CLIENT INFORMATION SECURITY & GDPR POLICY\n\nAll high-profile guest lists and flight coordinates must:\n1. Be stored on encrypted databases with AES-256 standard.\n2. Be purged from local staff devices within 7 days of event teardown.`
      },
      {
        id: 'nda-form',
        name: 'Bespoke_Client_NDA_Form.doc',
        type: 'file',
        fileType: 'doc',
        size: '540 KB',
        iconPath: 'Images/svg/File.svg',
        modifiedDate: '2024-10-18',
        author: 'Legal Counsel',
        content: `NON-DISCLOSURE AGREEMENT (STANDARD HIGH-PROFILE TEMPLATE)\n\nContract Terms:\n- No photography or social media posts allowed on-site by staff or subcontractors.`
      },
      {
        id: 'sat-comms',
        name: 'Secondary_Satellite_Comms.doc',
        type: 'file',
        fileType: 'doc',
        size: '720 KB',
        iconPath: 'Images/svg/File.svg',
        modifiedDate: '2024-10-25',
        author: 'Comms Lead',
        content: `CRITICAL COMMUNICATIONS FAILSAFE PROTOCOLS\n\nPrimary Net: Motorola VHF hand-held radio net on Channel 72.\nSecondary Net: Satellite-linked text terminals (Garmin InReach).`
      }
    ]

    return {
      id: 'root',
      name: 'Archive',
      type: 'folder',
      iconPath: '/images/SVG/Folder.svg',
      size: '29.3 MB',
      children: [
        {
          id: 'hospitality',
          name: 'Hospitality',
          type: 'folder',
          iconPath: '/images/SVG/Folder.svg',
          modifiedDate: '2024-06-15',
          author: 'HOL Operations',
          size: '7.5 MB',
          children: hospitalityNodes
        },
        {
          id: 'operations',
          name: 'Operations',
          type: 'folder',
          iconPath: '/images/SVG/Folder.svg',
          modifiedDate: '2024-06-15',
          author: 'HOL Operations',
          size: '6.8 MB',
          children: operationsNodes
        },
        {
          id: 'logistics',
          name: 'Logistics',
          type: 'folder',
          iconPath: '/images/SVG/Folder.svg',
          modifiedDate: '2024-06-15',
          author: 'HOL Operations',
          size: '12.5 MB',
          children: logisticsNodes
        },
        {
          id: 'miscellaneous',
          name: 'Miscellaneous',
          type: 'folder',
          iconPath: '/images/SVG/Folder.svg',
          modifiedDate: '2024-06-15',
          author: 'HOL Operations',
          size: '2.5 MB',
          children: miscellaneousNodes
        }
      ]
    }
  }, [])

  // Get current active directory node based on the path
  const currentDirectoryNode = useMemo(() => {
    let node: ArchiveNode = archiveData
    const relativePath = path.slice(2)
    
    for (const segment of relativePath) {
      if (node.children) {
        const found = node.children.find(child => child.name === segment && child.type === 'folder')
        if (found) {
          node = found
        }
      }
    }
    return node
  }, [path, archiveData])

  // Get files & folders in the active directory, filtered by search query
  const displayedItems = useMemo(() => {
    if (!currentDirectoryNode.children) return []
    return currentDirectoryNode.children.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [currentDirectoryNode, searchQuery])

  // Compute folder metrics for bottom status bar
  const metrics = useMemo(() => {
    if (!currentDirectoryNode.children) return { count: 0, size: '0 KB' }
    
    let totalKb = 0
    let filesCount = 0
    let foldersCount = 0

    currentDirectoryNode.children.forEach(item => {
      if (item.type === 'file') {
        filesCount++
        const sizeStr = item.size
        if (sizeStr.includes('MB')) {
          totalKb += parseFloat(sizeStr) * 1024
        } else if (sizeStr.includes('KB')) {
          totalKb += parseFloat(sizeStr)
        }
      } else {
        foldersCount++
      }
    })

    const sizeDisplay = totalKb >= 1024 
      ? `${(totalKb / 1024).toFixed(1)} MB` 
      : `${totalKb} KB`
      
    const folderText = foldersCount > 0 ? `${foldersCount} folder(s)` : ''
    const fileText = filesCount > 0 ? `${filesCount} file(s)` : ''
    
    return {
      count: currentDirectoryNode.children.length,
      detail: [folderText, fileText].filter(Boolean).join(', ') || '0 objects',
      size: sizeDisplay
    }
  }, [currentDirectoryNode])

  // Sidebar navigation root items
  const sidebarFolders = useMemo(() => {
    return archiveData.children || []
  }, [archiveData])

  // Navigation handlers
  const navigateToPath = (newPath: string[]) => {
    setSelectedId(null)
    setSearchQuery('')
    
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newPath)
    
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setPath(newPath)
  }

  const navigateBack = () => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1
      setHistoryIndex(idx)
      setPath(history[idx])
      setSelectedId(null)
      setSearchQuery('')
    }
  }

  const navigateForward = () => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1
      setHistoryIndex(idx)
      setPath(history[idx])
      setSelectedId(null)
      setSearchQuery('')
    }
  }

  const navigateUp = () => {
    if (path.length > 2) {
      navigateToPath(path.slice(0, path.length - 1))
    }
  }

  // Handle single click / double click selection & traversal
  const handleItemClick = (item: ArchiveNode) => {
    const now = Date.now()
    const DOUBLE_CLICK_DELAY = 300

    if (lastClickRef.current && lastClickRef.current.id === item.id && (now - lastClickRef.current.time) < DOUBLE_CLICK_DELAY) {
      if (item.type === 'folder') {
        navigateToPath([...path, item.name])
      } else if (item.type === 'file') {
        if (item.fileType === 'lnk' && item.projectId) {
          showNotification("Opening Shortcut", `Opening interactive page for project ${item.projectId}...`)
          setTimeout(() => {
            navigate(`/work/${item.projectId}`)
          }, 1500)
        } else {
          setPreviewFile(item)
        }
      }
      lastClickRef.current = null
    } else {
      setSelectedId(item.id)
      lastClickRef.current = { id: item.id, time: now }
    }
  }

  // Render file icons with raw SVGs for maximum crispness & zero dependencies
  const renderFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'pdf':
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#FFEAEA" stroke="#E50914" strokeWidth="1.5"/>
            <path d="M7 17V7h4a3 3 0 0 1 0 6H7v4" stroke="#E50914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="13" y="7" width="4" height="10" rx="1" fill="#E50914"/>
            <text x="14" y="14" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PDF</text>
          </svg>
        )
      case 'xls':
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#EAF9EA" stroke="#2E7D32" strokeWidth="1.5"/>
            <line x1="8" y1="7" x2="16" y2="7" stroke="#2E7D32" strokeWidth="1.5"/>
            <line x1="8" y1="11" x2="16" y2="11" stroke="#2E7D32" strokeWidth="1.5"/>
            <line x1="8" y1="15" x2="16" y2="15" stroke="#2E7D32" strokeWidth="1.5"/>
            <circle cx="6" cy="7" r="1" fill="#2E7D32"/>
            <circle cx="6" cy="11" r="1" fill="#2E7D32"/>
            <circle cx="6" cy="15" r="1" fill="#2E7D32"/>
          </svg>
        )
      case 'doc':
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#EAF2F9" stroke="#1565C0" strokeWidth="1.5"/>
            <path d="M7 8h10M7 12h10M7 16h6" stroke="#1565C0" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      case 'png':
      case 'jpg':
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#FBF3E7" stroke="#E65100" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="2" fill="#E65100"/>
            <path d="M4 18l4-4 3 3 5-6 4 5" stroke="#E65100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'lnk':
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#EFEBE9" stroke="#4E342E" strokeWidth="1.5"/>
            <path d="M6 18l6-6M12 12V8M12 12H8" stroke="#E50914" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M15 15l2-2-4-4 2-2 4 4" stroke="#4E342E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return (
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="3" width="16" height="18" rx="1.5" stroke="#757575" strokeWidth="1.5"/>
            <path d="M8 8h8M8 12h8M8 16h4" stroke="#757575" strokeWidth="1.5"/>
          </svg>
        )
    }
  }

  // Theme-sensitive styles
  const bgMain = isDark ? 'bg-black' : 'bg-white'
  const bgExplorer = isDark ? 'bg-[#121212]' : 'bg-[#f6f6f6]'
  const borderExplorer = isDark ? 'border-neutral-800' : 'border-neutral-200'
  const borderInner = isDark ? 'border-neutral-800' : 'border-neutral-200'
  const hoverBg = isDark ? 'hover:bg-neutral-800/60' : 'hover:bg-neutral-200/60'
  const textPrimary = isDark ? 'text-white' : 'text-[#1A1A1A]'
  const textMuted = isDark ? 'text-neutral-400' : 'text-neutral-500'

  // Back-Forward State
  const canGoBack = historyIndex > 0
  const canGoForward = historyIndex < history.length - 1
  const canGoUp = path.length > 2

  // Stagger variants for folder grid contents
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  }

  const gridItemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } }
  }

  // Common Directory tree structure for both desktop and mobile drawer
  const sidebarContent = useMemo(() => {
    return (
      <div className="mb-4 select-none">
        <div className="text-[10px] font-bold text-neutral-400 tracking-wider mb-3 uppercase px-2 select-none">
          c:/Archive
        </div>
        <div className="space-y-1 pl-1 border-l border-neutral-700/20">
          {sidebarFolders.map((fold) => {
            const isActive = path[2] === fold.name
            const childPath = ['c:', 'Archive', fold.name]
            
            return (
              <div key={fold.id} className="space-y-0.5">
                <div 
                  onClick={() => {
                    navigateToPath(childPath)
                    setIsSidebarOpen(false) // Auto-close drawer on mobile
                  }}
                  className={`flex items-center justify-between px-2 py-3 md:py-1 rounded-md cursor-pointer transition-colors ${
                    isActive ? 'text-[#C2AE6D] font-semibold bg-[#C2AE6D]/10' : `${textMuted} ${hoverBg}`
                  }`}
                  style={{ minHeight: '40px' }}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span>📁</span>
                    <span className="truncate">{fold.name}</span>
                  </div>
                </div>

                {/* Subfolders nested list */}
                {isActive && fold.children && fold.children.some(c => c.type === 'folder') && (
                  <div className="pl-3 border-l border-neutral-800 space-y-0.5 ml-2 mt-1">
                    {fold.children
                      .filter(child => child.type === 'folder')
                      .map((subFold) => {
                        const isSubActive = path[3] === subFold.name
                        const subPath = ['c:', 'Archive', fold.name, subFold.name]
                        
                        return (
                          <div 
                            key={subFold.id}
                            onClick={() => {
                              navigateToPath(subPath)
                              setIsSidebarOpen(false) // Auto-close drawer on mobile
                            }}
                            className={`py-2 px-1.5 rounded text-[11px] cursor-pointer truncate transition-colors ${
                              isSubActive ? 'text-[#C2AE6D] font-semibold bg-[#C2AE6D]/5' : `${textMuted} ${hoverBg}`
                            }`}
                            style={{ minHeight: '36px' }}
                          >
                            └─ {subFold.name}
                          </div>
                        )
                      })
                    }
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }, [sidebarFolders, path, textMuted, hoverBg])

  return (
    <div 
      className={`w-screen h-screen flex flex-col overflow-hidden select-none font-['Sora',sans-serif] text-sm ${bgMain} ${textPrimary}`}
      style={{ overflowX: 'hidden' }}
      onClick={() => {
        setSelectedId(null)
        setActiveMenu(null)
      }}
    >
      
      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`fixed top-0 left-0 bottom-0 w-60 z-50 p-4 overflow-y-auto border-r md:hidden ${borderInner} ${
                isDark ? 'bg-[#141414] text-white' : 'bg-white text-black'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-xs uppercase tracking-wider text-neutral-400">Navigation</span>
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="text-lg p-2 focus:outline-none min-w-[48px] min-h-[48px] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SECTION 1: THE ARCHIVE FILE EXPLORER ── */}
      <div className="w-full h-full flex flex-col overflow-hidden relative">
        <AnimatePresence initial={false}>
          {!isMinimized ? (
            <motion.div
              key="explorer-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-full flex flex-col overflow-hidden"
              style={{ overflowX: 'hidden' }}
            >
              {/* ── Explorer Header & Windows Controls ── */}
              <div className={`h-16 border-b flex flex-col justify-between px-4 py-1 select-none ${isDark ? 'bg-[#181818]' : 'bg-[#f0f0f0]'} ${borderExplorer}`}>
                {/* Top Toolbar Row */}
                <div className="flex items-center justify-between w-full">
                  {/* Traffic Light Controls & Retro Menus */}
                  <div className="flex items-center gap-2">
                    {/* Menu Toggle for Mobile Sidebar */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true); }}
                      className="md:hidden p-2 rounded-lg border border-neutral-700/20 hover:bg-neutral-500/10 min-w-[48px] min-h-[48px] flex items-center justify-center mr-1"
                      title="Open Sidebar"
                    >
                      📁
                    </button>

                    {/* Window Controls */}
                    <div className="flex items-center gap-1.5 mr-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(-1); }} 
                        className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center group relative focus:outline-none min-w-[20px] min-h-[20px]"
                        title="Close Window (Navigate Back)"
                      >
                        <span className="text-[7px] text-[#4c0002] opacity-0 group-hover:opacity-100 font-bold font-sans">×</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} 
                        className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center group relative focus:outline-none min-w-[20px] min-h-[20px]"
                        title="Minimize Screen"
                      >
                        <span className="text-[7px] text-[#5c3e00] opacity-0 group-hover:opacity-100 font-bold font-sans">−</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} 
                        className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center group relative focus:outline-none min-w-[20px] min-h-[20px]"
                        title="Zoom / Toggle Canvas Size"
                      >
                        <span className="text-[7px] text-[#004d06] opacity-0 group-hover:opacity-100 font-bold font-sans">+</span>
                      </button>
                    </div>

                    {/* Standard Application Text Menus */}
                    <div className="hidden sm:flex items-center gap-3 text-xs ml-2" ref={menuRef}>
                      {['File', 'Edit', 'View', 'Help'].map((menu) => {
                        const isMenuOpen = activeMenu === menu
                        return (
                          <div key={menu} className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveMenu(activeMenu === menu ? null : menu)
                              }}
                              className={`px-2 py-0.5 rounded cursor-pointer transition-colors hover:bg-neutral-500/20 ${
                                isMenuOpen ? 'bg-neutral-500/20 font-semibold' : ''
                              }`}
                            >
                              {menu}
                            </button>
                            <AnimatePresence>
                              {isMenuOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  transition={{ duration: 0.15 }}
                                  className={`absolute left-0 mt-1.5 w-40 rounded-lg shadow-xl border p-1 z-50 text-[11px] backdrop-blur-md ${
                                    isDark ? 'bg-neutral-900/95 border-neutral-800 text-white' : 'bg-white/95 border-neutral-200 text-black'
                                  }`}
                                >
                                  {menu === 'File' && (
                                    <>
                                      <button onClick={(e) => { e.stopPropagation(); setActiveMenu(null); showNotification("Action", "System is read-only"); }} className="w-full text-left px-2 py-2 rounded hover:bg-[#C2AE6D]/20">New File</button>
                                      <button onClick={(e) => { e.stopPropagation(); setActiveMenu(null); navigate(-1); }} className="w-full text-left px-2 py-2 rounded hover:bg-[#C2AE6D]/20">Close Window</button>
                                    </>
                                  )}
                                  {menu === 'Edit' && (
                                    <>
                                      <button onClick={(e) => { e.stopPropagation(); setActiveMenu(null); showNotification("Action", "Clipboard action blocked"); }} className="w-full text-left px-2 py-2 rounded hover:bg-[#C2AE6D]/20">Copy</button>
                                      <button onClick={(e) => { e.stopPropagation(); setActiveMenu(null); showNotification("Action", "Write access disabled"); }} className="w-full text-left px-2 py-2 rounded hover:bg-[#C2AE6D]/20">Paste</button>
                                    </>
                                  )}
                                  {menu === 'View' && (
                                    <>
                                      <button onClick={(e) => { e.stopPropagation(); setViewMode('grid'); setActiveMenu(null); }} className="w-full text-left px-2 py-2 rounded hover:bg-[#C2AE6D]/20 flex justify-between"><span>Grid View</span>{viewMode === 'grid' && '✓'}</button>
                                      <button onClick={(e) => { e.stopPropagation(); setViewMode('list'); setActiveMenu(null); }} className="w-full text-left px-2 py-2 rounded hover:bg-[#C2AE6D]/20 flex justify-between"><span>List View</span>{viewMode === 'list' && '✓'}</button>
                                    </>
                                  )}
                                  {menu === 'Help' && (
                                    <>
                                      <button onClick={(e) => { e.stopPropagation(); setActiveMenu(null); showNotification("HOL Archive Explorer", "v1.4.0 (Secure Mode)"); }} className="w-full text-left px-2 py-2 rounded hover:bg-[#C2AE6D]/20">About Archive</button>
                                    </>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Right side utilities (Search input & View Toggle) */}
                  <div className="flex items-center gap-2">
                    {/* Navigation buttons: Back, Forward, Up */}
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigateBack(); }}
                        disabled={!canGoBack}
                        className={`p-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${canGoBack ? 'hover:bg-neutral-500/10' : 'opacity-30 cursor-not-allowed'}`}
                        title="Back"
                      >
                        ←
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigateForward(); }}
                        disabled={!canGoForward}
                        className={`p-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${canGoForward ? 'hover:bg-neutral-500/10' : 'opacity-30 cursor-not-allowed'}`}
                        title="Forward"
                      >
                        →
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigateUp(); }}
                        disabled={!canGoUp}
                        className={`p-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${canGoUp ? 'hover:bg-neutral-500/10' : 'opacity-30 cursor-not-allowed'}`}
                        title="Parent Directory (Up)"
                      >
                        ↑
                      </button>
                    </div>

                    <div className="relative w-28 sm:w-36 md:w-40">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full text-xs rounded border ${borderInner} pl-6 pr-2 py-1.5 focus:outline-none focus:border-[#C2AE6D] ${
                          isDark ? 'bg-neutral-900 text-white' : 'bg-white text-[#1A1A1A]'
                        }`}
                      />
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 opacity-40 text-xs select-none">🔍</span>
                    </div>
                  </div>
                </div>

                {/* Path address bar (Full Width) */}
                <div className={`w-full flex items-center rounded-md border ${borderInner} px-3 py-1.5 mb-2 bg-black/5 dark:bg-black/20 text-[10px] md:text-[11px] font-mono overflow-hidden`}>
                  <span className="text-[#C2AE6D] mr-1.5 select-none font-semibold leading-none">PATH:</span>
                  <div className="flex-1 flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none select-text leading-none">
                    {path.map((segment, index) => {
                      const segmentPath = path.slice(0, index + 1)
                      return (
                        <React.Fragment key={segment}>
                          {index > 0 && <span className="opacity-40 select-none">/</span>}
                          <button 
                            onClick={(e) => { e.stopPropagation(); index >= 1 && navigateToPath(segmentPath); }}
                            className="hover:text-[#C2AE6D] transition-colors focus:outline-none cursor-pointer leading-none"
                          >
                            {segment}
                          </button>
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* ── Left Sidebar & Right Grid Split View ── */}
              <div className="flex-1 flex overflow-hidden">
                
                {/* Desktop Sidebar (inline) */}
                <div 
                  className={`hidden md:block w-48 border-r ${borderInner} overflow-y-auto p-3 flex-shrink-0 text-xs ${
                    isDark ? 'bg-[#141414]' : 'bg-[#f9f9f9]'
                  }`}
                  style={{ scrollbarWidth: 'thin' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {sidebarContent}
                </div>

                {/* Right Folder Content Canvas Grid */}
                <div 
                  className={`flex-1 overflow-y-auto p-4 transition-colors ${bgExplorer}`}
                  style={{ scrollbarWidth: 'thin', overflowX: 'hidden' }}
                >
                  {displayedItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500 font-mono">
                      <div className="text-3xl mb-2 opacity-30">📂</div>
                      <h4 className="text-xs font-semibold tracking-wider mb-1">NO ITEMS FOUND</h4>
                      <p className="text-[10px] max-w-xs">This directory is empty or search filter excludes items.</p>
                    </div>
                  ) : viewMode === 'grid' ? (
                    
                    /* Grid View */
                    <motion.div 
                      variants={gridContainerVariants}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 auto-rows-max"
                    >
                      {displayedItems.map((item) => {
                        const isSelected = selectedId === item.id

                        return (
                          <motion.div
                            key={item.id}
                            variants={gridItemVariants}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleItemClick(item)
                            }}
                            className="flex flex-col items-center p-2 rounded-xl cursor-pointer select-none"
                          >
                            <motion.div
                              whileHover={{ 
                                y: -3, 
                                scale: 1.02,
                              }}
                              className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200 border ${
                                isSelected 
                                  ? 'bg-[#C2AE6D]/20 border-[#C2AE6D] shadow-lg shadow-[#C2AE6D]/10' 
                                  : `border-transparent ${hoverBg}`
                              }`}
                            >
                              {item.type === 'folder' ? (
                                <img 
                                  src="/images/SVG/Folder.svg" 
                                  alt="Folder"
                                  className="w-10 h-10 object-contain drop-shadow"
                                  onError={(e) => {
                                    e.currentTarget.src = "/images/folder_icon.png"
                                  }}
                                />
                              ) : (
                                renderFileIcon(item.fileType)
                              )}
                            </motion.div>

                            <span 
                              className={`mt-1 text-center text-xs break-all px-2 py-0.5 rounded-md leading-tight max-h-9 overflow-hidden line-clamp-2 ${
                                isSelected 
                                  ? 'bg-[#C2AE6D] text-black font-semibold shadow' 
                                  : textPrimary
                              }`}
                              style={{
                                wordBreak: 'break-word',
                              }}
                            >
                              {item.name}
                            </span>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  ) : (
                    
                    /* List View */
                    <div className="w-full text-xs font-mono">
                      <div className={`grid grid-cols-12 font-semibold pb-1.5 border-b ${borderInner} text-neutral-400 mb-1.5 px-2`}>
                        <div className="col-span-6">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2 text-right">Modified</div>
                      </div>
                      
                      <div className="space-y-0.5">
                        {displayedItems.map((item) => {
                          const isSelected = selectedId === item.id
                          return (
                            <div
                              key={item.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleItemClick(item)
                              }}
                              className={`grid grid-cols-12 items-center py-3.5 md:py-1.5 px-2 rounded-lg cursor-pointer transition-all ${
                                isSelected 
                                  ? 'bg-[#C2AE6D] text-black font-semibold shadow' 
                                  : `${hoverBg} ${textPrimary}`
                              }`}
                            >
                              <div className="col-span-6 flex items-center gap-2">
                                {item.type === 'folder' ? (
                                  <img 
                                    src="/images/SVG/Folder.svg" 
                                    alt="" 
                                    className="w-4 h-4" 
                                  />
                                ) : (
                                  <div className="scale-75 w-5 h-5 flex items-center justify-center">
                                    {renderFileIcon(item.fileType)}
                                  </div>
                                )}
                                <span className="truncate">{item.name}</span>
                              </div>
                              <div className="col-span-2 capitalize text-neutral-400">
                                {item.type === 'folder' ? 'Folder' : `${item.fileType?.toUpperCase()} File`}
                              </div>
                              <div className="col-span-2 text-neutral-400">{item.type === 'folder' ? '--' : item.size}</div>
                              <div className="col-span-2 text-right text-neutral-400">{item.modifiedDate || '2024-06-15'}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Bar */}
              <div className={`px-4 py-2 border-t ${borderExplorer} flex justify-between items-center text-[11px] select-none font-medium ${
                isDark ? 'bg-[#181818]' : 'bg-[#f0f0f0]'
              } text-neutral-400`}>
                <div className="flex gap-4 items-center">
                  <span>{metrics.count} object(s)</span>
                  <span className="text-neutral-500">|</span>
                  <span>{metrics.detail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Size: {metrics.size}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            
            /* Minimized Screen State */
            <motion.div
              key="explorer-minimized"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full bg-black flex flex-col items-center justify-center cursor-default z-10 p-6 text-center"
              onClick={() => setIsMinimized(false)}
            >
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(194, 174, 109, 0.15)' }}
                className={`w-72 border ${borderExplorer} rounded-2xl p-5 bg-neutral-900/90 text-white shadow-2xl cursor-pointer flex flex-col items-center`}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMinimized(false)
                }}
              >
                <div className="flex gap-1.5 self-start mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                
                <div className="text-3xl mb-2">📁</div>
                
                <h4 className="text-xs font-semibold tracking-wider font-sans mb-1 uppercase text-[#C2AE6D]">
                  Explorer Minimized
                </h4>
                
                <p className="text-[10px] text-neutral-400 max-w-xs mb-3 font-mono">
                  Directory: {path.join('/')}
                </p>
                
                <button
                  onClick={() => setIsMinimized(false)}
                  className="px-4 py-1 rounded-lg text-xs bg-[#C2AE6D] text-black font-semibold hover:bg-[#C2AE6D]/80 transition-colors"
                >
                  Restore Screen
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Document File Preview Modal ── */}
      <AnimatePresence>
        {previewFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className={`w-full max-w-xl border ${borderExplorer} rounded-xl shadow-2xl overflow-hidden ${bgMain} ${textPrimary} flex flex-col h-[450px]`}
            >
              {/* Modal header */}
              <div className={`flex items-center justify-between px-4 py-2.5 border-b ${borderExplorer} ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
                <div className="flex items-center gap-2">
                  <div className="scale-75 w-5 h-5 flex items-center justify-center">
                    {renderFileIcon(previewFile.fileType)}
                  </div>
                  <span className="text-xs font-bold font-mono">{previewFile.name} - Quick Look</span>
                </div>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Metadata panel */}
              <div className={`px-4 py-1.5 border-b ${borderInner} bg-neutral-900/5 grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono text-neutral-400`}>
                <div>Type: <span className="font-semibold text-neutral-300">{previewFile.fileType?.toUpperCase()} Doc</span></div>
                <div>Size: <span className="font-semibold text-neutral-300">{previewFile.size}</span></div>
                <div>Author: <span className="font-semibold text-neutral-300">{previewFile.author || 'HOL'}</span></div>
                <div className="text-right">Modified: <span className="font-semibold text-neutral-300">{previewFile.modifiedDate}</span></div>
              </div>

              {/* Document Content */}
              <div className="flex-1 p-5 overflow-y-auto font-mono text-xs leading-relaxed select-text" style={{ scrollbarWidth: 'thin' }}>
                <pre className="whitespace-pre-wrap font-sans text-xs tracking-wide text-neutral-600 dark:text-neutral-200">
                  {previewFile.content || 'No text representations available for this document file.'}
                </pre>
              </div>

              {/* Modal footer */}
              <div className={`p-3 border-t ${borderExplorer} flex justify-between bg-neutral-900/5`}>
                <span className="text-[10px] font-mono text-neutral-500 self-center">
                  SECURED READ-ONLY ACCESS
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      showNotification("Download Copy", `Offline backup for ${previewFile.name} completed.`);
                    }}
                    className="px-3.5 py-1 rounded text-xs font-semibold border border-neutral-700 hover:border-[#C2AE6D] hover:text-[#C2AE6D] transition-colors"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setPreviewFile(null)}
                    className="px-4 py-1 rounded text-xs bg-[#C2AE6D] hover:bg-[#C2AE6D]/80 text-black font-semibold transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Slide-in Toast Notifications ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ type: 'spring', damping: 22, stiffness: 180 }}
            className={`fixed top-4 right-4 w-64 rounded-xl p-3 border shadow-xl z-50 flex flex-col font-sans select-none backdrop-blur-md ${
              isDark ? 'bg-neutral-900/95 text-white border-neutral-800' : 'bg-white/95 text-black border-neutral-200'
            }`}
            onClick={() => setToast(null)}
          >
            <div className="flex items-center justify-between mb-1 text-[9px] text-neutral-400 font-semibold uppercase">
              <span>📂 Notification</span>
              <span>now</span>
            </div>
            
            <h5 className="font-bold text-xs mb-0.5 tracking-tight text-[#C2AE6D]">
              {toast.title}
            </h5>
            
            <p className="text-[10px] text-neutral-400 leading-snug whitespace-pre-wrap font-mono">
              {toast.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

