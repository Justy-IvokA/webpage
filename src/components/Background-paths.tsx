"use client"

import { JSX, ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

interface FloatingPathsProps {
  position: number
  colorMode?: "grayscale" | "palette"
}

function FloatingPaths({ position, colorMode = "grayscale" }: FloatingPathsProps): JSX.Element {
  const isMobile = useIsMobile()
  const pathCount = isMobile ? 48 : 36
  const horizontalMultiplier = isMobile ? 1.6 : 1
  const verticalMultiplier = isMobile ? 2.1 : 1
  const viewBox = isMobile ? "-900 -900 1800 2200" : "-600 -450 1200 1150"
  const preserveAspectRatio = isMobile ? "xMidYMid slice" : "xMidYMid meet"

  // Colores de paleta Ivoka
  const paletteColors = [
    "oklch(0.47 0.23 254)", // Azul vibrante #0062FF
    "oklch(0.75 0.12 90)",  // Verde lima #B9CA19
    "oklch(0.65 0.18 35)",  // Naranja brillante #FE7734
    "oklch(0.55 0.15 280)", // Morado medio #7964F2
  ]

  const paths = Array.from({ length: pathCount }, (_, index) => {
    const offset = index * 5 * position * horizontalMultiplier
    const vertical = index * 6 * verticalMultiplier

    // Asignar color según modo
    const color = colorMode === "palette" 
      ? paletteColors[index % paletteColors.length]
      : "currentColor"

    return {
      id: index,
      d: `M-${380 - offset} -${189 + vertical}C-${380 - offset} -${189 + vertical} -${312 - offset} ${216 - vertical} ${152 - offset} ${343 - vertical}C${616 - offset} ${470 - vertical} ${684 - offset} ${875 - vertical} ${684 - offset} ${875 - vertical}`,
      width: 0.5 + index * 0.03,
      color,
    }
  })

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-slate-950 dark:text-white"
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
        fill="none"
      >
        <title>Background Paths</title>
        <defs>
          {/* Glow effect para modo palette */}
          <filter id={`glow-floating-${position}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={colorMode === "palette" ? 0.25 : 0.1 + path.id * 0.03}
            filter={colorMode === "palette" ? `url(#glow-floating-${position})` : undefined}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: colorMode === "palette" ? [0.3, 0.7, 0.3] : [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

interface CircuitPathsProps {
  position: number
  colorMode?: "grayscale" | "palette"
}

function CircuitPaths({ position, colorMode = "grayscale" }: CircuitPathsProps): JSX.Element {
  const isMobile = useIsMobile()
  
  // Colores de paleta Ivoka
  const paletteColors = [
    "oklch(0.47 0.23 254)", // Azul vibrante #0062FF
    "oklch(0.75 0.12 90)",  // Verde lima #B9CA19
    "oklch(0.65 0.18 35)",  // Naranja brillante #FE7734
    "oklch(0.55 0.15 280)", // Morado medio #7964F2
  ]

  // Dimensiones adaptativas según dispositivo
  const viewBoxWidth = isMobile ? 375 : 696
  const viewBoxHeight = isMobile ? 812 : 316
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`

  // Generar 3 clusters de circuitos
  const clusters = Array.from({ length: 3 }, (_, clusterIndex) => {
    const circuitsPerCluster = 10 + Math.floor(Math.random() * 5) // 10-14 circuitos por cluster
    
    const circuits = Array.from({ length: circuitsPerCluster }, (_, index) => {
      // Distribución más orgánica (no grid)
      const angle = (index / circuitsPerCluster) * Math.PI * 2
      const radius = 60 + Math.random() * 80
      const offsetX = Math.cos(angle) * radius
      const offsetY = Math.sin(angle) * radius
      const randomJitter = (Math.random() - 0.5) * 50
      
      const startX = offsetX + randomJitter
      const startY = offsetY + (Math.random() - 0.5) * 40
    
      // Rastrear coordenadas reales para nodos
      const nodePositions: Array<{ x: number; y: number; r: number }> = []
      const segments: string[] = []
      let currentX = startX
      let currentY = startY
      
      // Agregar nodo inicial
      nodePositions.push({ x: startX, y: startY, r: 1.5 + Math.random() * 0.8 })
      
      // Patrón de circuito variable según índice
      const circuitPattern = index % 4
      const numSegments = 3 + (index % 4)
      
      for (let i = 0; i < numSegments; i++) {
        // Diferentes patrones de crecimiento
        let direction: "H" | "V" | "L"
        
        if (circuitPattern === 0) {
          // Mayormente horizontal
          direction = i % 3 === 0 ? "V" : "H"
        } else if (circuitPattern === 1) {
          // Mayormente vertical
          direction = i % 3 === 0 ? "H" : "V"
        } else if (circuitPattern === 2) {
          // Diagonal con líneas
          direction = i % 2 === 0 ? "H" : "V"
        } else {
          // Patrón en L (horizontal-vertical-horizontal)
          direction = i % 2 === 0 ? "H" : "V"
        }
        
        // Longitud más variable
        const baseLength = 40 + Math.random() * 50
        const directionMultiplier = (Math.random() > 0.5 ? 1 : -1)
        const length = baseLength * directionMultiplier
        
        if (direction === "H") {
          currentX += length
          segments.push(`H${currentX}`)
        } else {
          currentY += length
          segments.push(`V${currentY}`)
        }
        
        // Agregar nodo en cada intersección con tamaño variable
        nodePositions.push({ 
          x: currentX, 
          y: currentY, 
          r: 1.3 + Math.random() * 1.2 
        })
      }
      
      const pathData = `M${startX} ${startY} ${segments.join(" ")}`
      
      // Asignar color según modo
      const color = colorMode === "palette" 
        ? paletteColors[index % paletteColors.length]
        : "currentColor"
      
      return {
        id: `${clusterIndex}-${index}`,
        d: pathData,
        width: 0.6 + (index % 4) * 0.15,
        nodes: nodePositions,
        color,
      }
    })
    
    // Generar múltiples posiciones para el cluster (áreas más amplias que se superponen)
    const generateRandomPosition = () => {
      // Áreas adaptativas según dispositivo
      const areas = isMobile ? [
        { x: [0, 150], y: [0, 270] },      // Superior izquierda
        { x: [225, 375], y: [0, 270] },    // Superior derecha
        { x: [0, 150], y: [270, 542] },    // Centro izquierda
        { x: [225, 375], y: [270, 542] },  // Centro derecha
        { x: [0, 150], y: [542, 812] },    // Inferior izquierda
        { x: [225, 375], y: [542, 812] },  // Inferior derecha
        { x: [75, 300], y: [135, 677] },   // Centro amplio vertical
      ] : [
        { x: [0, 300], y: [0, 180] },      // Superior izquierda amplia
        { x: [350, 696], y: [0, 180] },    // Superior derecha amplia
        { x: [0, 300], y: [150, 316] },    // Inferior izquierda amplia
        { x: [350, 696], y: [150, 316] },  // Inferior derecha amplia
        { x: [200, 500], y: [80, 240] },   // Centro amplio
        { x: [100, 400], y: [50, 200] },   // Centro-izquierda
        { x: [300, 600], y: [100, 250] },  // Centro-derecha
      ]
      
      const area = areas[Math.floor(Math.random() * areas.length)]
      return {
        x: area.x[0] + Math.random() * (area.x[1] - area.x[0]),
        y: area.y[0] + Math.random() * (area.y[1] - area.y[0])
      }
    }
    
    return {
      id: clusterIndex,
      circuits,
      initialPosition: generateRandomPosition(),
    }
  })

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-slate-950 dark:text-white bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        viewBox={viewBox}
        fill="none"
      >
        <title>Circuit Paths</title>
        <defs>
          {/* Glow effect para los circuitos */}
          <filter id={`glow-${position}`}>
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {clusters.map((cluster) => {
          // Generar nuevas posiciones para el ciclo (áreas superpuestas)
          const getRandomPositions = () => {
            const positions: Array<{ x: number; y: number }> = []
            const areas = isMobile ? [
              { x: [0, 150], y: [0, 270] },
              { x: [225, 375], y: [0, 270] },
              { x: [0, 150], y: [270, 542] },
              { x: [225, 375], y: [270, 542] },
              { x: [0, 150], y: [542, 812] },
              { x: [225, 375], y: [542, 812] },
              { x: [75, 300], y: [135, 677] },
            ] : [
              { x: [0, 300], y: [0, 180] },
              { x: [350, 696], y: [0, 180] },
              { x: [0, 300], y: [150, 316] },
              { x: [350, 696], y: [150, 316] },
              { x: [200, 500], y: [80, 240] },
              { x: [100, 400], y: [50, 200] },
              { x: [300, 600], y: [100, 250] },
            ]
            
            for (let i = 0; i < 4; i++) {
              const area = areas[Math.floor(Math.random() * areas.length)]
              positions.push({
                x: area.x[0] + Math.random() * (area.x[1] - area.x[0]),
                y: area.y[0] + Math.random() * (area.y[1] - area.y[0])
              })
            }
            return positions
          }
          
          const positions = getRandomPositions()
          const cycleDuration = 18 + cluster.id * 4 // Duraciones escalonadas más cortas
          
          return (
            <motion.g
              key={`cluster-${cluster.id}`}
              initial={{ 
                x: cluster.initialPosition.x,
                y: cluster.initialPosition.y,
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                x: [
                  cluster.initialPosition.x,
                  cluster.initialPosition.x,
                  positions[0].x,
                  positions[1].x,
                  positions[2].x,
                ],
                y: [
                  cluster.initialPosition.y,
                  cluster.initialPosition.y,
                  positions[0].y,
                  positions[1].y,
                  positions[2].y,
                ],
                opacity: [0, 1, 1, 0, 0],
                scale: [0.8, 1, 1, 0.9, 0.8],
              }}
              transition={{
                duration: cycleDuration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                times: [0, 0.15, 0.45, 0.75, 1],
                delay: cluster.id * 3,
              }}
            >
              {cluster.circuits.map((circuit) => (
                <g key={circuit.id}>
                  {/* Path principal del circuito */}
                  <motion.path
                    d={circuit.d}
                    stroke={circuit.color}
                    strokeWidth={circuit.width}
                    strokeOpacity={0.3}
                    strokeLinecap="square"
                    fill="none"
                    filter={colorMode === "palette" ? `url(#glow-${position})` : undefined}
                    initial={{ pathLength: 0 }}
                    animate={{
                      pathLength: [0, 1, 1, 1],
                      opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                      duration: cycleDuration * 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: cluster.id * 3 + parseFloat(circuit.id.split("-")[1]) * 0.15,
                    }}
                  />
                  
                  {/* Nodos en las intersecciones */}
                  {circuit.nodes.filter((_, i) => i === 0 || i === circuit.nodes.length - 1 || i % 2 === 0).map((node, nodeIndex) => (
                    <motion.circle
                      key={`node-${circuit.id}-${nodeIndex}`}
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      fill={circuit.color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.2, 1, 1.2, 0],
                        opacity: [0, 0.7, 0.5, 0.7, 0],
                      }}
                      transition={{
                        duration: cycleDuration * 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: cluster.id * 3 + parseFloat(circuit.id.split("-")[1]) * 0.15 + nodeIndex * 0.2,
                      }}
                    />
                  ))}
                </g>
              ))}
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

interface BackgroundPathsProps {
  title?: string
  colorMode?: "grayscale" | "palette"
}

export function BackgroundPaths({ title = "Background Paths", colorMode = "grayscale" }: BackgroundPathsProps): JSX.Element {
  const words = title.split(" ")

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} colorMode={colorMode} />
        <FloatingPaths position={-1} colorMode={colorMode} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text text-transparent dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-b from-black/10 to-white/10 p-px backdrop-blur-lg shadow-lg transition-shadow duration-300 hover:shadow-xl dark:from-white/10 dark:to-black/10">
            <Button
              variant="ghost"
              className="rounded-[1.15rem] border border-black/10 bg-white/95 px-8 py-6 text-lg font-semibold text-black transition-all duration-300 backdrop-blur-md group-hover:-translate-y-0.5 group-hover:shadow-md hover:bg-white/100 dark:border-white/10 dark:bg-black/95 dark:text-white dark:hover:bg-black/100 dark:group-hover:shadow-neutral-800/50"
            >
              <span className="opacity-90 transition-opacity group-hover:opacity-100">
                Discover Excellence
              </span>
              <span className="ml-3 transition-all duration-300 opacity-70 group-hover:translate-x-1.5 group-hover:opacity-100">
                →
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

interface CircuitBackgroundProps {
  title?: string
  colorMode?: "grayscale" | "palette"
  children?: ReactNode
}

export function CircuitBackground({ title = "Circuit Paths", colorMode = "grayscale", children }: CircuitBackgroundProps): JSX.Element {
  const content = children ? (
    <div className="container relative z-10 mx-auto flex w-full items-center justify-center px-4 py-12 md:px-6">
      {children}
    </div>
  ) : (
    <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="mx-auto max-w-4xl"
      >
        <h1 className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
          {title.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="mr-4 inline-block last:mr-0">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: wordIndex * 0.1 + letterIndex * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className="inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text text-transparent dark:from-white dark:to-white/80"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <div className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-b from-black/10 to-white/10 p-px backdrop-blur-lg shadow-lg transition-shadow duration-300 hover:shadow-xl dark:from-white/10 dark:to-black/10">
          <Button
            variant="ghost"
            className="rounded-[1.15rem] border border-black/10 bg-white/95 px-8 py-6 text-lg font-semibold text-black transition-all duration-300 backdrop-blur-md group-hover:-translate-y-0.5 group-hover:shadow-md hover:bg-white/100 dark:border-white/10 dark:bg-black/95 dark:text-white dark:hover:bg-black/100 dark:group-hover:shadow-neutral-800/50"
          >
            <span className="opacity-90 transition-opacity group-hover:opacity-100">
              Discover Excellence
            </span>
            <span className="ml-3 transition-all duration-300 opacity-70 group-hover:translate-x-1.5 group-hover:opacity-100">
              →
            </span>
          </Button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <CircuitPaths position={1} colorMode={colorMode} />
        <CircuitPaths position={-1} colorMode={colorMode} />
      </div>
      {content}
    </div>
  )
}
