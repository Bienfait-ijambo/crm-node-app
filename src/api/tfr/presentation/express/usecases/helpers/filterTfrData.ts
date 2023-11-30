import { Tfr, resultTypeNameType } from "../../../../../../entities/Trf";

export function filterTfrData(array:Tfr[],resultType: resultTypeNameType) {
    const filteredData = array.filter(
      (item) => item.resultType === resultType
    );
    return filteredData;
  }