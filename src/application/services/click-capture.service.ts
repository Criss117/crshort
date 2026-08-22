import { createHash } from 'node:crypto';

import { db } from '@/integrations/db';
import { clickEvents } from '@/integrations/db/schemas/links.schema';
import { serverEnv } from '@/lib/config/server';
import { MaxMindGeoIpProvider } from '@/integrations/geo/maxmind.adapter';

import type { GeoIpProvider } from '@/application/ports/geo-ip.provider';

export interface ClickCaptureInput {
  linkId: string;
  request: Request;
}

const geoIpProvider: GeoIpProvider = new MaxMindGeoIpProvider(
  serverEnv.GEOIP_DB_PATH,
);

export function captureClickEvent({
  linkId,
  request,
}: ClickCaptureInput): Promise<void> {
  return Promise.resolve()
    .then(async () => {
      const ip = getClientIp(request);
      const userAgent = request.headers.get('user-agent');
      const location = await geoIpProvider.lookup(ip);
      const referrer = request.headers.get('referer');

      await db.insert(clickEvents).values({
        linkId,
        hashedIp: hashIp(ip),
        userAgent,
        deviceType: parseDeviceType(userAgent),
        referrer,
        referrerHost: getReferrerHost(referrer),
        countryCode: location?.countryCode ?? null,
        city: location?.city ?? null,
      });
    })
    .catch((error: unknown) => {
      console.error('Failed to capture click event', error);
    });
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  return (
    forwardedFor?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

function hashIp(ip: string): string {
  return createHash('sha256')
    .update(`${serverEnv.CLICK_IP_SALT}${ip}`)
    .digest('hex');
}

function parseDeviceType(
  userAgent: string | null,
): 'desktop' | 'mobile' | 'tablet' | 'bot' | 'unknown' {
  if (!userAgent) {
    return 'unknown';
  }

  if (
    /bot|crawler|spider|slurp|facebookexternalhit|curl|wget/i.test(userAgent)
  ) {
    return 'bot';
  }

  if (/ipad|tablet|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }

  if (/mobile|android|iphone|ipod|windows phone/i.test(userAgent)) {
    return 'mobile';
  }

  if (/windows|macintosh|linux|x11|cros/i.test(userAgent)) {
    return 'desktop';
  }

  return 'unknown';
}

function getReferrerHost(referrer: string | null): string | null {
  if (!referrer) {
    return null;
  }

  try {
    return new URL(referrer).hostname;
  } catch {
    return null;
  }
}
