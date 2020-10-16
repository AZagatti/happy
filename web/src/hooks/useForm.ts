import { useCallback, useState, ChangeEvent } from "react";

function useForm<T>(initialData: T) {
  const [values, setValues] = useState<T>(initialData);

  const setValue = useCallback((key: string | null, value: string) => {
    if (!key) return;
    setValues((state) => ({ ...state, [key]: value }));
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;

      setValue(e.target.getAttribute("name"), value);
    },
    [setValue]
  );

  const clearForm = useCallback(() => {
    setValues(initialData);
  }, [initialData]);

  return { values, setValue, handleChange, clearForm };
}

export default useForm;
