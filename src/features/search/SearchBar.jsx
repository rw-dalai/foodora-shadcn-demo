import { Search, X, MapPin } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import s from "./search-bar.module.css"

export function SearchBar({ onSearch, placeholder = "Search restaurants..." }) {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch?.({ query, location })
  }

  const handleClear = () => {
    setQuery("")
    setLocation("")
  }

  return (
    <form onSubmit={handleSearch} className={s.searchBar}>
      <div className={s.inputGroup}>
        <Search className={s.searchIcon} />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={s.input}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={s.clearButton}
            onClick={handleClear}
          >
            <X className="size-icon-sm" />
          </Button>
        )}
      </div>

      <div className={s.inputGroup}>
        <MapPin className={s.searchIcon} />
        <Input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={s.input}
        />
      </div>

      <Button type="submit" className={s.submitButton}>
        Search
      </Button>
    </form>
  )
}
