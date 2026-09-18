'use client';

import Casino from '@/components/casino/Casino';
import { AuthGuard } from '@/components/providers/AuthGuard';

export default function GameCasinoSlugPage() {
  return (
    <AuthGuard>
      <Casino />
    </AuthGuard>
  );
}
