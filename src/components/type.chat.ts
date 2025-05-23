// Define the country data type
export interface CountryData {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region?: string;
  subregion?: string;
  languages: Record<string, string>;
  borders?: string[];
  area?: number;
  population?: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  car: { side: string };
  independent: boolean;
  currencies: Record<string, { name: string; symbol: string }>;
  timezones?: string[];
  continents?: string[];
  capitalInfo?: {
    latlng?: number[];
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  demonyms: Record<string, Record<string, string>>;
  gini: Record<string, number>;
  //   [key: string]: any;
}
