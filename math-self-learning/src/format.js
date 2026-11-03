// 129 -> '2:09'
export const minutes = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
