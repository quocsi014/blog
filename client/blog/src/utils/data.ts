export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);

  // Lấy các thành phần ngày, tháng, và năm
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }); // Lấy tên tháng viết tắt (ví dụ: "Nov")
  const year = date.getFullYear();

  // Ghép lại thành chuỗi định dạng
  return `${day} ${month} ${year}`;
}
