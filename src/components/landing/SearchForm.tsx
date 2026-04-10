import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"

export default function SearchForm({ isActive }: { isActive: boolean }) {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState("1")

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
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
                  placeholder="Город вылета"
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
                  placeholder="Город прилёта"
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
