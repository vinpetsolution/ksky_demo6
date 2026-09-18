'use client';

import Casino from '@/components/casino/Casino';
import { AuthGuard } from '@/components/providers/AuthGuard';

export default function GameCasinoPage() {
  return (
    <AuthGuard>
      <Casino />
    </AuthGuard>
  );
}
