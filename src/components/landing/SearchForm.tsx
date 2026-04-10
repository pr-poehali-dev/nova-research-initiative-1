import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"

const CITY_CODES: Record<string, string> = {
  "москва": "MOW", "moscow": "MOW",
  "санкт-петербург": "LED", "питер": "LED", "спб": "LED", "saint petersburg": "LED",
  "новосибирск": "OVB", "екатеринбург": "SVX", "казань": "KZN",
  "краснодар": "KRR", "сочи": "AER", "анапа": "AAQ",
  "калининград": "KGD", "уфа": "UFA", "самара": "KUF",
  "ростов": "ROV", "ростов-на-дону": "ROV",
  "нижний новгород": "GOJ", "омск": "OMS", "челябинск": "CEK",
  "владивосток": "VVO", "иркутск": "IKT", "красноярск": "KJA",
  "дубай": "DXB", "dubai": "DXB",
  "стамбул": "IST", "istanbul": "IST",
  "париж": "PAR", "paris": "PAR",
  "лондон": "LON", "london": "LON",
  "берлин": "BER", "berlin": "BER",
  "рим": "ROM", "rome": "ROM",
  "барселона": "BCN", "barcelona": "BCN",
  "амстердам": "AMS", "amsterdam": "AMS",
  "прага": "PRG", "prague": "PRG",
  "бангкок": "BKK", "bangkok": "BKK",
  "токио": "TYO", "tokyo": "TYO",
  "нью-йорк": "NYC", "new york": "NYC",
  "бали": "DPS", "bali": "DPS",
  "тбилиси": "TBS", "tbilisi": "TBS",
  "ереван": "EVN", "yerevan": "EVN",
  "алматы": "ALA", "almaty": "ALA",
  "минск": "MSQ", "minsk": "MSQ",
  "ташкент": "TAS", "tashkent": "TAS",
  "анталья": "AYT", "antalya": "AYT",
  "пхукет": "HKT", "phuket": "HKT",
}

function getCode(city: string): string {
  return CITY_CODES[city.trim().toLowerCase()] ?? city.trim().toUpperCase().slice(0, 3)
}

function formatDateForAviasales(dateStr: string): string {
  if (!dateStr) return ""
  const [year, month, day] = dateStr.split("-")
  return `${day}${month}${year.slice(2)}`
}

export default function SearchForm({ isActive }: { isActive: boolean }) {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState("1")

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  const handleSearch = () => {
    const fromCode = getCode(from || "MOW")
    const toCode = getCode(to || "NYC")
    const dateFormatted = formatDateForAviasales(date) || formatDateForAviasales(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    )
    const adults = parseInt(passengers) || 1

    const url = `https://www.aviasales.ru/search/${fromCode}${dateFormatted}${toCode}${adults}`
    window.open(url, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-10 w-full max-w-3xl"
    >
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">
          <div className="flex flex-1 gap-2 items-end">
            <div className="flex-1">
              <label className="text-xs text-neutral-400 mb-1 block">Откуда</label>
              <div className="relative">
                <Icon name="PlaneTakeoff" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <Input
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  placeholder="Москва"
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-[#FF4D00] focus:ring-[#FF4D00]/20"
                />
              </div>
            </div>
            <button
              onClick={handleSwap}
              className="mb-0.5 p-2 rounded-lg text-neutral-400 hover:text-[#FF4D00] hover:bg-white/5 transition-colors"
            >
              <Icon name="ArrowLeftRight" size={16} />
            </button>
            <div className="flex-1">
              <label className="text-xs text-neutral-400 mb-1 block">Куда</label>
              <div className="relative">
                <Icon name="PlaneLanding" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <Input
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  placeholder="Дубай"
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-[#FF4D00] focus:ring-[#FF4D00]/20"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-1 md:flex-none">
            <div className="flex-1 md:w-36">
              <label className="text-xs text-neutral-400 mb-1 block">Дата</label>
              <div className="relative">
                <Icon name="Calendar" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <Input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white [color-scheme:dark] focus:border-[#FF4D00] focus:ring-[#FF4D00]/20"
                />
              </div>
            </div>
            <div className="w-24">
              <label className="text-xs text-neutral-400 mb-1 block">Пассажиры</label>
              <div className="relative">
                <Icon name="Users" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={passengers}
                  onChange={e => setPassengers(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20"
                />
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleSearch}
            className="bg-[#FF4D00] hover:bg-[#e04400] text-white border-0 px-8 shrink-0"
          >
            <Icon name="Search" size={18} className="mr-2" />
            Найти
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
