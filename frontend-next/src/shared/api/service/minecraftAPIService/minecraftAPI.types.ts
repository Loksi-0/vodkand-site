export type PunishmentsType = {
  type: 'WARN' | 'BAN' | 'MUTE'
  reason: string
  endDate: number
}[]
