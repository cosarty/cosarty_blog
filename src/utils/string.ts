
/**
 * 解析日期
 * @param date 
 * @returns 
 */

const parseDate = (date: string) => {
  const { groups } = date.match(/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/) as any
  const { year, month, day } = groups
  return { year, month, day }
}


export { parseDate }