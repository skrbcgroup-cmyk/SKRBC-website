import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/lib/auth/session";

import { logout } from "./actions";

/** Everything in the panel requires a signed-in admin. */
export default async function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  const admin = await requireAdmin();

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav userName={admin.name} logout={logout} />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</main>
    </div>
  );
}
