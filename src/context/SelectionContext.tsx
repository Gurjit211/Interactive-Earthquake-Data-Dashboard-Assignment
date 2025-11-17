/**
 *  Defines the Selection Context and Provider for managing
 * the globally selected item ID (e.g., selected earthquake record).
 * It includes the `SelectionProvider` component and the `useSelection`
 * custom hook for consuming the context.
 */
import { createContext, useContext, useState, } from 'react';
interface SelectionContextType {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SelectionContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};