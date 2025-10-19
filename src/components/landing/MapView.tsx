'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { COLORS } from '@/lib/colors'

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface Location {
  id: string
  name: string
  region: string
  photographerCount: number
  featured?: boolean
  lat: number
  lng: number
}

interface MapViewProps {
  locations: Location[]
  selectedLocation: Location | null
  onLocationSelect: (location: Location) => void
}

// Custom marker icon
const createCustomIcon = (count: number, featured: boolean) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background-color: ${featured ? COLORS.BLUE_LIGHT : COLORS.NAVY_DARK};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        border: 3px solid white;
      ">
        ${count}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
}

// Component to handle map bounds
function MapBounds({ locations }: { locations: Location[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [locations, map])
  
  return null
}

export default function MapView({ locations, selectedLocation, onLocationSelect }: MapViewProps) {
  // Center of Indonesia/Southeast Asia
  const center: [number, number] = [-2.5, 118.0]
  
  return (
    <div className="relative h-96 md:h-[500px] w-full rounded-xl overflow-hidden z-10">
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBounds locations={locations} />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.photographerCount, location.featured || false)}
            eventHandlers={{
              click: () => onLocationSelect(location),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-sm" style={{ color: COLORS.NAVY_DARK }}>
                  {location.name}
                </h3>
                <p className="text-xs mt-1" style={{ color: COLORS.SLATE_MEDIUM }}>
                  {location.photographerCount} photographers
                </p>
                {location.featured && (
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded" style={{ backgroundColor: COLORS.BLUE_LIGHT, color: 'white' }}>
                    Featured
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map legend */}
      <div className="absolute bottom-4 right-4 rounded-lg bg-white p-3 shadow-md z-[5]">
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.BLUE_LIGHT }} />
            <span style={{ color: COLORS.SLATE_MEDIUM }}>Featured</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.NAVY_DARK }} />
            <span style={{ color: COLORS.SLATE_MEDIUM }}>Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}
