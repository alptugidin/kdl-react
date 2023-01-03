export interface ISeries {
   idx: string
   name: string
   year: string
   tags: []
   aka: []
   co: number
   summary: string
   summaryLink: string
   video: string
   title: string
 }

export interface ITags {
  tag: string
 }


export interface ISearchResults {
  resultRef: React.RefObject<HTMLUListElement>
  results: {
    series: ISeries[];
    tags: ITags[];
  }
  setResults: React.Dispatch<React.SetStateAction<{
    series: ISeries[];
    tags: ITags[];
  }>>
   searchBox: {
    value: string;
    searchType: string;
    placeholder: string;
  }
  setSearchBox: React.Dispatch<React.SetStateAction<{
    value: string;
    searchType: string;
    placeholder: string;
  }>>
 }