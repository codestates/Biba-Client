import { StarStatus, starStatusInit } from '../../modules/beerdetail';

export const checkStarScore = (user_rate: number): StarStatus => {
  if (user_rate === 5) return { a: true, b: true, c: true, d: true, e: true };
  if (user_rate === 4) return { a: true, b: true, c: true, d: true, e: false };
  if (user_rate === 3) return { a: true, b: true, c: true, d: false, e: false };
  if (user_rate === 2)
    return { a: true, b: true, c: false, d: false, e: false };
  if (user_rate === 1)
    return { a: true, b: false, c: false, d: false, e: false };
  return starStatusInit; // 만약 모두 false면 review: false로 전송해야 함
};
