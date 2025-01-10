import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  try {
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Data inválida')
    }
    return parsedDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return 'Data indisponível'
  }
}

export function formatCurrency(value: string | number) {
  try {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numericValue)) {
      throw new Error('Valor inválido')
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue)
  } catch (error) {
    console.error('Erro ao formatar valor:', error)
    return 'Valor indisponível'
  }
}

export function truncateText(text: string, maxLength: number) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
