import fs from 'fs'
const DB_FILE = new URL('./db.json', import.meta.url)

export function loadDB() {
  if (!fs.existsSync(DB_FILE)) return { products: [] }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
}

export function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
}
