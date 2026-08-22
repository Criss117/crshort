export interface GeoIpLocation {
  countryCode: string | null;
  city: string | null;
}

export interface GeoIpProvider {
  lookup: (ip: string) => Promise<GeoIpLocation | null>;
}
