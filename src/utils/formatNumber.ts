export default function formatNumber(num: number): string {
  if (num < 1000) return num.toString();

  const suffixes = ["K", "M", "B", "T"];
  let suffixIndex = -1;
  let formattedNum = num;

  while (formattedNum >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedNum /= 1000;
    suffixIndex++;
  }

  const roundedNum = Math.round(formattedNum * 10) / 10;
  return `${roundedNum}${suffixes[suffixIndex]}`;
}
