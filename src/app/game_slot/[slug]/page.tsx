'use client';

import Slot from '@/components/slot/Slot';
import { AuthGuard } from '@/components/providers/AuthGuard';

export default function GameSlotSlugPage() {
  return (
    <AuthGuard>
      <Slot />
    </AuthGuard>
  );
}
