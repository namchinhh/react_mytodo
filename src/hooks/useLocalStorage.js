import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue, isValidValue = () => true) {
  // Chúng ta sẽ viết logic ở đây
  const [value, setValue] = useState(() => {
  // 1. Đọc dữ liệu theo key từ localStorage
  const storedValue = localStorage.getItem(key);
  // 2. Nếu có dữ liệu, chuyển JSON string thành JavaScript value
  if (storedValue !== null) {
      try {
        const parsedValue = JSON.parse(storedValue);
        if (isValidValue(parsedValue)) {
          return parsedValue;
        }
      } catch {
        return initialValue;
      }
    }
  // 3. Nếu chưa có dữ liệu, trả về initialValue
  return initialValue;
});

useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;