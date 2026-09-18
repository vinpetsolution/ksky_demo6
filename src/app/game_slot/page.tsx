'use client';

import Slot from '@/components/slot/Slot';
import { AuthGuard } from '@/components/providers/AuthGuard';

export default function GameSlotPage() {
  return (
    <AuthGuard>
      <Slot />
    </AuthGuard>
  );
}
