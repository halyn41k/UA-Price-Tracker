import cheerio from 'cheerio'
import fetch from 'node-fetch'

export async function parseProduct(url) {
  if (url.includes('rozetka.com')) {
    return parseRozetka(url)
  } else if (url.includes('eva.ua')) {
    return parseEva(url)
  } else {
    throw new Error('Unsupported URL')
  }
}

async function fetchHTML(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch ' + url)
  return res.text()
}

export async function parseRozetka(url) {
  const html = await fetchHTML(url)
  const $ = cheerio.load(html)
  const name = $('h1').first().text().trim()
  const priceText = $('[data-testid="product-price"], .price__value').first().text()
  const price = parseFloat(priceText.replace(/[^\d\.]/g, ''))
  return { name, price }
}

export async function parseEva(url) {
  const html = await fetchHTML(url)
  const $ = cheerio.load(html)
  const name = $('h1').first().text().trim()
  const priceText = $('[data-testid="product-price"], .product-price__value').first().text()
  const price = parseFloat(priceText.replace(/[^\d\.]/g, ''))
  return { name, price }
}
