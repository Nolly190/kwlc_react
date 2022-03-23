import { useState, createContext } from "react";
import { ChurchInfoType } from "../../../../types/appTypes";
interface ChurchReportProps {
  churchReport: ChurchInfoType;
  setChurchReport: (churchReport: ChurchInfoType) => void;
}

export const ChurchReportContext = createContext<ChurchReportProps>({
  churchReport: {
    offerings: [],
    attendance: {},
    sermon: {},
  },
  setChurchReport: (_: ChurchInfoType) => {},
});

export const ChurchReportProvider = (props: any) => {
  const [state, setState] = useState<ChurchInfoType>({ offerings: [] });

  return (
    <ChurchReportContext.Provider
      value={{
        churchReport: state,
        setChurchReport: setState,
      }}
    >
      {props.children}
    </ChurchReportContext.Provider>
  );
};
