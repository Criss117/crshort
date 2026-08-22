import { open } from 'maxmind';
import type { CityResponse, Reader } from 'maxmind';

import type {
  GeoIpLocation,
  GeoIpProvider,
} from '@/application/ports/geo-ip.provider';

export class MaxMindGeoIpProvider implements GeoIpProvider {
  private reader: Promise<Reader<CityResponse> | null> | undefined;

  constructor(private readonly databasePath?: string) {}

  async lookup(ip: string): Promise<GeoIpLocation | null> {
    const reader = await this.getReader();

    if (!reader) {
      return null;
    }

    try {
      const result = reader.get(ip);

      if (!result?.country?.iso_code) {
        return null;
      }

      const cityName = result.city?.names
        ? Reflect.get(result.city.names, 'en')
        : null;

      return {
        countryCode: result.country.iso_code,
        city: typeof cityName === 'string' ? cityName : null,
      };
    } catch {
      return null;
    }
  }

  private getReader(): Promise<Reader<CityResponse> | null> {
    if (!this.reader) {
      this.reader = this.openDatabase();
    }

    return this.reader;
  }

  private async openDatabase(): Promise<Reader<CityResponse> | null> {
    if (!this.databasePath) {
      return null;
    }

    try {
      return await open<CityResponse>(this.databasePath, {
        watchForUpdates: true,
      });
    } catch {
      return null;
    }
  }
}
